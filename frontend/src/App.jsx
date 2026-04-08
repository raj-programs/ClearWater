import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/sidebar";
import Home from "./pages/home";
import WaterQuality from "./pages/waterQuality";
import Login from "./pages/login";
import river from "./assets/river.png";
import ResultCard from "./components/ResultCard";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isLoginPage = location.pathname === "/";

  return (
    <div
      className="h-screen w-full flex flex-col"
      style={{
        backgroundImage: `url(${river})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      {/* 🔥 Show Navbar ONLY if NOT login */}
      {!isLoginPage && (
        <div className="h-16 flex items-center px-4 bg-white/20 backdrop-blur-md shadow">
          <FaBars
            className="text-xl cursor-pointer text-white"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      )}

      <div className="flex flex-1">
        
        
        {!isLoginPage && <Sidebar isOpen={isOpen} />}

        <div className="flex-1 p-6">
          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/check" element={<WaterQuality />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;