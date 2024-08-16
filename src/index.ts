import { randomUUID } from 'node:crypto';
import process from 'node:process';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import cron from 'node-cron';
import { parseMarkdown } from './markdown/index.js';

const app = express();

const cache = new Map<
	string,
	{
		createdAt: number;
		html: string;
		id: string;
	}
>();

const SIX_HOURS_IN_MS = 1_000 * 60 * 60 * 6;

cron.schedule('0 * * * *', () => {
	console.log(`[Cron] Running cache cleanup`);
	const now = Date.now();

	for (const [id, { createdAt }] of cache) {
		if (now - createdAt > SIX_HOURS_IN_MS) {
			console.log(`[Cron] Deleting cache entry with ID: ${id}`);
			cache.delete(id);
		}
	}
});

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (_, res) => {
	res
		.status(200)
		.header({
			'Content-Type': 'application/json',
		})
		.send({
			status: 'ready',
		});
});

app.get('/markdown', async (req, res) => {
	const { markdown: markdownQuery, file: fileQuery, type: typeQuery } = req.query;

	console.log(`[Received request]`, {
		markdownQuery,
		fileQuery,
		typeQuery,
		ip: req.ip,
		userAgent: req.get('User-Agent'),
	});

	if (!markdownQuery && !fileQuery) {
		res
			.status(400)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'No markdown content or file provided',
			});
		return;
	}

	if (markdownQuery && fileQuery) {
		res
			.status(400)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'Both markdown content and file provided, please provide only one',
			});
		return;
	}

	let content = markdownQuery;

	if (fileQuery) {
		const response = await fetch(decodeURI(fileQuery as string));

		if (!response.ok) {
			res
				.status(400)
				.header({
					'Content-Type': 'application/json',
				})
				.send({
					error: `Failed to fetch file (${response.status})`,
				});
			return;
		}

		content = await response.text();

		if (!content) {
			res
				.status(400)
				.header({
					'Content-Type': 'application/json',
				})
				.send({
					error: 'Failed to read file content or file is empty',
				});
			return;
		}
	}

	const html = await parseMarkdown(content as string);
	if (typeQuery === 'json') {
		res
			.status(200)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				html,
			});
		return;
	}

	res
		.status(200)
		.header({
			'Content-Type': 'text/html',
		})
		.send(html);
});

app.get('/markdown/:id', async (req, res) => {
	const { id } = req.params;
	const format = req.query.format;

	const cached = cache.get(id);
	if (!cached) {
		res
			.status(404)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'Not found',
			});
		return;
	}

	if (format === 'json') {
		res
			.status(200)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				id: cached.id,
				html: cached.html,
			});
		return;
	}

	res
		.status(200)
		.header({
			'Content-Type': 'text/html',
		})
		.send(cached.html);
});

app.post('/markdown', async (req, res) => {
	const { markdown, file } = req.body;

	if (cache.size > 5_000) {
		res
			.status(429)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'Cache limit reached, please try again later',
			});
		return;
	}

	if (markdown && file) {
		res
			.status(400)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'Both markdown content and file provided, please provide only one',
			});
		return;
	}

	if (!markdown && !file) {
		res
			.status(400)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'No markdown content or file provided',
			});
		return;
	}

	let content = markdown ?? '';

	if (file) {
		const response = await fetch(decodeURI(file as string));

		if (!response.ok) {
			res
				.status(400)
				.header({
					'Content-Type': 'application/json',
				})
				.send({
					error: `Failed to fetch file (${response.status})`,
				});
			return;
		}

		content = await response.text();

		if (!content) {
			res
				.status(400)
				.header({
					'Content-Type': 'application/json',
				})
				.send({
					error: 'Failed to read file content or file is empty',
				});
			return;
		}
	}

	const id = randomUUID();
	const html = await parseMarkdown(content as string);

	cache.set(id, {
		id,
		createdAt: Date.now(),
		html,
	});

	res
		.status(200)
		.header({
			'Content-Type': 'application/json',
		})
		.send({
			id,
			html,
		});
});

app.listen(process.env.PORT ?? 3_000, () => {
	console.log(`Server is running on port ${process.env.PORT ?? 3_000}`);
});
