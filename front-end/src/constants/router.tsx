import { createBrowserRouter, type RouteObject } from "react-router-dom";

import AppLayout from "@/layouts/AppLayout";
import CreatePost from "@/pages/createPost/CreatePost";
import Dashboard from "@/pages/dashBoard/DashBoard";
import Login from "@/pages/forms/Login/Login";
import Register from "@/pages/forms/Register/Register";
import Home from "@/pages/Home/Home";
import Posts from "@/pages/posts/Posts";

import { ROUTES } from "./routes";

const routes: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.PUBLIC.REGISTER, element: <Register /> },
      { path: ROUTES.PUBLIC.LOGIN, element: <Login /> },
      { path: ROUTES.PUBLIC.POSTS, element: <Posts /> },
      { path: ROUTES.PRIVATE.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.PRIVATE.CREATE_POST, element: <CreatePost /> },
    ],
  },
];

export default createBrowserRouter(routes);
