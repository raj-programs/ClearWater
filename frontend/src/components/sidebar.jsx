import { Link } from "react-router-dom";
import { FaHome, FaWater, FaHistory, FaSignOutAlt } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

function Sidebar({ isOpen }) {
  const { signOut } = useAuth();

  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}>

      <nav className="sidebar-nav">

        <Link to="/home" className="sidebar-item">
          <FaHome />
          {isOpen && <span>Home</span>}
        </Link>

        <Link to="/check" className="sidebar-item">
          <FaWater /> <span className="nowrap">Water Quality</span>
        </Link>

        <div className="sidebar-item">
          <FaHistory />
          {isOpen && <span>History</span>}
        </div>

        <Link to="/ngos" className="sidebar-item">
          <RiUserCommunityFill />
          {isOpen && <span>NGOs</span>}
        </Link>

        <Link to="/profile" className="sidebar-item">
          <CgProfile />
          {isOpen && <span>Profile</span>}
        </Link>

        <button
          onClick={signOut}
          className="sidebar-item sidebar-logout w-full text-left border-none bg-transparent cursor-pointer"
        >
          <FaSignOutAlt />
          {isOpen && <span>Logout</span>}
        </button>

      </nav>

    </div>
  );
}

export default Sidebar;
