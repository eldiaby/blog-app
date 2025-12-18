import { Types } from "mongoose";
import type { IPost } from "../../@types/post.type";
import { removeImage, uploadImageFromPath } from "../../utils/cloudinary";
import postRepository from "./post.repository";

export default {
	async getAllPosts() {
		return await postRepository.getAllPosts();
	},

	async getPost(id: string) {
		return await postRepository.getPostById(id);
	},

	async deletePost(id: string) {
		return await postRepository.getPostById(id);
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

		return await postRepository.createPost(postData);
	},

	async updatePost({
		newCoverImagePath,
		body,
		id,
	}: {
		newCoverImagePath?: string;
		body: Partial<IPost>;
		id: string;
	}) {
		const post = await postRepository.getPostById(id);

		if (!post) {
			throw new Error("Post not found");
		}

		if (newCoverImagePath && post?.coverImage?.publicId) {
			try {
				await removeImage(post.coverImage.publicId);

				const image = await uploadImageFromPath(
					newCoverImagePath,
					"posts/covers",
					{
						removeAfterUpload: true,
					},
				);

				if (image && image.secure_url && image.public_id) {
					post.coverImage.url = image.secure_url;
					post.coverImage.publicId = image.public_id;
				} else {
					throw new Error("Failed to upload new cover image");
				}

				if (body.tags && typeof body.tags === "string") {
					body.tags = body?.tags.split(",").map((tag) => tag.trim());
				}
			} catch (err) {
				console.error("Error handling image:", err);
				throw err;
			}
		}

		return await postRepository.updatePostById(id, {
			...body,
			coverImage: post.coverImage,
		});
	},
};
