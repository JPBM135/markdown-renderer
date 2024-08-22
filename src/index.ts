import process from 'node:process';
import { URL } from 'node:url';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { handleGetMarkdown } from './routes/getMarkdown.js';
import { getMarkdownWithId } from './routes/getMarkdownWithId.js';
import { postMarkdown } from './routes/postMarkdown.js';
import { useNonce } from './utils/useNonce.js';

const app = express();

app.use(cors());
app.use(useNonce());
app.use(
	helmet({
		contentSecurityPolicy: {
			directives: {
				defaultSrc: ["'self'"],
				scriptSrc: [
					"'self'",
					// @ts-expect-error: Property 'nonce' does not exist on type 'ServerResponse' but exists on type 'Response'.
					(_, res) => `'nonce-${res.locals.nonce}'`,
				],
				scriptSrcElem: [
					"'self'",
					'https://cdn.jsdelivr.net/npm/mermaid@10/',
					// @ts-expect-error: Property 'nonce' does not exist on type 'ServerResponse' but exists on type 'Response'.
					(_, res) => `'nonce-${res.locals.nonce}'`,
				],
				imgSrc: ['*'],
			},
		},
	}),
);
app.use(express.json());

const staticPath = new URL('../public', import.meta.url).pathname;
app.use('/public', express.static(staticPath));

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

app.get('/markdown', handleGetMarkdown);

app.get('/markdown/:id', getMarkdownWithId);

app.post('/markdown', postMarkdown);

app.listen(process.env.PORT ?? 3_000, () => {
	console.log(`Server is running on port ${process.env.PORT ?? 3_000}`);
});
