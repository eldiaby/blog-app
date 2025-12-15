import { hash, verify } from "argon2";
import mongoose from "mongoose";
import {
	type IProfilePhoto,
	type IUserDocument,
	IUserRole,
} from "../../@types/user.type";

import { emailRegex, passwordRegex } from "./../../constants/regex";

const validateRegex = (value: string, type: "password" | "email") =>
	type === "password" ? passwordRegex.test(value) : emailRegex.test(value);

const defaultProfilePhoto: IProfilePhoto = {
	uri: "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027364_1280.png",
	publicId: null,
};

const userSchema = new mongoose.Schema<IUserDocument>(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
			trim: true,
		},
		role: {
			type: String,
			enum: {
				values: Object.values(IUserRole),
				message: "User role must be either 'USER' or 'ADMIN'",
			},
			required: [true, "Role is required"],
			default: IUserRole.USER,
		},
		email: {
			type: String,
			required: [true, "Email is required"],
			unique: true,
			lowercase: true,
			trim: true,
			validate: {
				validator: (value: string) => validateRegex(value, "email"),
				message: "Please provide a valid email address",
			},
		},
		password: {
			type: String,
			required: [true, "Password is required"],
			minlength: [8, "Password must be at least 8 characters long"],
			validate: {
				validator: (value: string) => validateRegex(value, "password"),
				message:
					"Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special character (more than 8 chars)",
			},
			select: false,
		},
		passwordConfirm: {
			type: String,
			select: false,
			// required: [true, "Please confirm your password"],
		},
		profilePhoto: {
			type: {
				uri: { type: String, default: defaultProfilePhoto.uri },
				publicId: { type: String, default: null },
			},
			default: defaultProfilePhoto,
		},
		bio: {
			type: String,
			trim: true,
		},
		isVerify: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true },
);

// Pre-save hook for hashing password
userSchema.pre<IUserDocument>("save", async function () {
	if (!this.isModified("password")) return;

	if (this.password !== this.passwordConfirm) {
		throw new Error("Passwords do not match");
	}

	this.password = await hash(this.password);
	this.passwordConfirm = undefined;
});

userSchema.methods.comparePassword = async function (
	password: string,
): Promise<boolean> {
	return await verify(this.password, password);
};

export const UserModel = mongoose.model<IUserDocument>("User", userSchema);
