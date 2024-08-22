import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';
import { MarkdownCache } from '../cache/index.js';
import { parseMarkdown } from '../markdown/index.js';

export async function postMarkdown(req: Request, res: Response) {
	const { markdown, file, theme } = req.body;

	const cache = MarkdownCache.getInstance();

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

	const id = randomUUID();
	const html = await parseMarkdown(content as string, res.locals.nonce, theme as 'dark' | 'light');

	cache.set(id, html);

	res
		.status(200)
		.header({
			'Content-Type': 'application/json',
		})
		.send({
			id,
			html,
		});
}
