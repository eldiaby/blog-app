import type { Document } from "mongoose";

export interface IProfilePhoto {
	uri: string;
	publicId: string | null;
}

export enum IUserRole {
	ADMIN = `admin`,
	USER = `user`,
}

export interface IUser {
	name: string;
	role?: IUserRole;
	email: string;
	password: string;
	passwordConfirm?: string;
	profilePhoto: IProfilePhoto;
	bio?: string;
	isVerify?: boolean;
	isActive?: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IUserDocument extends IUser, Document {
	comparePassword: (password: string) => boolean;
}
