import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import sendResponse, { ResponseStatus } from "./apiResponse";

export const validateBody = <T>(schema: ZodType<T>) => {
	return (req: Request, res: Response, next: NextFunction) => {
		try {
			const validatedBody: T = schema.parse(req.body);
			req.body = validatedBody;
			next();
		} catch (err) {
			if (err instanceof ZodError) {
				return sendResponse(res, {
					statusCode: 400,
					status: ResponseStatus.FAIL,
					message: "Validation failed",
					data: err.message,
				});
			}
			return sendResponse(res, {
				statusCode: 500,
				status: ResponseStatus.ERROR,
				message: "Server error",
			});
		}
	};
};
