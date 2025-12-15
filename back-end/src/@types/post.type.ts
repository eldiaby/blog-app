import type { Document, Schema } from "mongoose";

export interface IPost {
	title: string;
	content: string;
	summary?: string; // AI-generated summary
	author: Schema.Types.ObjectId; // User ID
	tags?: string[];
	category?: string;
	coverImage?: {
		url: string;
		publicId: string | null;
	};
	isActive?: boolean; // Soft Delete
	views?: number;
	likes?: string[]; // User IDs
	// seoTitle?: string;
	// seoDescription?: string;
	// embeddingVector?: number[]; // Optional for semantic search
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPostDocument extends IPost, Document {}
