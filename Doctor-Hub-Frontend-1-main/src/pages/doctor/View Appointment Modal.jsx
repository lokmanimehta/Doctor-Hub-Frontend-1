import React from "react";
import "./ViewAppointmentModal.css";

const ViewAppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="view-modal-overlay" onClick={onClose}>
      <div className="view-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{appointment.patientName}</h3>
          <span className={`status-pill ${appointment.status.toLowerCase()}`}>
            {appointment.status}
          </span>
        </div>

        <div className="modal-body">
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Hospital:</strong> {appointment.hospitalName}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Slot:</strong> {appointment.slot}</p>
          <p><strong>Complaint:</strong> {appointment.complaint || "N/A"}</p>
          <p>
            <strong>Critical:</strong> 
            <span className={`critical-pill ${appointment.isCritical ? "yes" : "no"}`}>
              {appointment.isCritical ? "Yes" : "No"}
            </span>
          </p>
        </div>

        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ViewAppointmentModal;
