import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiFileText,
  FiClock,
  FiInfo,
  FiCheckCircle,
  FiLock,
  FiActivity,
  FiExternalLink,
  FiPlusCircle,
  FiThumbsUp
} from "react-icons/fi";
import { patientAppointmentsDummyData } from "../../utils/patientAppointmentsDummyData";
import { prescriptionsDummyData } from "../../utils/prescriptionsDummyData";
import { patientDashboardData } from "../../utils/patientDashboardDummyData";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isRecovered, setIsRecovered] = useState(false);

  const { welcomeMessage, upcomingAppointment, healthSummary } = patientDashboardData;

  const wellnessTips = [
    "Stay hydrated! Drinking at least 8 glasses of water daily helps maintain energy.",
    "A 30-minute walk today can significantly improve your cardiovascular health.",
    "Prioritize 7-8 hours of sleep tonight to boost your immune system.",
    "Limit your salt intake to help maintain healthy blood pressure levels.",
    "Deep breathing for 5 minutes can help reduce stress and improve focus."
  ];
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const dailyTip = wellnessTips[dayOfYear % wellnessTips.length];

  const pendingLabTests = [
    { id: 1, testName: "CBC & Lipid Profile", lab: "City Diagnostic", date: "24 Feb" },
  ];

  return (
    <div className="patient-dashboard-container">
      {/* --- HEADER --- */}
      <header className="dashboard-header-premium">
        <div className="hero-main-text">
          <h1>{welcomeMessage} 👋</h1>
          <p className="hero-subtitle"></p>
        </div>
        <div className="daily-tip-card">
          <div className="tip-header"><FiInfo /> <span>Wellness Insight</span></div>
          <p>"{dailyTip}"</p>
        </div>
      </header>

      {/* --- UPCOMING APPOINTMENT --- */}
      {upcomingAppointment && (
        <div className="priority-apt-card-top">
          <div className="apt-header-top">
            <span className="p-badge">Upcoming Appointment</span>
            <FiExternalLink style={{cursor: 'pointer'}} />
          </div>
          <div className="apt-content-horizontal">
            <div className="doc-profile-main">
              <div className="doc-avatar-large">{upcomingAppointment.doctorName.charAt(0)}</div>
              <div className="doc-meta-info">
                <h3 style={{margin: 0}}>{upcomingAppointment.doctorName}</h3>
                <p style={{margin: '5px 0 0', opacity: 0.8}}>{upcomingAppointment.specialty}</p>
              </div>
            </div>
            <div className="apt-details-box">
              <div className="detail-item">
                <FiCalendar /> <span>{upcomingAppointment.date}</span>
              </div>
              <div className="detail-item">
                <FiClock /> <span>{upcomingAppointment.time}</span>
              </div>
            </div>
            <button className="manage-btn-top" onClick={() => navigate("/patient/appointments")}>
              Manage Visit
            </button>
          </div>
        </div>
      )}

      {/* --- RECOVERY BANNER --- */}
      {!isRecovered && (
        <div className="recovery-feedback-banner">
          <div className="feedback-info">
            <div className="feedback-icon-ring"><FiThumbsUp size={24} /></div>
            <div className="feedback-text">
              <h4 style={{margin: 0}}>How are you feeling today?</h4>
              <p style={{margin: '5px 0 0', opacity: 0.9}}>Your medication course is ending. Please update your status.</p>
            </div>
          </div>
          <div className="feedback-btns">
            <button className="btn-confirm-recovery" onClick={() => setIsRecovered(true)}>I'm Feeling Great!</button>
            <button className="btn-still-unwell" onClick={() => navigate("/patient/help")}>Still Unwell</button>
          </div>
        </div>
      )}

      <div className="dashboard-main-grid">
        {/* --- LEFT SIDE --- */}
        <div className="grid-left">
          <div className="premium-card-white">
            <div className="card-header-flex" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
              <h2 style={{margin: 0}}>Health Journey</h2>
              <span className={`status-pill ${isRecovered ? "recovered" : "active"}`} 
                    style={{
                      padding: '6px 16px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      background: isRecovered ? '#dcfce7':'#e0f2fe',
                      color: isRecovered ? '#166534' : '#0369a1'
                    }}>
                {isRecovered ? "Fully Recovered" : "Under Treatment"}
              </span>
            </div>
            <div className="timeline-container">
              <div className="timeline-item">
                <div className="timeline-icon"><FiCheckCircle color="#10b981" /></div>
                <div className="timeline-content">
                  <h4 style={{margin: 0}}>Consultation</h4>
                  <p style={{margin: '4px 0 0', color: '#64748b'}}>Completed on {healthSummary.lastVisit}</p>
                </div>
              </div>
              <div className={`timeline-item ${isRecovered ? "" : "current"}`}>
                <div className="timeline-icon"><FiActivity color={isRecovered ? "#10b981" : "#3b82f6"} /></div>
                <div className="timeline-content">
                  <h4 style={{margin: 0}}>Current Phase</h4>
                  <p style={{margin: '4px 0 0', color: '#64748b'}}>{healthSummary.recentPrescription}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="premium-card-white">
            <h2 style={{marginBottom: '15px'}}>Pending Lab Tests</h2>
            {pendingLabTests.map(test => (
              <div key={test.id} className="test-item-card premium-hover">
                <div className="test-info">
                  <h4 style={{margin: 0}}>{test.testName}</h4>
                  <span style={{fontSize:'13px', color:'#64748b'}}>{test.lab} • {test.date}</span>
                </div>
                <button className="manage-btn-top" style={{padding:'8px 15px', fontSize:'12px'}}>Details</button>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT SIDE --- */}
        <div className="grid-right">
          <div className="premium-card-white">
            <div className="card-header-flex" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '20px'}}>
              <h2 style={{margin: 0}}>Medical Vault</h2>
              <FiLock color="#64748b" />
            </div>
            <div className="vault-grid">
              <div className="vault-card" onClick={() => navigate("/patient/lab-reports")}>
                <FiFileText size={24} color="var(--p-primary)" />
                <p style={{marginTop:'10px', fontWeight:'600'}}>Reports</p>
              </div>
              <div className="vault-card" onClick={() => navigate("/patient/prescriptions")}>
                <FiPlusCircle size={24} color="var(--p-primary)" />
                <p style={{marginTop:'10px', fontWeight:'600'}}>Scripts</p>
              </div>
            </div>
          </div>

          <div className="summary-stats-mini">
             <div className="mini-stat premium-bounce">
                <span style={{fontSize:'13px', color:'#64748b', fontWeight: '500'}}>Active Meds</span>
                <h3 style={{margin:'5px 0 0', fontSize: '24px'}}>{prescriptionsDummyData.length}</h3>
             </div>
             <div className="mini-stat premium-bounce">
                <span style={{fontSize:'13px', color:'#64748b', fontWeight: '500'}}>Total Visits</span>
                <h3 style={{margin:'5px 0 0', fontSize: '24px'}}>{patientAppointmentsDummyData.past.length}</h3>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;