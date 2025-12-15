import type { NextFunction, Request, Response } from "express";
import { IUserRole } from "../@types/user.type";
import apiResponse, { ResponseStatus } from "../utils/apiResponse";

export const authorization = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (!req.user) {
		return apiResponse(res, {
			message: "Unauthorized",
			status: ResponseStatus.FAIL,
			statusCode: 401,
		});
	}

	const isAdmin = req.user.role === IUserRole.ADMIN;
	const isOwner = req.user.id === req.params.id;

	if (isAdmin || isOwner) {
		return next();
	}

	return apiResponse(res, {
		message: "Not authorized",
		status: ResponseStatus.FAIL,
		statusCode: 403,
	});
};
