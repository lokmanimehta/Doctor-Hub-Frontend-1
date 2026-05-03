import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { adminDashboardData } from "../../utils/adminDashboardDummyData";
import "./AdminDashboard.css";
import { Eye } from "lucide-react";
const AdminDashboard = () => {
  const navigate = useNavigate();

  const {
    stats = {},
    pendingDoctors = [],
    systemLogs = [],
    recentFeedback = []
  } = adminDashboardData;

  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const keyword = searchValue.toLowerCase().trim();

  /* =========================
     TEXT HIGHLIGHT
     ========================= */
  const highlightText = (text) => {
    if (!keyword || !text) return text;
    const parts = text.split(new RegExp(`(${keyword})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === keyword ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  /* =========================
     GLOBAL FILTERING
     ========================= */
  const filteredDoctors = useMemo(() => {
    if (!keyword) return pendingDoctors;
    return pendingDoctors.filter((doc) =>
      [doc.name, doc.specialty, doc.hospital, doc.city]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [keyword, pendingDoctors]);

  const filteredFeedback = useMemo(() => {
    if (!keyword) return recentFeedback;
    return recentFeedback.filter((fb) =>
      [fb.user, fb.message, fb.status]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [keyword, recentFeedback]);

  const filteredLogs = useMemo(() => {
    if (!keyword) return systemLogs;
    return systemLogs.filter((log) =>
      [log.message, log.actor, log.type]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [keyword, systemLogs]);

  /* =========================
     SEARCH SUGGESTIONS
     ========================= */
  const suggestions = useMemo(() => {
    if (!keyword) return [];

    const doctorSuggestions = pendingDoctors
      .filter((d) => d.name.toLowerCase().includes(keyword))
      .map((d) => ({ label: d.name, type: "Doctor" }));

    const feedbackSuggestions = recentFeedback
      .filter((f) => f.message.toLowerCase().includes(keyword))
      .map((f) => ({ label: f.message, type: "Feedback" }));

    const logSuggestions = systemLogs
      .filter((l) => l.message.toLowerCase().includes(keyword))
      .map((l) => ({ label: l.message, type: "Log" }));

    return [...doctorSuggestions, ...feedbackSuggestions, ...logSuggestions].slice(
      0,
      6
    );
  }, [keyword, pendingDoctors, recentFeedback, systemLogs]);

  const handleSearchSelect = (value) => {
    setSearchValue(value);
    setShowSuggestions(false);
    setRecentSearches((prev) => {
      const updated = [value, ...prev.filter((v) => v !== value)];
      return updated.slice(0, 5);
    });
  };

  return (
    <div className="admin-dashboard">

      {/* 🔍 GLOBAL SEARCH */}
      <div className="dashboard-search">
        <input
          type="text"
          placeholder="Search doctors, feedback, logs..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />

        {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
          <div className="search-suggestions">

            {keyword === "" && recentSearches.length > 0 && (
              <>
                <p className="suggestion-title">Recent Searches</p>
                {recentSearches.map((item, i) => (
                  <div
                    key={i}
                    className="suggestion-item"
                    onClick={() => handleSearchSelect(item)}
                  >
                    {item}
                  </div>
                ))}
              </>
            )}

            {keyword !== "" &&
              suggestions.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-item"
                  onClick={() => handleSearchSelect(s.label)}
                >
                  <span className="suggestion-type">{s.type}</span>
                  {highlightText(s.label)}
                </div>
              ))}
          </div>
        )}
      </div>

      {/* 📊 STATS */}
      <div className="stats-grid">
        <StatCard title="Total Doctors" value={stats.totalDoctors} onClick={() => navigate("/admin/doctors")} />
        <StatCard title="Active Doctors" value={stats.activeDoctors} onClick={() => navigate("/admin/doctors?status=active")} />
        <StatCard title="Pending Verifications" value={stats.pendingDoctors} onClick={() => navigate("/admin/verify-doctors")} />
        <StatCard title="Patients" value={stats.totalPatients} onClick={() => navigate("/admin/users?role=patient")} />
        <StatCard title="Appointments" value={stats.totalAppointments} onClick={() => navigate("/admin/appointments")} />
        <StatCard title="Unread Feedback" value={stats.unreadFeedback} alert onClick={() => navigate("/admin/feedback?status=unread")} />
      </div>

      {/* 🧑‍⚕️ DOCTORS */}
      <Section title="Doctors Awaiting Verification">
        {filteredDoctors.length === 0 ? (
          <p className="empty">No results found</p>
        ) : (
          filteredDoctors.map((doc) => (
            <div key={doc.id} className="doctor-row hoverable">
              <div>
                <p className="doctor-name">{highlightText(doc.name)}</p>
                <p className="doctor-meta">
                  {highlightText(`${doc.specialty} • ${doc.hospital} • ${doc.city}`)}
                </p>
              </div>
              <button
                className="view-btn"
onClick={() => navigate(`/admin/doctors?highlight=${doc.id}`)}              >
               <Eye size={18} />
              </button>
            </div>
          ))
        )}
      </Section>

      {/* 💬 FEEDBACK */}
      <Section title="Recent Feedback">
        {filteredFeedback.map((fb) => (
          <div
            key={fb.id}
            className="feedback-item hoverable"
            onClick={() => navigate(`/admin/feedback/${fb.id}`)}
          >
            <p>{highlightText(fb.message)}</p>
            <span className="fb-meta">
              {highlightText(fb.user)} • {fb.createdAt}
            </span>
          </div>
        ))}
      </Section>

      {/* 🧾 LOGS */}
      <Section title="System Logs">
        {filteredLogs.map((log) => (
          <div
            key={log.id}
            className="log hoverable"
            onClick={() => navigate("/admin/system-logs")}
          >
            {highlightText(log.message)}
          </div>
        ))}
      </Section>

    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, alert, onClick }) => (
  <div className={`stat-card clickable ${alert ? "alert" : ""}`} onClick={onClick}>
    <p className="stat-title">{title}</p>
    <h3 className="stat-value">{value}</h3>
  </div>
);

const Section = ({ title, children }) => (
  <div className="section">
    <h2>{title}</h2>
    {children}
  </div>
);

export default AdminDashboard;