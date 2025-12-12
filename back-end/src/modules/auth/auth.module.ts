import authController from "./auth.controller";
import router from "./auth.routes";
import authService from "./auth.service";

export const authModule = {
	router,
	service: authService,
	controller: authController,
};
