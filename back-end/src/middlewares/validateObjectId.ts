import type { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import apiResponse, { ResponseStatus } from "./../utils/apiResponse";

export const validateObjectId = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const { id } = req.params;

	if (!id || !isValidObjectId(id)) {
		return apiResponse(res, {
			message: "Invalid object id",
			status: ResponseStatus.ERROR,
			statusCode: 400,
		});
	}

	next();
};
