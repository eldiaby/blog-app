import type { ReactNode } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "@/pages/forms/Login/Login";
import Register from "@/pages/forms/Register/Register";
import Home from "@/pages/Home/Home";

const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Register />,
    path: "/rigister",
  },
]);

const ReactRouter: React.FC<{ children?: ReactNode }> = ({ children }) => {
  return <RouterProvider router={router}> {children && children}</RouterProvider>;
};

export default ReactRouter;
