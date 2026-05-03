// src/pages/doctor/AddPatientModal.jsx
import React, { useState, useEffect } from "react";
import "./AddPatientModal.css";

const AddPatientModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    console.log({ name, age, gender, phone }); // UI-only for now
    onClose();
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Add Patient</h3>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Age</label>
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label>Phone</label>
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="modal-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save Patient
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPatientModal;
