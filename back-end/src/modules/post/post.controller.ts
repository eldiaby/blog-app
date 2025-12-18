import type { Request, Response } from "express";
import apiResponse from "./../../utils/apiResponse";
import postService from "./post.service";
import { IUserRole } from "../../@types/user.type";

export default {
	async createPost(req: Request, res: Response) {
		try {
			if (!req.file) {
				return apiResponse(res, {
					message: "No file uploaded",
					data: null,
					statusCode: 400,
				});
			}

			const imagePath = req.file.path;
			const post = await postService.createPost(
				req.body,
				req.user.id,
				imagePath,
			);
			return apiResponse(res, {
				message: "Post created successfully",
				data: post,
				statusCode: 201,
			});
		} catch (error) {
			console.error(error);
			return apiResponse(res, {
				message: "Error creating post",
				data: error.message,
				statusCode: 500,
			});
		}
	},

	async getAllPosts(req: Request, res: Response) {
		try {
			const posts = await postService.getAllPosts();
			if (posts.length === 0) {
				return apiResponse(res, {
					message: "No posts found",
					data: [],
					statusCode: 200,
				});
			}
			return apiResponse(res, {
				message: "Posts retrieved successfully",
				data: posts,
				statusCode: 200,
			});
		} catch (error) {
			console.error(error);
			return apiResponse(res, {
				message: "Error retrieving posts",
				data: error?.message,
				statusCode: 500,
			});
		}
	},

	async getPost(req: Request, res: Response) {
		try {
			const post = await postService.getPost(req.params.id);
			if (!post) {
				return apiResponse(res, {
					message: "Post not found",
					data: null,
					statusCode: 404,
				});
			}
			return apiResponse(res, {
				message: "Post retrieved successfully",
				data: post,
				statusCode: 200,
			});
		} catch (error) {
			console.error(error);
			return apiResponse(res, {
				message: "Error retrieving post",
				data: error?.message,
				statusCode: 500,
			});
		}
	},
	async deletePost(req: Request, res: Response) {
		try {
			const post = await postService.getPost(req.params.id);
			if (!post) {
				return apiResponse(res, {
					message: "Post not found",
					data: null,
					statusCode: 404,
				});
			}

			if (
				post.author._id.toString === req.body.id ||
				req.user.role === IUserRole.ADMIN
			) {
				await postService.deletePost(req.params.id);

				return apiResponse(res, {
					message: "Post deleted successfully",
					data: post,
					statusCode: 200,
				});
			} else {
				throw new Error(`Not authorized`);
			}
		} catch (error) {
			if (error instanceof Error) {
				return apiResponse(res, {
					message: "Error deleting post",
					data: error.message,
					statusCode: 500,
				});
			}

			return apiResponse(res, {
				message: "Unexpected error",
				data: "An unexpected error occurred",
				statusCode: 500,
			});
		}
	},

	async updatePost(req: Request, res: Response) {
		const path = req.file?.path;
		const newPost = await postService.updatePost({
			newCoverImagePath: path,
			body: req.body,
			id: req.params.id,
		});
		res.json(newPost);
	},
};
