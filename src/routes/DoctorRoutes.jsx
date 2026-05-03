import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DoctorLayout from "../components/layout/DoctorLayout";

import DoctorDashboard from "../pages/doctor/DoctorDashboard";
import Appointments from "../pages/doctor/Appointments";
import Patients from "../pages/doctor/Patients";
import Availability from "../pages/doctor/Availability";
import DoctorProfile from "../pages/doctor/Profile";
import Notifications from "../pages/doctor/Notifications";

const DoctorRoutes = () => {
  return (
    <Routes>
      <Route path="/doctor" element={<DoctorLayout />}>
        <Route index element={<Navigate to="dashboard" />} />

        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="patients" element={<Patients />} />
        <Route path="availability" element={<Availability />} />
        <Route path="profile" element={<DoctorProfile />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>
    </Routes>
  );
};

export default DoctorRoutes;
