import React, { useState } from 'react';
import './MedicalRecords.css';

const MedicalRecords = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPreview, setShowPreview] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const [allReports, setAllReports] = useState([
    {
      id: 1,
      name: 'Lipid Profile Test',
      provider: 'Metro Diagnostics',
      date: 'Feb 24, 2026',
      type: 'Lab Reports',
      status: 'High Risk',
      summary: 'Cholesterol levels (240mg/dL) are significantly higher than the standard range.',
      doctorNote: 'Immediate reduction in saturated fats. Start daily 30-min cardio.',
      isAbnormal: true,
      healthImpact: 'Critical'
    },
    {
      id: 2,
      name: 'Chest X-Ray PA View',
      provider: 'Dr. Sharma Radiology',
      date: 'Feb 10, 2026',
      type: 'Radiology',
      status: 'Normal',
      summary: 'Clear lung fields. Cardiac silhouette is within normal limits.',
      doctorNote: 'Lungs are healthy. No further action needed.',
      isAbnormal: false,
      healthImpact: 'Stable'
    },
    {
      id: 3,
      name: 'Vitamin D3 Screening',
      provider: 'Global Health Labs',
      date: 'Jan 28, 2026',
      type: 'Lab Reports',
      status: 'Mild Deficiency',
      summary: 'Levels are at 22 ng/mL. Optimal range is 30-100 ng/mL.',
      doctorNote: 'Daily sun exposure for 15 mins + Supplementation.',
      isAbnormal: true,
      healthImpact: 'Moderate'
    }
  ]);

  const categories = ['All', 'Lab Reports', 'Prescriptions', 'Radiology', 'Vaccinations'];

  // Notification Helper
  const triggerNotify = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Fixed: handleDownload is now connected to the button
  const handleDownload = (report) => {
    triggerNotify(`Downloading ${report.name}...`);
    // Simulating file download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '#'; // Yahan actual PDF URL aayega
      link.setAttribute('download', `medical_report_${report.id}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerNotify("Download Complete!");
    }, 1500);
  };

  // Mock OCR Upload
  const handleFileUpload = () => {
    triggerNotify("AI is scanning document for data...");
    setTimeout(() => {
      const newReport = {
        id: Date.now(),
        name: 'Auto-detected: CBC Test',
        provider: 'Detected: Apollo Labs',
        date: 'Mar 01, 2026',
        type: 'Lab Reports',
        status: 'Normal',
        summary: 'All parameters within normal range after AI OCR scan.',
        doctorNote: 'OCR Scan successful. No abnormalities detected.',
        isAbnormal: false,
        healthImpact: 'Stable'
      };
      setAllReports([newReport, ...allReports]);
      setShowUploadModal(false);
      triggerNotify("Report analyzed and added to timeline!");
    }, 2000);
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      triggerNotify("Voice Recognized: 'Show my last lab report'");
      setActiveTab('Lab Reports');
    }, 2000);
  };

  const filteredReports = allReports.filter(report => {
    const matchesTab = activeTab === 'All' || report.type === activeTab;
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          report.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="medical-vault-wrapper">
      {/* Custom Toast Notification */}
      {notification && <div className="custom-toast">{notification}</div>}

      {/* Header Section */}
      <div className="vault-header">
        <div>
          <h1>Medical Vault</h1>
          <p>Secure, AI-powered health records</p>
        </div>
        <button className="premium-upload-btn" onClick={() => setShowUploadModal(true)}>
          <i className="fas fa-file-upload"></i> Scan New Report
        </button>
      </div>

      <div className="premium-hero-grid">
        {/* Health Score Card */}
        <div className="glass-card health-meter-card">
          <div className="card-header">
            <h3>Health Score AI</h3>
            <div className="ai-pulse-container">
              <span className="ai-dot"></span> <span>AI Live</span>
            </div>
          </div>
          <div className="meter-box">
            <svg viewBox="0 0 100 100">
              <circle className="meter-bg" cx="50" cy="50" r="42" />
              <circle className="meter-pro" cx="50" cy="50" r="42" style={{ strokeDasharray: '220, 300' }} />
            </svg>
            <div className="meter-text">
              <span className="score">85</span>
              <span className="label">Optimal</span>
            </div>
          </div>
          <div className="insight-chip">
            <i className="fas fa-arrow-up"></i> 4% better than last month
          </div>
        </div>

        {/* Vital Trends Card */}
        <div className="glass-card vitals-trend-card">
          <div className="card-header">
            <h3>Blood Pressure Trend</h3>
            <div className="vitals-legend">
              <span className="leg-item"><i className="dot normal"></i> Normal</span>
              <span className="leg-item"><i className="dot high"></i> High</span>
            </div>
          </div>
          <div className="trend-graph-mock">
            <div className="bar" style={{height: '65%'}} data-val="110/70"></div>
            <div className="bar" style={{height: '75%'}} data-val="120/80"></div>
            <div className="bar abnormal" style={{height: '95%'}} data-val="145/95"></div>
            <div className="bar active" style={{height: '70%'}} data-val="118/78"></div>
            <div className="bar" style={{height: '68%'}} data-val="115/75"></div>
          </div>
          <div className="graph-labels">
            <span>Oct</span><span>Nov</span><span>Dec</span><span>Jan</span><span>Feb</span>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="action-bar-premium">
        <div className={`search-voice-container ${isListening ? 'listening' : ''}`}>
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder={isListening ? "Listening..." : "Search reports, doctors, or hospitals..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={`voice-btn ${isListening ? 'active' : ''}`} onClick={handleVoiceSearch}>
            <i className="fas fa-microphone"></i>
          </button>
        </div>
        
        <div className="category-scroller">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`cat-pill ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="records-timeline">
        <div className="timeline-header">
          <h2>Clinical History</h2>
          <span className="count-badge">{filteredReports.length} Records found</span>
        </div>

        <div className="timeline-items">
          {filteredReports.map(report => (
            <div key={report.id} className="timeline-card-wrapper">
              <div className="timeline-side">
                <div className="dot-marker"></div>
                <div className="line-connector"></div>
              </div>
              
              <div className={`record-premium-card ${report.isAbnormal ? 'alert' : ''}`}>
                <div className="card-top">
                  <div className="main-info">
                    <span className="type-tag">{report.type}</span>
                    <h3>{report.name}</h3>
                    <p><i className="fas fa-hospital-alt"></i> {report.provider} • {report.date}</p>
                  </div>
                  <div className={`health-status-badge ${report.healthImpact.toLowerCase()}`}>
                    {report.isAbnormal && <i className="fas fa-exclamation-circle"></i>}
                    {report.status}
                  </div>
                </div>

                <div className="ai-analysis-zone">
                  <div className="analysis-col">
                    <label><i className="fas fa-robot"></i> AI INSIGHT</label>
                    <p>{report.summary}</p>
                  </div>
                  <div className="analysis-col doc-col">
                    <label><i className="fas fa-user-md"></i> DOCTOR'S NOTE</label>
                    <p>"{report.doctorNote}"</p>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="file-preview-mini">
                    <i className="far fa-file-pdf"></i>
                    <span>medical_report_{report.id}.pdf</span>
                  </div>
                  <div className="action-group">
                    <button className="circle-btn" onClick={() => setShowPreview(report)} title="Preview"><i className="fas fa-eye"></i></button>
                    <button className="circle-btn" onClick={() => setShowShareModal(report)} title="Share"><i className="fas fa-share-nodes"></i></button>
                    {/* DOWNLOAD BUTTON FIXED HERE */}
                    <button className="download-action" onClick={() => handleDownload(report)}>Download</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- PREMIUM MODALS --- */}

      {/* 1. Preview Modal */}
      {showPreview && (
        <div className="modal-overlay" onClick={() => setShowPreview(null)}>
          <div className="modal-container preview-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-file-medical"></i> {showPreview.name}</h3>
              <button className="close-x" onClick={() => setShowPreview(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="document-viewer-mock">
                <div className="skeleton-doc">
                  <div className="line long"></div>
                  <div className="line med"></div>
                  <div className="line long"></div>
                  <div className="chart-box"></div>
                </div>
                <div className="viewer-overlay">
                  <i className="fas fa-lock"></i>
                  <p>Secure PDF Viewer Active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Upload/Scan Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-container upload-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Upload & AI Scan</h3>
              <button className="close-x" onClick={() => setShowUploadModal(false)}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="dropzone" onClick={() => document.getElementById('fileIn').click()}>
                <i className="fas fa-cloud-upload-alt"></i>
                <p>Drag & Drop or <span>Browse</span></p>
                <small>Supports PDF, JPEG, PNG (Max 10MB)</small>
                <input type="file" id="fileIn" hidden onChange={handleFileUpload} />
              </div>
              <div className="ocr-features">
                <div className="feat"><i className="fas fa-check-circle"></i> Auto-detect Date</div>
                <div className="feat"><i className="fas fa-check-circle"></i> Extract Vitals</div>
                <div className="feat"><i className="fas fa-check-circle"></i> AI Summary</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Secure Share Modal Styled */}
      {showShareModal && (
        <div className="modal-overlay" onClick={() => setShowShareModal(null)}>
          <div className="modal-container share-modal-styled" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-shield-halved"></i> Secure Share</h3>
              <button className="close-x" onClick={() => setShowShareModal(null)}>&times;</button>
            </div>
            <div className="modal-body">
              <p className="share-desc">Generate a temporary encrypted link to share with your doctor. Expires in 24h.</p>
              
              <div className="share-link-box">
                <code>health.io/x92j{showShareModal.id}</code>
                <button className="copy-btn" onClick={() => {
                  navigator.clipboard.writeText(`health.io/x92j${showShareModal.id}`);
                  triggerNotify("Link copied to clipboard!"); 
                  setShowShareModal(null);
                }}>
                  <i className="fas fa-copy"></i> Copy
                </button>
              </div>

              <div className="share-options-grid">
                <button className="share-opt wa">
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </button>
                <button className="share-opt em">
                  <i className="fas fa-envelope"></i>
                  <span>Email</span>
                </button>
              </div>
              
              <div className="security-notice">
                <i className="fas fa-info-circle"></i>
                <span>Your data is end-to-end encrypted.</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;