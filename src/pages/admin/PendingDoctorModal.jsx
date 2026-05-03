import React, { useState, useEffect } from "react";
import "./PendingDoctorModal.css";

const PendingDoctorModal = ({ doctor, onClose, onVerify, onReject }) => {
  const [rejectReason, setRejectReason] = useState("");
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showVerifyConfirm, setShowVerifyConfirm] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!doctor) return null;

  const handleReject = () => {
    if (!rejectReason.trim()) {
      setNotification("Please enter rejection reason");
      return;
    }
    setShowRejectConfirm(true);
  };

  const confirmReject = () => {
    onReject(doctor.id, rejectReason);
    setRejectReason("");
    setShowRejectConfirm(false);
    setNotification("Doctor rejected successfully");
    setTimeout(() => onClose(), 2000);
  };

  const handleVerify = () => {
    setShowVerifyConfirm(true);
  };

  const confirmVerify = () => {
    onVerify(doctor.id);
    setShowVerifyConfirm(false);
    setNotification("Doctor verified successfully");
    setTimeout(() => onClose(), 2000);
  };

  const handleClose = () => {
    onClose();
    setNotification("");
    setShowRejectConfirm(false);
    setShowVerifyConfirm(false);
  };

  return (
    <div className="pd-overlay" onClick={handleClose}>
      <div className="pd-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="pd-header">
          <div className="pd-doctor">
            <img src={doctor.image || "https://via.placeholder.com/150"} alt="doctor" />
            <div className="pd-doctor-info">
              <h2>{doctor.name}</h2>
              <p>{doctor.specialty}</p>
              <span className="pd-status">Pending Verification</span>
            </div>
          </div>
<button className="pd-close" onClick={handleClose}>✕</button>        </div>

        {/* BODY */}
        <div className="pd-body">
          <div className="pd-left">
            <section>
              <h3>Personal Information</h3>
              <p><b>Email:</b> {doctor.email}</p>
              <p><b>Phone:</b> {doctor.phone}</p>
              <p><b>Gender:</b> {doctor.gender}</p>
              <p><b>Experience:</b> {doctor.experience} yrs</p>
            </section>
            <section>
              <h3>Professional Details</h3>
              <p><b>Specialty:</b> {doctor.specialty}</p>
              <p><b>Qualification:</b> {doctor.qualification}</p>
              <p><b>Registration No:</b> {doctor.registrationNumber}</p>
              <p><b>Consultation Fee:</b> ₹{doctor.consultationFee}</p>
            </section>
            <section>
              <h3>Clinic Information</h3>
              <p><b>Clinic:</b> {doctor.clinic?.name}</p>
              <p><b>City:</b> {doctor.clinic?.city}</p>
              <p><b>Area:</b> {doctor.clinic?.area}</p>
              <p><b>Address:</b> {doctor.clinic?.address}</p>
            </section>
          </div>

          <div className="pd-right">
            <h3>Documents</h3>
            <div className="pd-doc"><span>Degree Certificate</span><button>View</button></div>
            <div className="pd-doc"><span>Medical Registration</span><button>View</button></div>
            <div className="pd-doc"><span>Government ID</span><button>View</button></div>
            <div className="pd-warning">Verify documents carefully before approval.</div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="pd-footer">
          <div className="pd-reject-box">
            <textarea
              placeholder="Reason for rejection (mandatory)"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <button className="pd-reject-btn" onClick={handleReject}>Reject</button>
          </div>

          <div className="pd-actions">
            <button className="pd-cancel-btn" onClick={handleClose}>Close</button>
            <button className="pd-verify-btn" onClick={handleVerify}>Verify Doctor</button>
          </div>
        </div>

        {/* --- CONFIRMATION MODALS (FIXED CENTER) --- */}
        {(showRejectConfirm || showVerifyConfirm) && (
          <div className="pd-confirm-overlay">
            <div className="pd-confirm-card">
              <p>{showRejectConfirm ? "Are you sure you want to reject this doctor?" : "Are you sure you want to verify this doctor?"}</p>
              <div className="pd-confirm-buttons">
                <button 
                  onClick={showRejectConfirm ? confirmReject : confirmVerify} 
                  className="pd-btn-yes"
                >
                  Yes, Proceed
                </button>
                <button 
                  onClick={() => { setShowRejectConfirm(false); setShowVerifyConfirm(false); }} 
                  className="pd-btn-no"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATION */}
        {notification && (
          <div className="pd-notification-toast">{notification}</div>
        )}
      </div>
    </div>
  );
};

export default PendingDoctorModal;