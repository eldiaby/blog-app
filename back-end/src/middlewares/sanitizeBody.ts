import type { NextFunction, Request, Response } from "express";

export const sanitizeBody =
	(allowedKeys: string[]) =>
	(req: Request, _: Response, next: NextFunction) => {
		if (req.body && typeof req.body === "object") {
			for (const key in req.body) {
				if (!allowedKeys.includes(key)) {
					delete req.body[key];
				}
			}
		}
		next();
	};
