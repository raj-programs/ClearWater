import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import WaterQuality from "./pages/waterQuality";
import Login from "./pages/login";
import Ngos from "./pages/ngos";
import Profile from "./pages/profile";
import Register from "./pages/register";
import river from "./assets/river.png";
import LandingPage from "./pages/Landingpage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isLoginPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/register";

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${river})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* Show Navbar ONLY if NOT login */}
      {!isLoginPage && (
        <div className="h-30 flex items-center px-4 bg-white/20 backdrop-blur-md shadow">
          <FaBars
            className="h-12 text-xl cursor-pointer text-white"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      )}

      <div className="flex flex-1">

        {!isLoginPage && <Sidebar isOpen={isOpen} />}

        <div className="flex-1 p-6">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/check" element={<WaterQuality />} />
              <Route path="/ngos" element={<Ngos />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
