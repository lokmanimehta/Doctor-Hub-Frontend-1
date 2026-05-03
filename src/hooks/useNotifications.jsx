import { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

// Only the hook is exported here
export const useNotifications = () => useContext(NotificationContext);
