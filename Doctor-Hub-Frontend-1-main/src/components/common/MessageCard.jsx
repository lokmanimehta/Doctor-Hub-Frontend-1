import React from "react";
import "./MessageCard.css";

const MessageCard = ({ message, type, onClose }) => {
  return (
    <div className={`message-card ${type}`}>
      <p>{message}</p>
      <span className="close-btn" onClick={onClose}>&times;</span>
    </div>
  );
};

export default MessageCard;