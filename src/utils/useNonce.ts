import { randomBytes } from 'node:crypto';
import type { NextFunction, Request, Response } from 'express';

export function useNonce() {
	return (_: Request, res: Response, next: NextFunction) => {
		res.locals.nonce = randomBytes(16).toString('base64');
		next();
	};
}
