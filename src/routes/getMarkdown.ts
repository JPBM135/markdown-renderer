import type { Request, Response } from 'express';
import { parseMarkdown } from '../markdown/index.js';

export async function handleGetMarkdown(req: Request, res: Response) {
	const { markdown: markdownQuery, file: fileQuery, type: typeQuery, theme } = req.query;

	console.log(`[Received request]`, {
		markdownQuery,
		fileQuery,
		typeQuery,
		ip: req.ip,
		userAgent: req.get('User-Agent'),
		locals: res.locals,
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

	if (theme && theme !== 'light' && theme !== 'dark') {
		res
			.status(400)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'Invalid theme provided, only "light" and "dark" are supported',
			});
		return;
	}

	const html = await parseMarkdown(content as string, res.locals.nonce, theme as 'dark' | 'light');
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
}
