import type { UpdateQuery, Query } from "mongoose";
import { Schema, model, Types } from "mongoose";
import type { NextFunction } from "express";

import type { IComment } from "../../@types/comment.type";

const commentSchema = new Schema<IComment>(
	{
		content: {
			type: String,
			required: [true, "Comment content is required."],
			trim: true,
			maxlength: [500, "Comment cannot exceed 500 characters."],
		},
		author: {
			type: Types.ObjectId,
			required: [true, "Author is required."],
			ref: "User",
		},
		post: {
			type: Types.ObjectId,
			required: [true, "Associated post is required."],
			ref: "Post",
		},
		likes: {
			type: [{ type: Types.ObjectId, ref: "User" }],
			default: [],
			_id: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		edited: {
			type: Boolean,
			default: false,
		},
		editedAt: {
			type: Date,
		},
	},
	{ timestamps: true },
);

// Middleware suggestion: automatically update `editedAt` when content changes
commentSchema.pre(
	"findOneAndUpdate",
	function (this: Query<IComment, IComment>, next: NextFunction) {
		const update = this.getUpdate() as UpdateQuery<IComment>;
		const content = update?.content || update?.$set?.content;

		if (content) {
			if (update.$set) {
				update.$set.edited = true;
				update.$set.editedAt = new Date();
			} else {
				update.$set = { edited: true, editedAt: new Date() };
			}
			this.setUpdate(update);
		}

		next();
	},
);

export default model("Comment", commentSchema);
