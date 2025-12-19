export const ROUTES = {
  ROOT: "/",
  PUBLIC: {
    LOGIN: "login",
    REGISTER: "register",
    POSTS: "posts",
  },
  PRIVATE: {
    DASHBOARD: "dashboard",
    CREATE_POST: "create-post",
  },
} as const;
