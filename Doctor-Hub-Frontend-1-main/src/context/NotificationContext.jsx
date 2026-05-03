// import React, { createContext, useState, useEffect } from "react";

// // Only context and provider here
// export const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const initialNotifications =
//     JSON.parse(localStorage.getItem("doctorNotifications")) || [
//       { id: 1, type: "APPOINTMENT", message: "New appointment scheduled", isRead: false },
//       { id: 2, type: "PATIENT", message: "New patient added", isRead: false },
//       { id: 3, type: "PROFILE", message: "Profile incomplete", isRead: false },
//     ];

//   const [notifications, setNotifications] = useState(initialNotifications);

//   useEffect(() => {
//     localStorage.setItem("doctorNotifications", JSON.stringify(notifications));
//   }, [notifications]);

//   const unreadCount = notifications.filter((n) => !n.isRead).length;

//   const markAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
//     );
//   };

//   const removeNotification = (id) => {
//     setNotifications((prev) => prev.filter((n) => n.id !== id));
//   };

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, unreadCount, markAsRead, removeNotification }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };
// src/context/NotificationContext.jsx


import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create Context
export const NotificationContext = createContext();

// 2. Custom hook
export const useNotifications = () => useContext(NotificationContext);

// 3. Provider
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(
  [
      { id: 1, type: "APPOINTMENT", message: "New appointment scheduled", isRead: false },
      { id: 2, type: "PATIENT", message: "New patient added", isRead: false },
      { id: 3, type: "PROFILE", message: "Complete your profile", isRead: false },
    ]
  );

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem("doctorNotifications", JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, setNotifications, markAsRead, removeNotification, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
