import React, { useState, useMemo } from 'react';
import './FeedbackPage.css';

const FeedbackPage = () => {
    // Initial Data with timestamps for sorting (Newest first)
    const initialData = [
        { id: 'P998877', type: 'Lab / Reports', rating: 3, message: 'Payment failed twice.', date: '27 Mar 2026', time: '1:25 PM', status: 'Pending', contact: 'Yes' },
        { id: 'P123456', type: 'Doctor Consultation', rating: 3, message: 'Doctor was not very attentive and seemed rushed during the consultation. Did not listen properly to my concerns.', date: '25 Mar 2026', time: '10:15 AM', status: 'Pending', contact: 'Yes' },
        { id: 'P789012', type: 'Lab / Reports', rating: 5, message: 'Very prompt and professional service. Reports delivered on time.', date: '25 Mar 2026', time: '2:45 PM', status: 'Reviewed', contact: 'No' },
        { id: 'P345678', type: 'App Experience', rating: 1, message: 'App keeps crashing frequently when trying to book an appointment.', date: '24 Mar 2026', time: '5:00 PM', status: 'Actioned', contact: 'Yes' },
        { id: 'P901234', type: 'Doctor Consultation', rating: 2, message: 'Rude behavior by doctor. Was not helpful at all.', date: '23 Mar 2026', time: '11:36 AM', status: 'Pending', contact: 'Yes' },
        { id: 'P445566', type: 'App Experience', rating: 4, message: 'Interface is clean but payment failed twice.', date: '22 Mar 2026', time: '9:20 AM', status: 'Reviewed', contact: 'Yes' },
        { id: 'P112233', type: 'Doctor Consultation', rating: 3, message: 'Reports delivered late.', date: '23 Mar 2026', time: '9:20 AM', status: 'Pending', contact: 'Yes' },
        { id: 'P223344', type: 'Lab / Reports', rating: 5, message: 'Excellent facility and clean environment.', date: '21 Mar 2026', time: '04:10 PM', status: 'Actioned', contact: 'No' },
        { id: 'P556677', type: 'Doctor Consultation', rating: 4, message: 'Very knowledgeable doctor.', date: '20 Mar 2026', time: '11:00 AM', status: 'Reviewed', contact: 'Yes' },
        { id: 'P889900', type: 'App Experience', rating: 2, message: 'Not intuitive for elderly users.', date: '19 Mar 2026', time: '02:30 PM', status: 'Pending', contact: 'Yes' },
        { id: 'P111213', type: 'Doctor Consultation', rating: 5, message: 'Great experience overall.', date: '18 Mar 2026', time: '09:00 AM', status: 'Actioned', contact: 'No' },
    ];

    const [allData, setAllData] = useState(initialData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ type: 'All', status: 'All', rating: 'All', date: '' });
    const [selectedFeedback, setSelectedFeedback] = useState(initialData[0]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [adminNote, setAdminNote] = useState('Escalate to doctor support team. Need clarification from clinic.');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    // Filter Logic
  const filteredData = useMemo(() => {
        return allData.filter(item => {
            const matchesSearch = item.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                item.id.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filters.type === 'All' || item.type === filters.type;
            const matchesStatus = filters.status === 'All' || item.status === filters.status;
            const matchesRating = filters.rating === 'All' || item.rating.toString() === filters.rating;
            
            // Working Calendar Logic: Compares input date (YYYY-MM-DD) with item date
            const matchesDate = !filters.date || item.date === filters.date;

            return matchesSearch && matchesType && matchesStatus && matchesRating && matchesDate;
        });
    }, [allData, searchTerm, filters]);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const currentRows = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    

   const resetFilters = () => {
        setFilters({ type: 'All', status: 'All', rating: 'All', date: '' });
        setSearchTerm('');
        setCurrentPage(1);
    };

    const handleFilterChange = (e, key) => {
        setFilters({ ...filters, [key]: e.target.value });
        setCurrentPage(1);
    };

    const updateStatus = (newStatus) => {
        const updated = allData.map(item => 
            item.id === selectedFeedback.id ? { ...item, status: newStatus } : item
        );
        setAllData(updated);
        setSelectedFeedback({ ...selectedFeedback, status: newStatus });
    };

    const handleSaveNote = () => {
        alert("Note saved successfully for " + selectedFeedback.id);
    };

    const renderStars = (rating) => {
        if (rating === 0) return <span className="no-rating">Not Rated</span>;
        return (
            <div className="stars">
                {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < rating ? "star-icon filled" : "star-icon"}>★</span>
                ))}
            </div>
        );
    };

    return (
        <div className="feedback-wrapper">
            {/* Left Section: Stats, Filters, Table */}
            <div className="feedback-list-section">
                <header className="page-header">
                    <div className="title-area">
                        <h1>Feedback Management</h1>
                        <p>Manage patient feedback, review & take action</p>
                    </div>
                    <div className="header-search">
                        <input 
                            type="text" 
                            placeholder="Search by Patient ID or Message..." 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <span className="search-symbol">🔍</span>
                    </div>
                </header>

                <div className="stats-container">
                    <div className="card-stat">
                        <span className="label">Total Feedback</span>
                        <div className="val">{allData.length}</div>
                    </div>
                    <div className="card-stat pending-border">
                        <span className="label text-pending">● Pending</span>
                        <div className="val">{allData.filter(i => i.status === 'Pending').length}</div>
                    </div>
                    <div className="card-stat reviewed-border">
                        <span className="label text-reviewed">● Reviewed</span>
                        <div className="val">{allData.filter(i => i.status === 'Reviewed').length}</div>
                    </div>
                    <div className="card-stat actioned-border">
                        <span className="label text-actioned">● Actioned</span>
                        <div className="val">{allData.filter(i => i.status === 'Actioned').length}</div>
                    </div>
                </div>

                <div className="action-bar">
                    <div className="filters">
                        <select value={filters.type} onChange={(e) => handleFilterChange(e, 'type')}>
                            <option value="All">All Types</option>
                            <option value="Doctor Consultation">Doctor Consultation</option>
                            <option value="Lab / Reports">Lab / Reports</option>
                            <option value="App Experience">App Experience</option>
                        </select>
                        <select value={filters.status} onChange={(e) => handleFilterChange(e, 'status')}>
                            <option value="All">All Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Actioned">Actioned</option>
                        </select>
                        <select value={filters.rating} onChange={(e) => handleFilterChange(e, 'rating')}>
                            <option value="All">All Ratings</option>
                            <option value="5">⭐ 5 Stars</option>
                            <option value="4">⭐ 4 Stars</option>
                            <option value="3">⭐ 3 Stars</option>
                            <option value="2">⭐ 2 Stars</option>
                            <option value="1">⭐ 1 Star</option>
                        </select>
                        <input 
                            type="date" 
                            className="date-filter-input" 
                            value={filters.date} 
                            onChange={(e) => handleFilterChange(e, 'date')} 
                        />
                        
                        <button className="btn-reset" onClick={resetFilters}>Reset</button>
                    </div>
                </div>

                <div className="table-container">
                    <table className="main-table">
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>TYPE</th>
                                <th>RATING</th>
                                <th>MESSAGE PREVIEW</th>
                                <th>DATE & TIME</th>
                                <th>CONTACT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRows.length > 0 ? currentRows.map((item) => (
                                <tr 
                                    key={item.id} 
                                    className={selectedFeedback?.id === item.id ? 'row-active' : ''}
                                    onClick={() => {
                                        setSelectedFeedback(item);
                                        setIsSidebarOpen(true);
                                    }}
                                >
                                    <td><input type="checkbox" /></td>
                                    <td className="type-col">
                                        {item.type}
                                    </td>
                                    <td>{renderStars(item.rating)}</td>
                                    <td className="msg-cell">{item.message}</td>
                                    <td className="date-cell">{item.date}, <br/><span>{item.time}</span></td>
                                    
                                    <td>
                                        <span className={`tag-contact ${item.contact === 'Yes' ? 'is-yes' : 'is-no'}`}>
                                            {item.contact === 'Yes' ? '✓ Yes' : '✕ No'}
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" style={{textAlign: 'center', padding: '40px', color: '#64748b'}}>No feedback found matching your filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <footer className="table-footer">
                    <div className="rows-select">
                        Rows per page: <strong>10</strong>
                    </div>
                    <div className="pagination-btns">
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => setCurrentPage(prev => prev - 1)}
                        >⟨</button>
                        
                        {[...Array(totalPages)].map((_, i) => (
                            <button 
                                key={i + 1} 
                                className={currentPage === i + 1 ? "active" : ""}
                                onClick={() => setCurrentPage(i + 1)}
                            >
                                {i + 1}
                            </button>
                        ))}
                        
                        <button 
                            disabled={currentPage === totalPages || totalPages === 0} 
                            onClick={() => setCurrentPage(prev => prev + 1)}
                        >⟩</button>
                    </div>
                </footer>
            </div>

            {/* Right Section: Fixed Feedback Detail */}
            <div className={`feedback-detail-sidebar ${!isSidebarOpen ? 'hidden' : ''}`}>
                <div className="sidebar-inner">
                    <div className="side-head">
                        <h3>Feedback Detail</h3>
                        <button className="side-close" onClick={() => setIsSidebarOpen(false)}>✕</button>
                    </div>

                    {selectedFeedback && (
                        <div className="side-body">
                            <div className="item-title">
                                <h4>{selectedFeedback.type}</h4>
                                <span className={`badge ${selectedFeedback.status.toLowerCase()}`}>● {selectedFeedback.status}</span>
                            </div>
                            
                            <div className="stars-row">
                                {renderStars(selectedFeedback.rating)}
                            </div>
                            <p className="sub-text">Submitted on: {selectedFeedback.date}, {selectedFeedback.time}</p>

                            <div className="msg-quote">
                                "{selectedFeedback.message}"
                            </div>

                            <div className="patient-id-info">
                                <p><strong>Patient ID:</strong> <span>{selectedFeedback.id}</span></p>
                                <p><strong>Contact Allowed:</strong> <span className={selectedFeedback.contact === 'Yes' ? 'text-actioned' : 'text-pending'}>
                                    {selectedFeedback.contact === 'Yes' ? '✓ YES' : '✕ NO'}
                                </span></p>
                            </div>

                            <div className="admin-box">
                                <h5>Admin Actions</h5>
                                <div className="input-group">
                                    <label>Update Status</label>
                                    <select 
                                        value={selectedFeedback.status} 
                                        onChange={(e) => updateStatus(e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Reviewed">Reviewed</option>
                                        <option value="Actioned">Actioned</option>
                                    </select>
                                </div>
                                <div className="btn-row">
                                    <button className="btn-blue-fill" onClick={() => updateStatus('Reviewed')}>Mark Reviewed</button>
                                    <button className="btn-outline-green" onClick={() => updateStatus('Actioned')}>✓ Actioned</button>
                                </div>
                                <button className="btn-block-outline" onClick={() => updateStatus('Pending')}>Reopen Case</button>

                                <div className="input-group" style={{marginTop: '20px'}}>
                                    <label>Internal Note (Admin Only)</label>
                                    <textarea 
                                        value={adminNote}
                                        onChange={(e) => setAdminNote(e.target.value)}
                                        placeholder="Add private notes here..."
                                    />
                                </div>
                                <button className="btn-save" onClick={handleSaveNote}>Save Admin Note</button>
                                <p className="last-up">Last updated: Today, {selectedFeedback.time}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedbackPage;