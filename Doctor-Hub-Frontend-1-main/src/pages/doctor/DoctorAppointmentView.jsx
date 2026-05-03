import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./DoctorAppointmentView.css";

const DoctorAppointmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="appointment-view">
      <h3>Appointment Details</h3>

      <div className="details-card">
        <p><strong>Appointment ID:</strong> {id}</p>
        <p><strong>Patient Name:</strong> Rahul Sharma</p>
        <p><strong>Time:</strong> 10:00 AM</p>
        <p><strong>Reason:</strong> Fever</p>
        <p><strong>Status:</strong> Pending</p>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default DoctorAppointmentView;
