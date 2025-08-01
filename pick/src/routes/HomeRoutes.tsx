import React from "react";
import { useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";

const HomeRoutes: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  console.log("HomeRoutes - current path:", path);

  const renderComponent = () => {
    switch (path) {
      case "/":
        return <HomePage />;
      // bạn có thể thêm nhiều route ở đây
      default:
        return <div>404 - Page Not Found</div>; // ✅ đảm bảo luôn return
    }
  };

  return renderComponent(); // ✅ phải return JSX hoặc null
};

export default HomeRoutes;
