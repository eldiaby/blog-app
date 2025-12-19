import { RouterProvider } from "react-router-dom";
import router from "@/constants/router";

const ReactRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default ReactRouter;
