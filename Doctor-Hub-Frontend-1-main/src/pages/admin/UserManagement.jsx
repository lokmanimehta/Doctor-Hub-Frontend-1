import React, { useState, useEffect, useMemo } from 'react';
import './UserManagement.css';
import { 
  FiSearch, FiDownload, FiEye, FiEdit2, 
  FiMoreVertical, FiUser, FiCalendar, FiChevronLeft, FiChevronRight, FiX, FiCheckCircle, FiAlertCircle, FiRotateCcw
} from 'react-icons/fi';

const UserManagement = () => {
  // --- States ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const rowsPerPage = 6; 
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  // --- Initial Data Fetch ---
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setTimeout(() => {
        const dummyData = [
          { id: 1, name: 'Sanior Name', sub: 'Patient Patient', email: 'saniana@gmail.com', role: 'Patient', status: 'Active', joined: 'Jan 11, 2023', lastLogin: 'Jan 15, 2023', img: 'https://i.pravatar.cc/150?u=1' },
          { id: 2, name: 'Andrew Smith', sub: 'Patient Den.', email: 'andrew22@gmail.com', role: 'Patient', status: 'Active', joined: 'Jan 11, 2023', lastLogin: 'Oct 15, 2023', img: 'https://i.pravatar.cc/150?u=2' },
          { id: 3, name: 'Catta Name', sub: 'Patient Defaulteditor', email: 'cattanitn@gmail.com', role: 'Patient', status: 'Active', joined: 'Jan 11, 2023', lastLogin: 'Apr 15, 2023', img: 'https://i.pravatar.cc/150?u=3' },
          { id: 4, name: 'Donor Rothow', sub: 'Doctor, Mt.D.', email: 'donor@gmail.com', role: 'Doctor', status: 'Suspended', joined: 'Jan 11, 2023', lastLogin: 'Jan 13, 2023', img: 'https://i.pravatar.cc/150?u=4' },
          { id: 5, name: 'Roben Sovot', sub: 'Doctor, Mr.D.', email: 'eeaen22@gmail.com', role: 'Patient', status: 'Suspended', joined: 'Jan 11, 2023', lastLogin: 'Oct 15, 2023', img: 'https://i.pravatar.cc/150?u=5' },
          { id: 6, name: 'Name Ersic', sub: 'Doctor, Mr.D.', email: 'namemae@gmail.com', role: 'Doctor', status: 'Active', joined: 'Jan 11, 2023', lastLogin: 'Oct 15, 2023', img: 'https://i.pravatar.cc/150?u=6' },
          { id: 7, name: 'Khary Militin', sub: 'Doctor, Mt.D.', email: 'knnymiltin@gmail.com', role: 'Doctor', status: 'Suspended', joined: 'Jan 11, 2023', lastLogin: 'Oct 15, 2023', img: 'https://i.pravatar.cc/150?u=7' },
          { id: 8, name: 'Maric Borngugo', sub: 'Doctor, Mr.D.', email: 'korngugo@gmail.com', role: 'Doctor', status: 'Suspended', joined: 'Jan 11, 2023', lastLogin: 'Jan 15, 2023', img: 'https://i.pravatar.cc/150?u=8' },
          { id: 9, name: 'Mank Namer', sub: 'Doctor, Mr.D.', email: 'martamith@gmail.com', role: 'Doctor', status: 'Active', joined: 'Jan 11, 2023', lastLogin: 'Oct 15, 2023', img: 'https://i.pravatar.cc/150?u=9' },
          { id: 10, name: 'Tony Stark', sub: 'Tech Specialist', email: 'ironman@stark.com', role: 'Doctor', status: 'Active', joined: 'Aug 12, 2025', lastLogin: 'Feb 28, 2026', img: 'https://i.pravatar.cc/150?u=10' },
        ];
        setUsers(dummyData);
        setLoading(false);
      }, 800);
    };
    fetchUsers();
  }, []);

  // --- Reset Logic ---
  const handleReset = () => {
    setSearchTerm('');
    setFilterRole('All');
    setFilterStatus('All');
    setStartDate('');
    setEndDate('');
    setSortBy('Newest');
    setCurrentPage(1);
  };

  // --- Logic: Filter, Sort & Pagination ---
  const processedUsers = useMemo(() => {
    let result = users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === 'All' || user.role === filterRole;
      const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
      
      let matchesDate = true;
      if (startDate || endDate) {
        const joinDate = new Date(user.joined);
        if (startDate && joinDate < new Date(startDate)) matchesDate = false;
        if (endDate && joinDate > new Date(endDate)) matchesDate = false;
      }

      return matchesSearch && matchesRole && matchesStatus && matchesDate;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.joined);
      const dateB = new Date(b.joined);
      return sortBy === 'Newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [users, searchTerm, filterRole, filterStatus, sortBy, startDate, endDate]);

  const totalPages = Math.ceil(processedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = processedUsers.slice(startIndex, startIndex + rowsPerPage);

  const triggerNotification = (msg, type = 'success') => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const toggleStatus = (id) => {
    const user = users.find(u => u.id === id);
    setActiveUser(user);
    setShowConfirmModal(true);
  };

  const confirmToggleStatus = () => {
    setUsers(prev => prev.map(u => 
      u.id === activeUser.id ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' } : u
    ));
    triggerNotification(`Status updated for ${activeUser.name}`, 'success');
    setShowConfirmModal(false);
  };

  const handleSelectUser = (id) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) setSelectedUsers(new Set(currentData.map(u => u.id)));
    else setSelectedUsers(new Set());
  };

  const handleExport = () => {
    const csvRows = [
      ["ID", "Name", "Email", "Role", "Status", "Joined"],
      ...processedUsers.map(u => [u.id, u.name, u.email, u.role, u.status, u.joined])
    ];
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", "User_Report.csv");
    document.body.appendChild(link);
    link.click();
    triggerNotification("Report exported successfully!", "success");
  };

  const openViewModal = (user) => {
    setActiveUser(user);
    setShowViewModal(true);
  };

  const openEditModal = (user) => {
    setActiveUser({...user});
    setShowEditModal(true);
  };

  return (
    <div className="admin-body">
      {notification.show && (
        <div className={`notification-toast ${notification.type}`}>
          {notification.type === 'success' ? <FiCheckCircle /> : <FiAlertCircle />}
          {notification.message}
        </div>
      )}

      <div className="top-header-row">
        <h1 className="page-title">User Management</h1>
        <button className="primary-export-btn" onClick={handleExport}>
          <FiDownload /> Export
        </button>
      </div>

      <div className="stats-container">
        <div className="stat-box total">
          <span className="stat-title">Total Users</span>
          <h2 className="stat-val">14,500</h2>
        </div>
        <div className="stat-box active-p">
          <span className="stat-title">Active Patients</span>
          <h2 className="stat-val">9,200</h2>
        </div>
        <div className="stat-box active-d">
          <span className="stat-title">Active Doctors</span>
          <h2 className="stat-val">2,100</h2>
        </div>
        <div className="stat-box suspended">
          <span className="stat-title">Suspended</span>
          <h2 className="stat-val">120</h2>
        </div>
      </div>

      <div className="content-card">
        <div className="toolbar-row">
          <div className="search-group">
            <FiSearch className="search-ic" />
            <input 
              type="text" 
              placeholder="Search" 
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
            />
          </div>

          <div className="filter-controls">
            <div className="filter-item">
              <span>Role:</span>
              <select value={filterRole} onChange={(e) => {setFilterRole(e.target.value); setCurrentPage(1);}}>
                <option value="All">All/Patient/Doctor</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
              </select>
            </div>
            
            <div className="filter-item">
              <span>Status:</span>
              <select value={filterStatus} onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}}>
                <option value="All">All/Active/Inactive</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            <div className="date-filter-group">
              <div className="date-input-wrapper">
                <FiCalendar className="cal-ic" />
                <input 
                  type="date" 
                  value={startDate}
                  className="hidden-date-input" 
                  onChange={(e) => setStartDate(e.target.value)} 
                  title="Start Date"
                />
              </div>
              <span className="to-text">to</span>
              <div className="date-input-wrapper">
                <FiCalendar className="cal-ic" />
                <input 
                  type="date" 
                  value={endDate}
                  className="hidden-date-input" 
                  onChange={(e) => setEndDate(e.target.value)} 
                  title="End Date"
                />
              </div>
            </div>

            <button className="reset-filter-btn" onClick={handleReset} title="Reset Filters">
              <FiRotateCcw /> Reset
            </button>
          </div>
        </div>

        <div className="export-text-link">
          <button onClick={handleExport}><FiDownload /> Export (CSV/Excel)</button>
        </div>

        <div className="table-wrapper">
          <table className="user-data-table">
            <thead>
              <tr>
                <th style={{width: '50px'}}><input type="checkbox" onChange={handleSelectAll} checked={selectedUsers.size === currentData.length && currentData.length > 0} /></th>
                <th>Name</th>
                <th>Email</th>
                <th style={{width: '120px'}}>Role</th>
                <th style={{width: '150px'}}>Status</th>
                <th className="date-col-head">Joined Date</th>
                <th className="date-col-head">Last Login</th>
                <th className="action-col-head">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="8" className="loading-state">Loading users...</td></tr>
              ) : currentData.map(user => (
                <tr key={user.id} className={selectedUsers.has(user.id) ? 'row-selected' : ''}>
                  <td><input type="checkbox" checked={selectedUsers.has(user.id)} onChange={() => handleSelectUser(user.id)} /></td>
                  <td className="profile-cell">
                    <img src={user.img} alt="" />
                    <div className="name-stack">
                      <span className="main-name">{user.name}</span>
                      <span className="sub-name">{user.sub}</span>
                    </div>
                  </td>
                  <td className="email-cell">{user.email}</td>
                  <td><span className="role-tag"><FiUser /> {user.role}</span></td>
                  <td>
                    <div className="toggle-wrapper" onClick={() => toggleStatus(user.id)}>
                      <div className={`switch-track ${user.status === 'Active' ? 'active' : 'suspended'}`}>
                        <div className="switch-knob"></div>
                      </div>
                      <span className={`status-text ${user.status.toLowerCase()}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="date-cell compact">{user.joined}</td>
                  <td className="date-cell compact">{user.lastLogin}</td>
                  <td className="action-cell compact">
                    <FiEye className="table-act" onClick={() => openViewModal(user)} />
                    <FiEdit2 className="table-act" onClick={() => openEditModal(user)} />
                    <FiMoreVertical className="table-act" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card-footer">
          <div className="count-selector">
            {startIndex + 1}-{Math.min(startIndex + rowsPerPage, processedUsers.length)} of {processedUsers.length} 
            <select className="mini-select"><option></option></select>
          </div>

          <div className="footer-right">
            <div className="sort-dropdown">
              <span>Sort by</span>
              <select value={sortBy} onChange={(e) => {setSortBy(e.target.value); setCurrentPage(1);}}>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>

            <div className="pagination-nav">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="nav-btn"><FiChevronLeft /></button>
              {[...Array(totalPages)].map((_, i) => (
                <button 
                  key={i} 
                  className={`page-num ${currentPage === i + 1 ? 'active' : ''}`} 
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="nav-btn"><FiChevronRight /></button>
              <button className="nav-btn double">»</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODALS --- */}
      {showViewModal && activeUser && (
        <div className="modal-overlay">
          <div className="modal-box view-mode">
            <div className="modal-header">
              <h3>User Details</h3>
              <FiX className="close-x" onClick={() => setShowViewModal(false)} />
            </div>
            <div className="modal-content">
              <div className="modal-profile-header">
                <img src={activeUser.img} className="modal-avatar" alt="" />
                <div className="header-text">
                  <h4>{activeUser.name}</h4>
                  <span>{activeUser.email}</span>
                </div>
              </div>
              <div className="detail-grid">
                <div className="detail-item"><strong>Role:</strong> {activeUser.role}</div>
                <div className="detail-item"><strong>Status:</strong> <span className={`status-pill ${activeUser.status}`}>{activeUser.status}</span></div>
                <div className="detail-item"><strong>Joined:</strong> {activeUser.joined}</div>
                <div className="detail-item"><strong>Last Login:</strong> {activeUser.lastLogin}</div>
                <div className="detail-item"><strong>Sub Role:</strong> {activeUser.sub}</div>
              </div>
              <button className="close-btn" onClick={() => setShowViewModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && activeUser && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-header">
              <h3>Edit User Profile</h3>
              <FiX className="close-x" onClick={() => setShowEditModal(false)} />
            </div>
            <div className="modal-content">
              <div className="input-group">
                <label>Full Name</label>
                <input 
                  value={activeUser.name} 
                  onChange={e => setActiveUser({...activeUser, name: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  value={activeUser.email} 
                  onChange={e => setActiveUser({...activeUser, email: e.target.value})} 
                />
              </div>
              <div className="input-group">
                <label>Status</label>
                <select
                  value={activeUser.status}
                  onChange={e => setActiveUser({ ...activeUser, status: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button
                  className="save-btn"
                  onClick={() => {
                    setUsers(prev => prev.map(u => u.id === activeUser.id ? activeUser : u));
                    setShowEditModal(false);
                    triggerNotification("User updated successfully!", "success");
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && activeUser && (
        <div className="modal-overlay">
          <div className="modal-box confirm-box">
            <div className="modal-content">
              <FiAlertCircle className="confirm-icon" />
              <h3>Change Status?</h3>
              <p>Are you sure you want to change <strong>{activeUser.name}'s</strong> status to {activeUser.status === 'Active' ? 'Suspended' : 'Active'}?</p>
              <div className="modal-actions">
                <button className="cancel-btn" onClick={() => setShowConfirmModal(false)}>No, Cancel</button>
                <button className="save-btn" onClick={confirmToggleStatus}>Yes, Update</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;