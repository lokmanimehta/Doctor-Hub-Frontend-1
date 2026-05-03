import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Calendar,
  FileText,
  Pill,
  ShieldCheck
} from "lucide-react";
import "./notifications.css";

const dummyNotifications = [
  {
    id: "n1",
    type: "APPOINTMENT",
    title: "Appointment Confirmed",
    message:
      "Your appointment with Dr. Sharma at Apollo Clinic is confirmed for 26 Feb, 10:30 AM.",
    createdAt: "2026-02-26T09:30:00",
    route: "/patient/appointments"
  },
  {
    id: "n2",
    type: "LAB_REPORT",
    title: "Lab Report Available",
    message:
      "Your Blood Test report is now available. Tap to view.",
    createdAt: "2026-02-25T18:10:00",
    route: "/patient/lab-reports"
  },
  {
    id: "n3",
    type: "PRESCRIPTION",
    title: "New Prescription Added",
    message:
      "Dr. Mehta has added a new prescription after your visit.",
    createdAt: "2026-02-24T14:45:00",
    route: "/patient/prescriptions"
  },
  {
    id: "n4",
    type: "REMINDER",
    title: "Follow-up Reminder",
    message:
      "Your follow-up appointment is due this week.",
    createdAt: "2026-02-23T09:00:00",
    route: "/patient/appointments"
  },
  {
    id: "n5",
    type: "SECURITY",
    title: "New Login Detected",
    message:
      "Your account was accessed from a new device.",
    createdAt: "2026-02-22T21:20:00",
    route: "/patient/profile"
  }
];

const getIcon = (type) => {
  switch (type) {
    case "APPOINTMENT":
      return <Calendar size={22} />;
    case "LAB_REPORT":
      return <FileText size={22} />;
    case "PRESCRIPTION":
      return <Pill size={22} />;
    case "SECURITY":
      return <ShieldCheck size={22} />;
    default:
      return <Bell size={22} />;
  }
};

const Notifications = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(
    dummyNotifications
  );

  const sortedNotifications = useMemo(() => {
    return [...notifications].sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    );
  }, [notifications]);

  const getTimeLabel = (date) => {
    const diffHours =
      (new Date() - new Date(date)) /
      (1000 * 60 * 60);

    if (diffHours < 24) return "Today";
    if (diffHours < 48) return "Yesterday";
    return "Earlier";
  };

  const handleNotificationClick = (notification) => {
    // 🔥 remove from UI (dummy behaviour)
    setNotifications((prev) =>
      prev.filter((n) => n.id !== notification.id)
    );

    // 🔥 navigate to target page
    navigate(notification.route);
  };

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h1>Notifications</h1>
        <p>Stay updated about your care</p>
      </div>

      {sortedNotifications.length === 0 ? (
        <div className="empty-state">
          <Bell size={40} />
          <p>You’re all caught up</p>
        </div>
      ) : (
        sortedNotifications.map((item, index) => {
          const currentLabel = getTimeLabel(
            item.createdAt
          );
          const prevLabel =
            index > 0
              ? getTimeLabel(
                  sortedNotifications[index - 1]
                    .createdAt
                )
              : null;

          return (
            <React.Fragment key={item.id}>
              {currentLabel !== prevLabel && (
                <div className="date-label">
                  {currentLabel}
                </div>
              )}

              <div
                className="notification-card unread"
                onClick={() =>
                  handleNotificationClick(item)
                }
              >
                <div className="icon">
                  {getIcon(item.type)}
                </div>

                <div className="content">
                  <h3>{item.title}</h3>
                  <p>{item.message}</p>
                </div>

                <span className="dot" />
              </div>
            </React.Fragment>
          );
        })
      )}
    </div>
  );
};

export default Notifications;