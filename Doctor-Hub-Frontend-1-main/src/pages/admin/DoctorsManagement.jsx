import React, { useState } from "react";
import { adminDashboardData } from "../../utils/adminDashboardDummyData";
import "./DoctorsManagement.css";

const DoctorsManagement = () => {
  const [doctors, setDoctors] = useState(adminDashboardData.allDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // 🔍 Search + Filter Logic
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || doctor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // 🔄 Toggle Status
  const toggleStatus = (id) => {
    const updatedDoctors = doctors.map((doctor) =>
      doctor.id === id
        ? {
            ...doctor,
            status: doctor.status === "Active" ? "Inactive" : "Active",
          }
        : doctor
    );
    setDoctors(updatedDoctors);
  };

  // ❌ Delete Doctor
  const deleteDoctor = (id) => {
    const updatedDoctors = doctors.filter((doctor) => doctor.id !== id);
    setDoctors(updatedDoctors);
  };

  return (
    <div className="admin-page">
      <h1>Doctors Management</h1>

      {/* 🔍 Search + Filter Section */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* 📊 Doctors Table */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Status</th>
              <th>Patients</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialty}</td>
                  <td>
                    <span
                      className={
                        doctor.status === "Active"
                          ? "status-active"
                          : "status-inactive"
                      }
                    >
                      {doctor.status}
                    </span>
                  </td>
                  <td>{doctor.patients}</td>
                  <td>
                    <button
                      className="toggle-btn"
                      onClick={() => toggleStatus(doctor.id)}
                    >
                      {doctor.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteDoctor(doctor.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsManagement;
