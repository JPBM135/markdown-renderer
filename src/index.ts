import process from 'node:process';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { parseMarkdown } from './markdown/index.js';

const app = express();

app.use(cors());
app.use(helmet());

app.get('/', (_, res) => {
	res.status(200).send({
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
		res.status(400).send({
			error: 'No markdown content or file provided',
		});
		return;
	}

	if (markdownQuery && fileQuery) {
		res.status(400).send({
			error: 'Both markdown content and file provided, please provide only one',
		});
		return;
	}

	let content = markdownQuery;

	if (fileQuery) {
		const response = await fetch(decodeURI(fileQuery as string));

		if (!response.ok) {
			res.status(400).send({
				error: `Failed to fetch file (${response.status})`,
			});
			return;
		}

		content = await response.text();

		if (!content) {
			res.status(400).send({
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

app.listen(process.env.PORT ?? 3_000, () => {
	console.log(`Server is running on port ${process.env.PORT ?? 3_000}`);
});
