import { Types } from "mongoose";
import type { IPost } from "../../@types/post.type";
import { uploadImageFromPath } from "../../utils/cloudinary";
import postRepository from "./post.repository";

export default {
	async getAllPosts() {
		return await postRepository.getAllPosts();
	},

	async createPost(postData: IPost, authorId: string, imageFilePath: string) {
		postData.author = new Types.ObjectId(authorId);

		if (postData.tags) {
			postData.tags = postData.tags
				.toString()
				.split(",")
				.map((tag) => tag.trim());
		}

		const uploadedCover = await uploadImageFromPath(
			imageFilePath,
			"posts/covers",
			{ removeAfterUpload: true },
		);

		if (!postData.coverImage) {
			postData.coverImage = { url: "", publicId: null };
		}

		if (uploadedCover) {
			postData.coverImage.url = uploadedCover.secure_url;
			postData.coverImage.publicId = uploadedCover.public_id;
		}

		console.log("Final post data:", postData);

		return await postRepository.createPost(postData);
	},
};
