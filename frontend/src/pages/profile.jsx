import "./profile.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaWater, FaCheckCircle, FaStar } from "react-icons/fa";

function Profile() {
  const user = {
    name: "Satyajeet Ravan",
    role: "Water Quality Analyst",
    location: "Mumbai, Maharashtra",
    email: "satyajeet.ravan@clearwater.org",
    phone: "+91 98765 43210",
    joined: "April 2026",
    bio: "Passionate about protecting India's water resources. Working with ClearWater to monitor river health and promote sustainable water practices across Maharashtra.",
    stats: [
      { label: "Reports Filed", value: "127" },
      { label: "Rivers Monitored", value: "14" },
      { label: "Districts Covered", value: "8" },
      { label: "Alerts Raised", value: "23" },
    ],
    badges: [
      { icon: "🌊", title: "Water Guardian", desc: "100+ reports submitted" },
      { icon: "🔬", title: "Quality Expert", desc: "Advanced analysis certified" },
      { icon: "🌿", title: "Eco Warrior", desc: "Community cleanup leader" },
    ],
    recentActivity: [
      { date: "Apr 8, 2026", action: "Submitted water quality report for Mithi River" },
      { date: "Apr 5, 2026", action: "Flagged high turbidity levels in Ulhas River" },
      { date: "Apr 2, 2026", action: "Verified safe drinking water zone in Thane district" },
      { date: "Mar 28, 2026", action: "Joined cleanup drive with EFI at Powai Lake" },
    ],
  };

  return (
    <div className="profile-container">

      {/* Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar">
          <span>{user.name.charAt(0)}</span>
        </div>
        <div className="profile-header-info">
          <h1 className="profile-name">{user.name}</h1>
          <p className="profile-role">{user.role}</p>
          <div className="profile-meta-row">
            <span><FaMapMarkerAlt /> {user.location}</span>
            <span><FaCalendarAlt /> Joined {user.joined}</span>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="profile-grid">

        {/* Left Column */}
        <div className="profile-left">

          {/* Contact Info */}
          <div className="profile-card">
            <h2>Contact Information</h2>
            <div className="profile-contact-list">
              <div className="profile-contact-item">
                <FaEnvelope className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Email</p>
                  <p className="profile-contact-value">{user.email}</p>
                </div>
              </div>
              <div className="profile-contact-item">
                <FaPhone className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Phone</p>
                  <p className="profile-contact-value">{user.phone}</p>
                </div>
              </div>
              <div className="profile-contact-item">
                <FaMapMarkerAlt className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Location</p>
                  <p className="profile-contact-value">{user.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="profile-card">
            <h2>About</h2>
            <p className="profile-bio">{user.bio}</p>
          </div>

          {/* Badges */}
          <div className="profile-card">
            <h2><FaStar style={{ marginRight: 8 }} />Badges Earned</h2>
            <div className="profile-badges">
              {user.badges.map((badge, i) => (
                <div key={i} className="profile-badge">
                  <span className="profile-badge-icon">{badge.icon}</span>
                  <div>
                    <p className="profile-badge-title">{badge.title}</p>
                    <p className="profile-badge-desc">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="profile-right">

          {/* Stats */}
          <div className="profile-card">
            <h2><FaWater style={{ marginRight: 8 }} />Statistics</h2>
            <div className="profile-stats">
              {user.stats.map((stat, i) => (
                <div key={i} className="profile-stat">
                  <p className="profile-stat-value">{stat.value}</p>
                  <p className="profile-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="profile-card">
            <h2><FaCheckCircle style={{ marginRight: 8 }} />Recent Activity</h2>
            <div className="profile-activity-list">
              {user.recentActivity.map((item, i) => (
                <div key={i} className="profile-activity-item">
                  <div className="profile-activity-dot" />
                  <div>
                    <p className="profile-activity-action">{item.action}</p>
                    <p className="profile-activity-date">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
