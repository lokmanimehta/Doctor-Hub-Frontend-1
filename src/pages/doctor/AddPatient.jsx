import React, { useState } from "react";
import { FiUser, FiPhone, FiMail, FiActivity, FiAlertCircle, FiClipboard } from "react-icons/fi";
import "./AddPatient.css";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    bloodGroup: "",
    symptoms: "",
    history: "",
    allergies: "",
    chronic: "",
    surgeries: "",
    medications: "",
    emergencyName: "",
    emergencyPhone: "",
    isCritical: false
  });

  const [errors, setErrors] = useState({});

  const validate = (field, value) => {
    switch(field) {
      case "phone":
      case "emergencyPhone":
        return /^\d{10}$/.test(value) ? "" : "Enter 10-digit number";
      case "email":
        return value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email" : "";
      case "age":
        return value && (value <= 0 || value > 120) ? "Enter valid age" : "";
      default:
        return "";
    }
  };

  const handleChange = (field, value) => {
    setFormData({...formData, [field]: value });
    const error = validate(field, value);
    setErrors({...errors, [field]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    ["phone","emergencyPhone","email","age"].forEach(f => {
      const err = validate(f, formData[f]);
      if(err) newErrors[f] = err;
    });
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0){
      console.log("Patient Saved:", formData);
      alert("Patient saved to your database!");
    } else {
      alert("Fix errors before saving!");
    }
  };

  return (
    <div className="add-patient-container">
      <div className="form-page-header">
        <h2>Add New Patient</h2>
        <p>Fill in the details to create a professional medical record.</p>
      </div>

      <form className="add-patient-form" onSubmit={handleSubmit}>
        <div className="form-sections-wrapper">

          {/* LEFT COLUMN */}
          <div className="form-column">
            {/* Priority Status */}
            <div className="form-card">
              <h3><FiAlertCircle /> Priority Status</h3>
              <div className="form-group critical-checkbox">
                <div className="checkbox-wrapper">
                  <input 
                    type="checkbox" 
                    checked={formData.isCritical} 
                    onChange={(e) => handleChange("isCritical", e.target.checked)} 
                    id="isCritical"
                  />
                  <label htmlFor="isCritical">Mark as Critical Case</label>
                </div>
                <small>Helps prioritize appointments and urgent care</small>
              </div>
            </div>

            {/* Personal Details */}
            <div className="form-card">
              <h3><FiUser /> Personal Details</h3>
              <div className="personal-details-grid">
                <div className="form-group name-field">
                  <label>Full Name <span className="mandatory">*</span></label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={formData.fullName}
                    required
                    onChange={(e) => handleChange("fullName", e.target.value)}
                  />
                </div>
                <div className="form-group age-field">
                  <label>Age <span className="mandatory">*</span></label>
                  <input
                    type="number"
                    placeholder="Years"
                    value={formData.age}
                    required
                    onChange={(e) => handleChange("age", e.target.value)}
                  />
                  {errors.age && <span className="error-msg">{errors.age}</span>}
                </div>
                <div className="form-group gender-field">
                  <label>Gender <span className="mandatory">*</span></label>
                  <select value={formData.gender} required onChange={(e) => handleChange("gender", e.target.value)}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="form-card">
              <h3><FiPhone /> Contact Info</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone <span className="mandatory">*</span></label>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    value={formData.phone}
                    required
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="patient@example.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="form-column">
            {/* Emergency Contact - Shifted here for balance */}
            <div className="form-card">
              <h3><FiAlertCircle /> Emergency Contact</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Contact Name</label>
                  <input 
                    type="text" 
                    placeholder="Name" 
                    value={formData.emergencyName} 
                    onChange={(e) => handleChange("emergencyName", e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Contact Phone</label>
                  <input 
                    type="tel" 
                    placeholder="Phone" 
                    value={formData.emergencyPhone} 
                    onChange={(e) => handleChange("emergencyPhone", e.target.value)} 
                  />
                </div>
              </div>
            </div>

            {/* Medical Info */}
            <div className="form-card">
              <h3><FiActivity /> Medical Information</h3>
              <div className="form-row">
                <div className="form-group">
                  <label>Blood Group</label>
                  <input type="text" placeholder="e.g. AB+" value={formData.bloodGroup} onChange={(e) => handleChange("bloodGroup", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Current Symptoms</label>
                  <input type="text" placeholder="Reason for visit" value={formData.symptoms} onChange={(e) => handleChange("symptoms", e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Medical History / Notes</label>
                <textarea placeholder="Past allergies, surgeries, chronic conditions..." value={formData.history} onChange={(e) => handleChange("history", e.target.value)}></textarea>
              </div>

              <div className="form-row triplet-row">
                <div className="form-group">
                  <label>Known Allergies</label>
                  <input type="text" placeholder="e.g. Penicillin" value={formData.allergies} onChange={(e) => handleChange("allergies", e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Chronic Conditions</label>
                  <input type="text" placeholder="Diabetes, etc." value={formData.chronic} onChange={(e) => handleChange("chronic", e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label>Medications</label>
                <input type="text" placeholder="Current meds" value={formData.medications} onChange={(e) => handleChange("medications", e.target.value)} />
              </div>
            </div>
          </div>

        </div>

        <div className="form-actions">
          <button type="submit" className="save-btn"><FiClipboard /> Save Patient Record</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;