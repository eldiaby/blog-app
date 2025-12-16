import type { IPost } from "../../@types/post.type";

import { postModel } from "./post.model";

export default {
	async getAllPosts() {
		return await postModel.find().exec();
	},

	async getPostById(id: string) {
		return await postModel.findById(id).exec();
	},

	async createPost(post: IPost) {
		return await postModel.create(post);
	},

	async updatePostById(id: string, data: Partial<IPost>) {
		return await postModel.findByIdAndUpdate(id, data, { new: true }).exec();
	},

	async deletePostById(id: string) {
		return await postModel
			.findByIdAndUpdate(id, { isActive: false }, { new: true })
			.exec();
	},
};
