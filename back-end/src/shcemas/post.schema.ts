import { z } from "zod";

export const createPostSchema = z
	.object({
		title: z.string().min(3, "Title must be at least 3 characters"),
		content: z.string().min(10, "Content must be at least 10 characters"),
		summary: z.string().optional(),
		tags: z.string().optional(),
		category: z.string().optional(),
		coverImage: z
			.object({
				url: z.string().url("Cover image must be a valid URL"),
				publicId: z.string(),
			})
			.optional(),
		isActive: z.boolean().optional(),
		views: z.number().optional(),
		likes: z.array(z.string()).optional(),
		seoTitle: z.string().optional(),
		seoDescription: z.string().optional(),
		embeddingVector: z.array(z.number()).optional(),
	})
	.strict();
