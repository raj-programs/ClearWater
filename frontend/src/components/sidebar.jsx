import { Link } from "react-router-dom";
import { FaHome, FaWater, FaHistory } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import "./Sidebar.css";

function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : "sidebar-close"}`}>
      
      <nav className="sidebar-nav">

        <Link to="/" className="sidebar-item">
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

        <div className="sidebar-item">
          <RiUserCommunityFill />
          {isOpen && <span>NGOs</span>}
        </div>

        <div className="sidebar-item">
          <CgProfile />
          {isOpen && <span>Profile</span>}
        </div>

      </nav>

    </div>
  );
}

export default Sidebar;