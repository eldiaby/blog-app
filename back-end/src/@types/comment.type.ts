import type { Document, Types } from "mongoose";

export interface IComment {
	content: string;
	author: Types.ObjectId;
	post: Types.ObjectId;
	likes?: Types.ObjectId[];
	isActive?: boolean;
	edited?: boolean;
	editedAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface ICommentDocument extends IComment, Document {}
