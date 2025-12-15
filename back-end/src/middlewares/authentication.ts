import type { NextFunction, Request, Response } from "express";
import apiResponse from "./../utils/apiResponse";
import { verifyAuthToken } from "../utils/jwt";

export const authentication = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const token = req.headers.authorization?.startsWith("Bearer ")
		? req.headers.authorization.split(" ")[1]
		: req.signedCookies.auth_token;

	if (!token) {
		return apiResponse(res, {
			message: "Unauthorized",
			statusCode: 401,
		});
	}

	try {
		req.user = verifyAuthToken(token);
		console.log(req.user);
		next();
	} catch (_) {
		return apiResponse(res, {
			message: "Invalid or expired token",
			statusCode: 401,
		});
	}
};
