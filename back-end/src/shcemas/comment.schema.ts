import { z } from "zod";

export const createCommentSchema = z
	.object({
		content: z
			.string({ error: "Comment content is required." })
			.trim()
			.max(500, "Comment cannot exceed 500 characters."),

		postId: z
			.string({ error: "Post ID is required." })
			.regex(/^[0-9a-fA-F]{24}$/, "Invalid post ID."),
	})
	.strict();

export const updateCommentSchema = z
	.object({
		content: z
			.string()
			.trim()
			.max(500, "Comment cannot exceed 500 characters.")
			.optional(),
		isActive: z.boolean().optional(),
	})
	.strict();
