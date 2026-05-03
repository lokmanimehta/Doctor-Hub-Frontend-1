import React, { useState } from "react";
import "./Labs.css";

const LabsModule = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedLab, setSelectedLab] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All");

  const testCatalog = [
    { name: "CBC (Complete Blood Count)", price: 600 },
    { name: "Blood Sugar (Fasting)", price: 300 },
    { name: "Blood Sugar (PP)", price: 350 },
    { name: "HbA1c", price: 800 },
    { name: "Lipid Profile", price: 1200 },
    { name: "Liver Function Test (LFT)", price: 1100 },
    { name: "Kidney Function Test (KFT)", price: 1000 },
    { name: "Thyroid Profile (T3 T4 TSH)", price: 900 },
    { name: "Vitamin D", price: 1500 },
    { name: "Vitamin B12", price: 1300 },
    { name: "Urine Routine", price: 400 },
    { name: "CRP", price: 700 },
    { name: "ESR", price: 300 },
    { name: "X-Ray Chest", price: 1400 },
    { name: "ECG", price: 500 },
    { name: "Ultrasound Abdomen", price: 2200 },
  ];

  const labsData = {
    recommended: [
      {
        id: 1,
        name: "CityCare Diagnostics",
        area: "Andheri East, Mumbai",
        dist: "2.1km",
        services: ["Blood", "X-Ray", "ECG"],
        verified: true,
      },
      {
        id: 2,
        name: "Apollo Health Labs",
        area: "Colaba, Mumbai",
        dist: "5.4km",
        services: ["Blood", "Urine", "MRI"],
        verified: true,
      },
    ],
    myLabs: [
      {
        id: 3,
        name: "Local Diagnostics Center",
        area: "Koramangala, Bangalore",
        dist: "3km",
        services: ["X-Ray", "Blood"],
        verified: false,
      },
      {
        id: 4,
        name: "Local Diagnostics Center",
        area: "Koramangala, Bangalore",
        dist: "3km",
        services: ["Blood"],
        verified: false,
      },
    ],
  };

  const filterLabs = (labs) => {
    return labs.filter((lab) => {
      const matchesSearch =
        lab.name.toLowerCase().includes(searchText.toLowerCase()) ||
        lab.area.toLowerCase().includes(searchText.toLowerCase());

      const matchesService =
        serviceFilter === "All" || lab.services.includes(serviceFilter);

      return matchesSearch && matchesService;
    });
  };

  const openAssignPopup = (lab) => {
    setSelectedLab(lab);
    setIsPopupOpen(true);
  };

  const openAddLabPopup = () => {
    setSelectedLab(null);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedLab(null);
  };

  const handleReset = () => {
    setSearchText("");
    setServiceFilter("All");
  };

  return (
    <div className="labs-container">
      {/* SEARCH / FILTER */}
      <div className="search-section">
        <div className="search-bar">
          <span className="icon">🔍</span>
          <input
            type="text"
            placeholder="Search lab name or area..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="filter-btn"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value)}
          >
            <option value="All">All Services</option>
            <option value="Blood">Blood</option>
            <option value="X-Ray">X-Ray</option>
            <option value="MRI">MRI</option>
            <option value="ECG">ECG</option>
            <option value="Urine">Urine</option>
          </select>

          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      {/* RECOMMENDED LABS */}
      <section className="section">
        <div className="section-header">
          <div>
            <h2>Recommended Labs</h2>
            <p>System-Verified & Nearby</p>
          </div>
          <button className="add-my-lab-btn" onClick={openAddLabPopup}>
            + Add My Lab
          </button>
        </div>

        <div className="lab-grid">
          {filterLabs(labsData.recommended).map((lab) => (
            <div key={lab.id} className="lab-card">
              <div className="card-main">
                <div className="lab-icon">✚</div>
                <div className="lab-details">
                  <h3>{lab.name}</h3>
                  <p>{lab.area}</p>
                </div>
                <div className="dist">{lab.dist}</div>
              </div>

              <div className="card-footer">
                <div className="services">
                  {lab.services.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  className="select-btn"
                  onClick={() => openAssignPopup(lab)}
                >
                  Select Lab ›
                </button>
              </div>

              <div className="verified-badge">✓ System-Verified</div>
            </div>
          ))}
        </div>
      </section>

      {/* MY LABS */}
      <section className="section">
        <h2>My Added Labs</h2>
        <p className="subtext">Only visible to you</p>

        <div className="lab-grid">
          {filterLabs(labsData.myLabs).map((lab) => (
            <div key={lab.id} className="lab-card">
              <div className="card-main">
                <div className="lab-icon blue-icon">🔬</div>
                <div className="lab-details">
                  <h3>{lab.name}</h3>
                  <p>{lab.area}</p>
                </div>
                <div className="dist">{lab.dist}</div>
              </div>

              <div className="card-footer">
                <div className="services">
                  {lab.services.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
                <button
                  className="select-btn"
                  onClick={() => openAssignPopup(lab)}
                >
                  Select Lab ›
                </button>
              </div>

              <div className="unverified-badge">
                ⚠ Doctor-Added (Not Platform Verified)
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* POPUP MODAL */}
      {isPopupOpen && (
        <div className="modal-overlay" onClick={closePopup}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedLab ? "Assign Tests to Lab" : "Add My Lab"}</h3>
              <button className="close-btn" onClick={closePopup}>
                ×
              </button>
            </div>

            {/* ADD MY LAB FORM */}
            {!selectedLab && (
              <div className="form-body">
                <div className="form-group">
                  <label className="form-label">🏥 Lab / Clinic Details</label>
                  <input className="input-field" placeholder="Lab / Clinic Name" />
                  <input className="input-field" placeholder="Area / City" />
                  <input className="input-field" placeholder="Contact Number" />
                  <input
                    className="input-field"
                    placeholder="Services (Blood, X-Ray)"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">💰 Payment Details</label>
                  <select className="input-field">
                    <option>Offline (Direct Payment)</option>
                    <option disabled>
                      Online (Platform Verified Only)
                    </option>
                  </select>
                  <p className="payment-info">
                    ℹ Only system-verified labs can receive online payments.
                  </p>
                </div>

                <div className="modal-footer">
                  <button className="confirm-btn">Save Lab</button>
                </div>
              </div>
            )}

            {/* ASSIGN TESTS FORM */}
            {selectedLab && (
              <>
                <div className="selected-lab-banner">
                  <span className="lab-circle-icon">✚</span>
                  <span>{selectedLab.name}</span>
                </div>

                <div className="form-body">
                  <div className="form-group">
                    <label className="form-label">📋 Patient Details</label>
                    <div className="patient-inputs">
                      <input
                        className="input-field"
                        placeholder="Patient Name"
                      />
                      <input
                        className="input-field age-input"
                        placeholder="Age"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">🔬 Tests</label>

                    <div className="test-selection-list">
                      {testCatalog.map((test, index) => (
                        <div key={index} className="test-item">
                          <input type="checkbox" id={`test-${index}`} />
                          <label htmlFor={`test-${index}`}>
                            {test.name}
                            <span className="price">
                              {" "}
                              ({test.price} INR)
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">🏠 Sample Collection</label>
                    <div className="flex-row-options">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="collection"
                          defaultChecked
                        />{" "}
                        Home Pickup
                      </label>
                      <label className="radio-label">
                        <input type="radio" name="collection" /> Clinic Pickup
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">⏱ Priority</label>
                    <div className="flex-row-options">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="priority"
                          defaultChecked
                        />{" "}
                        Normal
                      </label>
                      <label className="radio-label urgent-option">
                        <input type="radio" name="priority" /> Urgent
                      </label>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="confirm-btn">
                    Confirm & Send to Lab
                  </button>

                  <div className="payment-info">
                    {selectedLab.verified ? (
                      <>
                        💳 <b>Online Payment Enabled</b>
                        <br />
                        Patient will pay via platform. Lab settlement handled by
                        system.
                      </>
                    ) : (
                      <>
                        ⚠ <b>Offline Payment</b>
                        <br />
                        Patient will pay directly to lab / clinic.
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabsModule;