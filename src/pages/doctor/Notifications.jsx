// import React from "react";
// import "./Notifications.css";
// import { useNavigate } from "react-router-dom";
// import { useNotifications } from "../../hooks/useNotifications";

// const DoctorNotifications = () => {
//   const { notifications, markAsRead, removeNotification } = useNotifications();
//   const navigate = useNavigate();

//   const handleClick = (notification) => {
//     // Mark as read
//     markAsRead(notification.id);

//     // Remove from list (optional)
//     removeNotification(notification.id);

//     // Navigate based on type
//     switch (notification.type) {
//       case "APPOINTMENT":
//         navigate("/doctor/appointments");
//         break;
//       case "PATIENT":
//         navigate("/doctor/patients");
//         break;
//       case "PROFILE":
//         navigate("/doctor/profile");
//         break;
//       default:
//         navigate("/doctor/dashboard");
//     }
//   };

//   if (notifications.length === 0) {
//     return <p className="empty-text">No notifications</p>;
//   }

//   return (
//     <div className="doctor-notifications-page">
//       {notifications.map((n) => (
//         <div
//           key={n.id}
//           className={`notification-card ${n.isRead ? "read" : "unread"}`}
//           onClick={() => handleClick(n)}
//         >
//           {!n.isRead && <span className="notification-dot" />}
//           <p>{n.message}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DoctorNotifications;
// src/pages/doctor/Notifications.jsx






import React from "react";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigate } from "react-router-dom";
import { FiCalendar, FiUser, FiInfo, FiChevronRight, FiClock } from "react-icons/fi"; 
import "./Notifications.css";

const DoctorNotifications = () => {
  const { notifications, markAsRead, removeNotification } = useNotifications();
  const navigate = useNavigate();

  const grouped = notifications.reduce((acc, n) => {
    if (!acc[n.type]) acc[n.type] = [];
    acc[n.type].push(n);
    return acc;
  }, {});

  const handleClick = (notification) => {
    markAsRead(notification.id);
    switch (notification.type) {
      case "APPOINTMENT": navigate("/doctor/appointments"); break;
      case "PATIENT": navigate("/doctor/patients"); break;
      case "PROFILE": navigate("/doctor/profile"); break;
      default: navigate("/doctor/dashboard");
    }
    removeNotification(notification.id);
  };

  return (
    <div className="doctor-notifications-page">
      <div className="notif-page-header">
        <div className="header-left">
          <h3>Notifications</h3>
          <p>You have {notifications.length} unread updates</p>
        </div>
      </div>

      {Object.keys(grouped).length === 0 && (
        <div className="no-notif-box">
          <FiBellOff className="empty-icon" />
          <p>No new notifications</p>
        </div>
      )}

      {Object.entries(grouped).map(([type, items]) => (
        <div key={type} className="notif-group-container">
          <h4 className="notif-category-title">{type}</h4>
          
          <div className="notif-grid">
            {items.map((n) => (
              <div
                key={n.id}
                className={`notif-card-item ${n.isRead ? "is-read" : "is-unread"}`}
                onClick={() => handleClick(n)}
              >
                <div className="notif-icon-box">
                  {type === "APPOINTMENT" && <FiCalendar />}
                  {type === "PATIENT" && <FiUser />}
                  {type === "PROFILE" && <FiInfo />}
                </div>
                
                <div className="notif-content-wrapper">
                  <div className="notif-main-row">
                    <p className="notif-msg">{n.message}</p>
                    {/* ✅ YAHAN TIME DIKHEGA */}
                    <span className="notif-timestamp">
                      <FiClock className="time-icon" />
                      {n.time || "10:30 AM"} 
                    </span>
                  </div>
                  <span className="notif-date-tag">Today</span>
                </div>

                <FiChevronRight className="notif-arrow" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorNotifications;