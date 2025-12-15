import type { NextFunction, Request, Response } from "express";

import type { IUserRole } from "./../@types/user.type";

import apiResponse from "./../utils/apiResponse";

export const restrictTo =
	(...roles: IUserRole[]) =>
	(req: Request, res: Response, next: NextFunction) => {
		if (!req.user) {
			return apiResponse(res, {
				statusCode: 401,
				message: "Not authenticated",
			});
		}

		if (!roles.includes(req.user.role)) {
			return apiResponse(res, {
				statusCode: 403,
				message: "Forbidden",
			});
		}

		next();
	};
