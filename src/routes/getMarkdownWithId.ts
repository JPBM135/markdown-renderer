import type { Request, Response } from 'express';
import { MarkdownCache } from '../cache/index.js';

export async function getMarkdownWithId(req: Request, res: Response) {
	const { id } = req.params;
	const { format } = req.query;

	if (!id) {
		res
			.status(400)
			.header({
				'Content-Type': 'application/json',
			})
			.send({
				error: 'No ID provided',
			});
	}

	const cache = MarkdownCache.getInstance();

	const cached = cache.get(id!);
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
}
