import { model, Schema } from "mongoose";
import type { IPost } from "../../@types/post.type";

const postSchema = new Schema<IPost>(
	{
		title: { type: String, required: true },
		content: { type: String, required: true },
		summary: { type: String },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
		tags: [{ type: String }],
		category: { type: String },
		coverImage: { url: String, publicId: String },
		isActive: { type: Boolean, default: true },
		views: { type: Number, default: 0 },
		likes: {
			type: [{ type: Schema.Types.ObjectId, ref: "User" }],
			default: [],
		},
	},
	{ timestamps: true },
);

export const postModel = model<IPost>("Post", postSchema);
