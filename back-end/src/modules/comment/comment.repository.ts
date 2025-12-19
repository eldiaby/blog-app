import type { IComment } from "../../@types/comment.type";
import commentModel from "./comment.model";

export default {
	async getAllComments() {
		return await commentModel.find().lean();
	},

	async getCommentById(id: string) {
		return await commentModel.findById(id).lean();
	},

	async createComment(comment: IComment) {
		return await commentModel.create(comment);
	},
};
