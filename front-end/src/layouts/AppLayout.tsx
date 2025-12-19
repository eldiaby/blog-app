import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";

const AppLayout: React.FC = () => {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
};

export default AppLayout;
