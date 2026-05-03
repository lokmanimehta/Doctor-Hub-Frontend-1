import React, { useState, useMemo,  } from "react";import {
  Search,
  ChevronDown,
  CheckCircle2,
  Star,
  Users,
  Info,
  RotateCcw,
  MoreVertical
} from "lucide-react";
import "./HospitalsModule.css";

/* =======================
   DUMMY DATA (BACKEND READY)
======================= */
const cities = ["Mumbai", "Delhi", "Bengaluru", "Jaipur", "Lucknow"];
const types = ["Hospital", "Clinic"];
const verificationStatuses = [
  "Verified",
  "Pending",
  "Rejected",
  "Suspended",
  "Soft Suspended"
];
const activeStatuses = ["Active", "Suspend", "Suspended"];

const hospitalsData = Array.from({ length: 50 }, (_, index) => {
  const id = 1001 + index;

  return {
    id,
    name: `Hospital ${id}, ${cities[index % cities.length]}`,
    city: cities[index % cities.length],
    type: types[index % types.length],
    doctorsCount: `${20 + index}/${1000 + index * 10}`,
    appointments: Math.floor(Math.random() * 500),
    qualityScore: Math.floor(Math.random() * 100),
    verificationStatus:
      verificationStatuses[index % verificationStatuses.length],
    activeStatus: activeStatuses[index % activeStatuses.length],
    history: [
      {
        date: "01-02-26",
        action: "Activated",
        by: "Admin"
      }
    ]
  };
});
const HospitalsModule = () => {
  /* =======================
     STATE
  ======================= */
  const [selectedHospital, setSelectedHospital] = useState(hospitalsData[0]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  const [hospitals, setHospitals] = useState(hospitalsData); // row dropdown toggle
  /* =======================
   PAGINATION STATE
======================= */
const [currentPage, setCurrentPage] = useState(1);
const recordsPerPage = 10;
  /* =======================
     RESET HANDLER
  ======================= */
  const handleReset = () => {
    setSearchText("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCityFilter("All");
setSelectedHospital(hospitals[0]);  };
  /* =======================
   PAGINATION LOGIC
======================= */



  /* =======================
     FILTER LOGIC
  ======================= */
  const filteredHospitals = useMemo(() => {
return hospitals.filter((h) => {
        const matchSearch =
        h.name.toLowerCase().includes(searchText.toLowerCase()) ||
        h.city.toLowerCase().includes(searchText.toLowerCase());

      const matchStatus =
        statusFilter === "All" || h.verificationStatus === statusFilter;

      const matchType =
        typeFilter === "All" || h.type === typeFilter;

      const matchCity =
        cityFilter === "All" || h.city === cityFilter;

      return matchSearch && matchStatus && matchType && matchCity;
    });
  }, [hospitals, searchText, statusFilter, typeFilter, cityFilter]);
/* =======================
   PAGINATION LOGIC
======================= */
const totalPages = Math.ceil(filteredHospitals.length / recordsPerPage);
/* =======================
   PAGE NUMBER GENERATOR
======================= */

const getPageNumbers = () => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return pages;
};
const indexOfLastRecord = currentPage * recordsPerPage;
const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

const currentRecords = filteredHospitals.slice(
  indexOfFirstRecord,
  indexOfLastRecord
);

  return (
    <div className="hospital-container">

      {/* =======================
          FILTER BAR
      ======================= */}
      <div className="filter-section-card">
        <div className="filter-row">
          <div className="filter-group">

            <div className="select-wrapper">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option>All</option>
                <option>Verified</option>
                <option>Pending</option>
                <option>Rejected</option>
                <option>Suspended</option>
                <option>Soft Suspended</option>
              </select>
              <ChevronDown size={16} />
            </div>

            <div className="select-wrapper">
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option>All</option>
                <option>Hospital</option>
                <option>Clinic</option>
              </select>
              <ChevronDown size={16} />
            </div>

            <div className="select-wrapper">
              <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option>All</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Jaipur</option>
                <option>Bengaluru</option>
                <option>Lucknow</option>
              </select>
              <ChevronDown size={16} />
            </div>

            <div className="search-input-wrapper">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search hospital or city..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

          </div>

          <button className="reset-btn" onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </div>

      {/* =======================
          STATS CARDS
      ======================= */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon-box blue"><Users size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Total Hospitals</span>
            <span className="stat-value">{hospitals.length}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box orange"><Info size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Pending Verification</span>
            <span className="stat-value">
              {hospitals.filter(h => h.verificationStatus === "Pending").length}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-box green"><CheckCircle2 size={24} /></div>
          <div className="stat-info">
            <span className="stat-label">Active Hospitals</span>
            <span className="stat-value">
              {hospitals.filter(h => h.activeStatus === "Active").length  }
            </span>
          </div>
        </div>
      </div>

      {/* =======================
          TABLE
      ======================= */}
      <div className="table-container-card">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Hospital Name</th>
                <th>City</th>
                <th>Type</th>
                <th><Users size={14} /> Doctors</th>
                <th>Appointments</th>
                <th>Quality</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHospitals.length === 0 && (
                <tr>
                  <td colSpan="9" className="empty-row">
                    No hospitals found
                  </td>
                </tr>
              )}

              {currentRecords.map((hospital) => (
                <tr
                  key={hospital.id}
                  className={selectedHospital.id === hospital.id ? "selected-row" : ""}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <td>{hospital.id}</td>
                  <td className="hosp-name-cell">{hospital.name}</td>
                  <td>{hospital.city}</td>
                  <td>{hospital.type}</td>
                  <td>{hospital.doctorsCount}</td>
                  <td>{hospital.appointments}</td>
                  <td>
                    <span className={`quality-badge ${hospital.verificationStatus.toLowerCase().replace(" ", "-")}`}>
                      {hospital.verificationStatus}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${hospital.activeStatus.toLowerCase()}`}>
                      {hospital.activeStatus}
                    </span>
                  </td>
                  <td className="action-cell">
                    {/* View button */}
                    <button
  className="view-btn"
  onClick={(e) => {
    e.stopPropagation();
    setSelectedHospital({ ...hospital });  // copy object
    setIsViewModalOpen(true);
  }}
>
  👁️
</button>

                    {/* 3-dot dropdown */}
                    <div className="dropdown-wrapper" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="dropdown-btn"
                        onClick={() => setDropdownOpenId(dropdownOpenId === hospital.id ? null : hospital.id)}
                        title="Actions"
                      >
                       
                      </button>

                      {dropdownOpenId === hospital.id && (
                        <div className="dropdown-menu">
                          <button onClick={() => { setSelectedHospital(hospital); setIsViewModalOpen(true); setDropdownOpenId(null); }}>View</button>
                          <button onClick={() => { setSelectedHospital(hospital); setActionType("activate"); setIsConfirmModalOpen(true); setDropdownOpenId(null); }}>Activate</button>
                          <button onClick={() => { setSelectedHospital(hospital); setActionType("suspend"); setIsConfirmModalOpen(true); setDropdownOpenId(null); }}>Suspend</button>
                          <button onClick={() => { setSelectedHospital(hospital); setActionType("reject"); setIsConfirmModalOpen(true); setDropdownOpenId(null); }}>Reject</button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              {/* =======================
    PAGINATION UI
======================= */}
{/* =======================
    PROFESSIONAL PAGINATION
======================= */}

{totalPages > 1 && (
  <div className="pagination">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(prev => prev - 1)}
    >
      ◀ Previous
    </button>

    {getPageNumbers().map((page) => (
      <button
        key={page}
        className={currentPage === page ? "active-page" : ""}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(prev => prev + 1)}
    >
      Next ▶
    </button>

  </div>
)}
          {/* =======================
              VIEW MODAL
          ======================= */}
         {isViewModalOpen && (
  <div className="modal-overlay">
    <div className="modal-card">

      <div className="modal-header">
        <h3>Hospital Details</h3>
        <button onClick={() => setIsViewModalOpen(false)}>✕</button>
      </div>

      <div className="modal-body">

        <div className="modal-info">
  <p><strong>ID:</strong> {selectedHospital.id}</p>
  <p><strong>Name:</strong> {selectedHospital.name}</p>
  <p><strong>City:</strong> {selectedHospital.city}</p>
  <p><strong>Type:</strong> {selectedHospital.type}</p>
  <p><strong>Doctors:</strong> {selectedHospital.doctorsCount}</p>
  <p><strong>Appointments:</strong> {selectedHospital.appointments}</p>
  <p><strong>Quality Score:</strong> {selectedHospital.qualityScore}</p>
  <p><strong>Verification:</strong> {selectedHospital.verificationStatus}</p>
  <p><strong>Active Status:</strong> {selectedHospital.activeStatus}</p>
</div>

        {/* Scrollable History Section */}
        <div className="status-history">
          <h4>Status History</h4>

          <div className="history-table-wrapper">
            <table className="history-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Action</th>
                  <th>By</th>
                </tr>
              </thead>
              <tbody>
                {selectedHospital.history?.length ? (
                  selectedHospital.history.map((h, i) => (
                    <tr key={i}>
                      <td>{h.date}</td>
                      <td>{h.action}</td>
                      <td>{h.by}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No history available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div><div className="modal-actions">
  <button
    className="btn green"
    onClick={() => {
      setActionType("activate");
      setIsConfirmModalOpen(true);
    }}
  >
    Activate
  </button>

  <button
    className="btn orange"
    onClick={() => {
      setActionType("suspend");
      setIsConfirmModalOpen(true);
    }}
  >
    Suspend
  </button>

  <button
    className="btn red"
    onClick={() => {
      setActionType("reject");
      setIsConfirmModalOpen(true);
    }}
  >
    Reject
  </button>
</div>
    </div>
  </div>
)}

          {/* =======================
              CONFIRM MODAL
          ======================= */}
          {isConfirmModalOpen && (
            <div className="modal-overlay">
              <div className="modal-card small">

                <h4>Confirm {actionType}</h4>

                <textarea
                  placeholder="Enter reason (mandatory)"
                  className="reason-box"
                />

                <div className="modal-actions">
                  <button
                    className="btn red"
                    onClick={() => {

const updatedHospitals = hospitals.map((h) => {

  if (h.id === selectedHospital.id) {

    return {
      ...h,
      activeStatus:
        actionType === "activate"
          ? "Active"
          : actionType === "suspend"
          ? "Suspend"
          : "Suspended"
    };

  }

  return h;

});

setHospitals(updatedHospitals);

setSelectedHospital({
  ...selectedHospital,
  activeStatus:
    actionType === "activate"
      ? "Active"
      : actionType === "suspend"
      ? "Suspend"
      : "Suspended"
});

setIsConfirmModalOpen(false);
setIsViewModalOpen(false);

}}
                  >
                    Confirm
                  </button>

                  <button
                    className="btn grey"
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* =======================
          QUALITY INFO
      ======================= */}
      <div className="quality-info-card-full">
        <h3><Star size={18} className="icon-gold" /> Quality Score Information</h3>

        <div className="score-details-grid">
          <div className="bar-container">
            <span>Verification</span>
            <div className="bar-bg"><div className="bar green" style={{ width: "80%" }} /></div>
          </div>
          <div className="bar-container">
            <span>Patient Ratings</span>
            <div className="bar-bg"><div className="bar yellow" style={{ width: "65%" }} /></div>
          </div>
          <div className="bar-container">
            <span>Doctor Verification</span>
            <div className="bar-bg"><div className="bar blue" style={{ width: "70%" }} /></div>
          </div>
          <div className="bar-container">
            <span>Complaints</span>
            <div className="bar-bg"><div className="bar orange" style={{ width: "50%" }} /></div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HospitalsModule;