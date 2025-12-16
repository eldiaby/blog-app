import postController from "./post.controller";
import { postModel } from "./post.model";
import postRepository from "./post.repository";
import router from "./post.routes";
import postService from "./post.service";

export const PostModule = {
	router,
	model: postModel,
	repository: postRepository,
	service: postService,
	controller: postController,
};
