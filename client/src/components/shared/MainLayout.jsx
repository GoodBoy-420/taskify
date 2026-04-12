import { Outlet } from "react-router-dom";

import AuthProvider from "../../providers/AuthProvider.jsx";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <AuthProvider>
        <main>
          <Outlet />
        </main>
        <Footer />
      </AuthProvider>
    </div>
  );
};

export default MainLayout;
