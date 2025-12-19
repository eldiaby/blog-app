import controller from "./comment.controller";

import model from "./comment.model";

import repository from "./comment.repository";

import router from "./comment.routes";

import service from "./comment.service";

export const CommentModule = {
	controller,
	model,
	router,
	repository,
	service,
};
