import type { Request, Response } from "express";
import apiResponse from "./../../utils/apiResponse";
import commentService from "./comment.service";

export default {
	async createComment(req: Request, res: Response) {
		const { postId, content } = req.body;

		const data = await commentService.createComment(
			req.user.id,
			postId,
			content,
		);

		apiResponse(res, {
			statusCode: 201,
			message: "Comment created successfully.",
			data,
		});
	},

	async getAllComments(req: Request, res: Response) {
		const data = await commentService.getAllComments();

		apiResponse(res, {
			statusCode: 200,
			message: "Comment fetched successfully.",
			data,
		});
	},
};
