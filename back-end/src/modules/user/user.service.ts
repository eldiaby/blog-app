import type { IUser } from "../../@types/user.type";

import { removeImage, uploadImage } from "./../../utils/cloudinary";
import removeLocalFile from "./../../utils/deleteLocalFile";

import { userRepository } from "./user.repository";

export const userService = {
	async getAllUsers() {
		return await userRepository.findAll();
	},

	async getUserById(id: string) {
		const user = await userRepository.findById(id);
		if (!user) throw new Error("User not found");
		return user;
	},

	async getUserByUserName(name: string) {
		const user = await userRepository.findByUserName(name);
		if (!user) throw new Error("User not found");
		return user;
	},

	async getUserByEmail(email: string, options = { selectPassword: false }) {
		const user = await userRepository.findByEmail(email, options);
		// if (!user) throw new Error("User not found");
		return user;
	},

	async createUser(data: IUser) {
		// if (!data.email?.includes("@")) {
		// 	throw new Error("Invalid email");
		// }

		const existing = await userRepository.findByEmail(data.name);
		if (existing) {
			throw new Error("name already registered");
		}

		return await userRepository.create(data);
	},

	async updateUser(id: string, data: IUser) {
		const user = await userRepository.updateById(id, data);
		if (!user) throw new Error("User not found");
		return user;
	},

	async deleteUser(id: string) {
		const user = await userRepository.deleteById(id);
		if (!user) throw new Error("User not found");
		return user;
	},

	async uploadUserImage(filePath: string, userId: string) {
		// 1) Upload image to cloud
		const image = await uploadImage(filePath);

		if (!image || !image.secure_url || !image.public_id) {
			throw new Error("Image upload failed");
		}

		// 2) Get user
		const user = await this.getUserById(userId);

		//
		if (!user.profilePhoto) {
			user.profilePhoto = {
				uri: "",
				publicId: "",
			};
		}

		// 3) Remove old image if exists
		if (user.profilePhoto.publicId) {
			await removeImage(user.profilePhoto.publicId);
		}

		// 4) Update user image
		user.profilePhoto.uri = image.secure_url;
		user.profilePhoto.publicId = image.public_id;

		await user.save();

		// 5) Remove local file
		await removeLocalFile(filePath);

		// 6) Return useful data
		return {
			uri: image.secure_url,
			publicId: image.public_id,
		};
	},
};
