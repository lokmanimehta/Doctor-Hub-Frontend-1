import React from "react";
import "./DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <img
        src={doctor.profileImage || "https://i.pravatar.cc/100"}
        alt={doctor.name}
      />
      <h3>{doctor.name}</h3>
      <p>Specialty: {doctor.specialty}</p>
      <p>Experience: {doctor.experience} yrs</p>
      <p>Status: {doctor.status || "Pending"}</p>
      <div className="doctor-card-buttons">
        <button className="verify-btn">Verify</button>
        <button className="reject-btn">Reject</button>
      </div>
    </div>
  );
};

export default DoctorCard;
