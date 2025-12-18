import { Router } from "express";
import { authentication } from "../../middlewares/authentication";

import { authorization } from "../../middlewares/authorization";
import { sanitizeBody } from "../../middlewares/sanitizeBody";
import { handleImage, uploadImage } from "../../middlewares/uploadSingle";
import { validateBody } from "../../middlewares/validateBody";
import { validateObjectId } from "../../middlewares/validateObjectId";
import { createPostSchema, updatePostSchema } from "../../shcemas/post.schema";
import postController from "./post.controller";

const router = Router();

router.post(
	"/",
	authentication,
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

router.get(`/`, postController.getAllPosts);

router.get("/:id", validateObjectId, postController.getPost);

router.delete(
	"/:id",
	authentication,
	validateObjectId,
	postController.deletePost,
);

router.patch(
	"/:id",
	authentication,
	authorization,
	validateObjectId,
	uploadImage,
	handleImage({ throwError: false }),
	sanitizeBody([
		"title",
		"content",
		"summary",
		"tags",
		"category",
		"coverImage",
	]),
	validateBody(updatePostSchema),
	postController.updatePost,
);

export default router;
