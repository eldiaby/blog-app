import { Types } from "mongoose";
import commentRepository from "./comment.repository";

export default {
	async createComment(author: string, post: string, content: string) {
		const comment = {
			author: new Types.ObjectId(author),
			post: new Types.ObjectId(post),
			content,
		};
		return await commentRepository.createComment(comment);
	},

	async getAllComments() {
		return await commentRepository.getAllComments();
	},
};
