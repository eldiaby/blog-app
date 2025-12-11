import type { IUser } from "../../@types/user.type";
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
};
