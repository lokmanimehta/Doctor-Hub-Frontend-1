import React, { useState, useEffect, useMemo } from "react";
import "./SystemLogs.css";

/* ===========================
   ENTERPRISE DUMMY GENERATOR
=========================== */
const generateEnterpriseLogs = () => {
  const roles = ["Admin", "Doctor", "System"];
  const modules = ["Appointment", "Doctor", "Patient", "Feedback", "Login"];
  const actions = [
    "Approved Doctor",
    "Bulk Delete",
    "Status Change",
    "Failed Login Attempt",
    "Export Data",
    "Role Updated"
  ];
  const severities = ["INFO", "WARNING", "ERROR", "CRITICAL"];
  const statuses = ["Success", "Failed", "Warning"];

  return Array.from({ length: 120 }, (_, i) => {
    const severity = severities[i % severities.length];
    const action = actions[i % actions.length];

    return {
      id: `LOG-${1000 + i}`,
      user: `User ${i % 12}`,
      role: roles[i % roles.length],
      module: modules[i % modules.length],
      action,
      description: `Detailed description for ${action}`,
      beforeValue: "Old Status: Pending",
      afterValue: "New Status: Approved",
      ip: `192.168.0.${i}`,
      device: "Chrome | Windows",
      sessionId: `SID-${i * 23}`,
      severity,
      status: statuses[i % statuses.length],
      dateTime: new Date(Date.now() - i * 3600000).toISOString()
    };
  });
};

/* ===========================
   COMPONENT
=========================== */
export default function SystemLogs() {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [moduleFilter, setModuleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);

  const itemsPerPage = 10;

  /* Backend Ready Fetch */
  useEffect(() => {
    async function fetchLogs() {
      try {
        const dummy = generateEnterpriseLogs();
        setLogs(dummy);
      } catch (error) {
        console.error("Failed fetching logs", error);
      }
    }
    fetchLogs();
  }, []);

  /* ===========================
      FILTER LOGIC
  =========================== */
  const filteredData = useMemo(() => {
    return logs.filter((log) => {
      const matchSearch =
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.description.toLowerCase().includes(search.toLowerCase());

      const matchRole = roleFilter === "All" || log.role === roleFilter;
      const matchModule = moduleFilter === "All" || log.module === moduleFilter;
      const matchStatus = statusFilter === "All" || log.status === statusFilter;
      const matchSeverity = severityFilter === "All" || log.severity === severityFilter;

      const logDate = new Date(log.dateTime);
      const matchFrom = fromDate ? logDate >= new Date(fromDate) : true;
      const matchTo = toDate ? logDate <= new Date(toDate) : true;

      return (
        matchSearch && matchRole && matchModule && matchStatus && matchSeverity && matchFrom && matchTo
      );
    });
  }, [logs, search, roleFilter, moduleFilter, statusFilter, severityFilter, fromDate, toDate]);

  /* ===========================
      PAGINATION
  =========================== */
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  /* ===========================
      EXPORT
  =========================== */
  const exportCSV = () => {
    const headers = "ID,User,Role,Module,Action,Severity,Status,IP,Date\n";
    const rows = filteredData.map((l) => `${l.id},${l.user},${l.role},${l.module},${l.action},${l.severity},${l.status},${l.ip},${l.dateTime}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DoctorHub_Logs.csv";
    a.click();
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "DoctorHub_Logs.json";
    a.click();
  };

  /* ===========================
      RESET HANDLER
  =========================== */
  const handleReset = () => {
    setSearch("");
    setRoleFilter("All");
    setModuleFilter("All");
    setStatusFilter("All");
    setSeverityFilter("All");
    setFromDate("");
    setToDate("");
    setCurrentPage(1);
  };

  const isSuspicious = (log) => {
    if (log.severity === "CRITICAL") return true;
    if (log.action === "Bulk Delete") return true;
    if (log.action === "Failed Login Attempt") return true;
    return false;
  };

  const totalCritical = logs.filter((l) => l.severity === "CRITICAL").length;
  const totalFailed = logs.filter((l) => l.status === "Failed").length;

  return (
    <div className="system-logs-container">
      <div className="retention-banner">
        Logs retained for 90 days as per audit policy.
      </div>

      <div className="summary-grid">
        <div className="summary-card">Total Logs: {logs.length}</div>
        <div className="summary-card">Critical: {totalCritical}</div>
        <div className="summary-card">Failed: {totalFailed}</div>
        <div className="summary-card">Filtered: {filteredData.length}</div>
      </div>

      {/* FILTER SECTION */}
      <div className="filters">
        <input type="datetime-local" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="datetime-local" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          <option>Admin</option>
          <option>Doctor</option>
          <option>System</option>
        </select>

        <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
          <option value="All">All Modules</option>
          <option>Appointment</option>
          <option>Doctor</option>
          <option>Patient</option>
          <option>Feedback</option>
          <option>Login</option>
        </select>

        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value)}>
          <option value="All">All Severity</option>
          <option>INFO</option>
          <option>WARNING</option>
          <option>ERROR</option>
          <option>CRITICAL</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option>Success</option>
          <option>Failed</option>
          <option>Warning</option>
        </select>

        <input type="text" placeholder="Search user, action..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <button className="reset-btn" onClick={handleReset}>Reset</button>
      </div>

      {/* TABLE */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Module</th>
              <th>Action</th>
              <th>Severity</th>
              <th>Status</th>
              <th>IP</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((log) => (
              <tr key={log.id} className={isSuspicious(log) ? "row-critical" : ""} onClick={() => setSelectedLog(log)}>
                <td>{log.id}</td>
                <td>{log.user}</td>
                <td>{log.module}</td>
                <td>{log.action}</td>
                <td>{log.severity}</td>
                <td>{log.status}</td>
                <td onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(log.ip); }}>{log.ip}</td>
                <td>{new Date(log.dateTime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>

      {/* EXPORT SECTION */}
      <div className="export-actions">
        <button className="export-btn btn-csv" onClick={exportCSV}>Export CSV</button>
        <button className="export-btn btn-json" onClick={exportJSON}>Export JSON</button>
      </div>

      {/* MODAL */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Audit Log Details</h3>
              <span style={{color: 'white', cursor: 'pointer'}} onClick={() => setSelectedLog(null)}>✖</span>
            </div>
            <div className="modal-body">
              <div className="modal-row"><span className="modal-label">Log ID:</span><span className="modal-value">{selectedLog.id}</span></div>
              <div className="modal-row"><span className="modal-label">User:</span><span className="modal-value">{selectedLog.user} ({selectedLog.role})</span></div>
              <div className="modal-row"><span className="modal-label">Module:</span><span className="modal-value">{selectedLog.module}</span></div>
              <div className="modal-row"><span className="modal-label">Action:</span><span className="modal-value">{selectedLog.action}</span></div>
              <div className="modal-row"><span className="modal-label">Before:</span><span className="modal-value">{selectedLog.beforeValue}</span></div>
              <div className="modal-row"><span className="modal-label">After:</span><span className="modal-value">{selectedLog.afterValue}</span></div>
              <div className="modal-row"><span className="modal-label">IP Address:</span><span className="modal-value">{selectedLog.ip}</span></div>
              <div className="modal-row"><span className="modal-label">Device:</span><span className="modal-value">{selectedLog.device}</span></div>
              <div className="modal-row"><span className="modal-label">Timestamp:</span><span className="modal-value">{new Date(selectedLog.dateTime).toLocaleString()}</span></div>
            </div>
            <div className="modal-footer">
              <button className="close-modal-btn" onClick={() => setSelectedLog(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}