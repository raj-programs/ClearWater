import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import "./profile.css";

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editForm, setEditForm] = useState({ full_name: "", phone_no: "", address: "" });

  useEffect(() => {
    if (!user) return;

    async function fetchProfile() {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
        setEditForm({
          full_name: data.full_name || "",
          phone_no: data.phone_no || "",
          address: data.address || "",
        });
      }
      setLoading(false);
    }

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: editForm.full_name,
        phone_no: editForm.phone_no,
        address: editForm.address,
        updated_at: new Date(),
      })
      .eq("id", user.id);

    if (error) {
      setMessage("Failed to update profile: " + error.message);
    } else {
      setProfile({ ...profile, ...editForm });
      setEditing(false);
      setMessage("Profile updated successfully!");
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full text-white text-lg">
        Profile not found.
      </div>
    );
  }

  const memberSince = profile.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
    : "N/A";

  return (
    <div className="profile-container">
      {/* Header Card */}
      <div className="profile-header-card">
        <div className="profile-avatar">
          <span>{(profile.full_name || "U").charAt(0)}</span>
        </div>
        <div className="profile-header-info">
          <h1 className="profile-name">{profile.full_name}</h1>
          <div className="profile-meta-row">
            <span><FaMapMarkerAlt /> {profile.address || "No address"}</span>
            <span><FaCalendarAlt /> Joined {memberSince}</span>
          </div>
        </div>
        <button
          className="ml-auto px-4 py-2 rounded-lg text-sm font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
          onClick={() => { setEditing(!editing); setMessage(""); }}
        >
          {editing ? <><FaTimes className="inline mr-1" />Cancel</> : <><FaEdit className="inline mr-1" />Edit Profile</>}
        </button>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm text-center ${message.includes("Failed") ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"}`}>
          {message}
        </div>
      )}

      {/* Content */}
      <div className="profile-grid">
        <div className="profile-left">
          {/* Contact Info */}
          <div className="profile-card">
            <h2>Contact Information</h2>
            <div className="profile-contact-list">
              <div className="profile-contact-item">
                <FaEnvelope className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Email</p>
                  <p className="profile-contact-value">{profile.email}</p>
                </div>
              </div>
              <div className="profile-contact-item">
                <FaPhone className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Phone</p>
                  {editing ? (
                    <input
                      type="tel"
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm w-full"
                      value={editForm.phone_no}
                      onChange={(e) => setEditForm({ ...editForm, phone_no: e.target.value })}
                    />
                  ) : (
                    <p className="profile-contact-value">{profile.phone_no || "Not set"}</p>
                  )}
                </div>
              </div>
              <div className="profile-contact-item">
                <FaMapMarkerAlt className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Address</p>
                  {editing ? (
                    <input
                      type="text"
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm w-full"
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                    />
                  ) : (
                    <p className="profile-contact-value">{profile.address || "Not set"}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="profile-card">
            <h2>Personal Information</h2>
            <div className="profile-contact-list">
              <div className="profile-contact-item">
                <div>
                  <p className="profile-contact-label">Full Name</p>
                  {editing ? (
                    <input
                      type="text"
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm w-full"
                      value={editForm.full_name}
                      onChange={(e) => setEditForm({ ...editForm, full_name: e.target.value })}
                    />
                  ) : (
                    <p className="profile-contact-value">{profile.full_name}</p>
                  )}
                </div>
              </div>
              <div className="profile-contact-item">
                <FaCalendarAlt className="profile-contact-icon" />
                <div>
                  <p className="profile-contact-label">Date of Birth</p>
                  <p className="profile-contact-value">
                    {profile.dob
                      ? new Date(profile.dob).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
                      : "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {editing && (
            <button
              className="w-full mt-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-50"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Saving..." : <><FaSave className="inline mr-2" />Save Changes</>}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
