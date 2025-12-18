import type { IPost } from "../../@types/post.type";

import { postModel } from "./post.model";

export default {
	async getAllPosts() {
		return await postModel
			.find()
			.populate("author", "name email profilePhoto.uri")
			.lean();
	},

	async getPostById(id: string) {
		return await postModel
			.findById(id)
			.populate("author", "name email  profilePhoto.uri")
			.lean();
	},

	async createPost(post: IPost) {
		return await postModel.create(post);
	},

	async updatePostById(id: string, data: Partial<IPost>) {
		return await postModel
			.findByIdAndUpdate(id, data, { new: true, runValidators: true })
			.lean();
	},

	async deletePostById(id: string) {
		return await postModel
			.findByIdAndUpdate(id, { isActive: false }, { new: true })
			.exec();
	},
};
