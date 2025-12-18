import type { IUser } from "../../@types/user.type";
import { UserModel } from "./user.model";

export const userRepository = {
	async findAll() {
		return await UserModel.find().populate("posts");
	},

	async findById(id: string) {
		return await UserModel.findById(id).populate("posts");
	},

	async findByEmail(email: string, options = { selectPassword: false }) {
		return await UserModel.findOne({ email }).select(
			`${options.selectPassword ? "+password" : "-password"}`,
		);
	},

	async findByUserName(name: string) {
		return await UserModel.findOne({ name });
	},

	async create(data: IUser) {
		const user = new UserModel(data);
		return await user.save();
	},

	async updateById(id: string, data: IUser) {
		return await UserModel.findByIdAndUpdate(id, data, { new: true });
	},

	async deleteById(id: string) {
		return await UserModel.findByIdAndUpdate(
			id,
			{ isActive: false },
			{ new: true },
		);
	},
};
