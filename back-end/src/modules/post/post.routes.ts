import { Router } from "express";
import { authentication } from "../../middlewares/authentication";
import { authorization } from "../../middlewares/authorization";
import { sanitizeBody } from "../../middlewares/sanitizeBody";
import { handleImage, uploadImage } from "../../middlewares/uploadSingle";
import { validateBody } from "../../middlewares/validateBody";
import { createPostSchema } from "../../shcemas/post.schema";
import postController from "./post.controller";

const router = Router();

router.post(
	"/",
	authentication,
	authorization,
	uploadImage,
	handleImage,
	sanitizeBody([
		"title",
		"content",
		"summary",
		"tags",
		"category",
		"coverImage",
	]),
	validateBody(createPostSchema),
	postController.createPost,
);

export default router;
