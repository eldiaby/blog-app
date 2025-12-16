import type { Request, Response } from "express";

import apiResponse from "./../../utils/apiResponse";

import postService from "./post.service";

export default {
	async createPost(req: Request, res: Response) {
		if (!req.file) {
			throw new Error("No file uploaded");
		}

		const imagePath = req.file.path;

		const post = await postService.createPost(req.body, req.user.id, imagePath);
		console.log(post);
		apiResponse(res, { data: post });
	},
};
