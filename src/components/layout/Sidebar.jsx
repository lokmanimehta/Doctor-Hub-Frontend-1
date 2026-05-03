import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const role = user?.role;

  const menu = {
    ADMIN: [
      { name: "Dashboard", path: "/admin/dashboard" },
      { name: "Doctors", path: "/admin/doctors" },
      { name: "Hospitals", path: "/admin/hospitals" },
      { name: "Labs", path: "/admin/labs" },
      { name: "Verify Doctors", path: "/admin/verify-doctors" },
      { name: "Users", path: "/admin/users" }
    ],
    DOCTOR: [
      { name: "Dashboard", path: "/doctor/dashboard" },
      { name: "Appointments", path: "/doctor/appointments" },
      { name: "Patients", path: "/doctor/patients" },
      { name: "Availability", path: "/doctor/availability" },
      { name: "Profile", path: "/doctor/profile" }
    ],
    PATIENT: [
      { name: "Dashboard", path: "/patient/dashboard" },
      { name: "Book Appointment", path: "/patient/book-appointment" },
      { name: "My Appointments", path: "/patient/my-appointments" },
      { name: "Medical Reports", path: "/patient/medical-reports" },
      { name: "Profile", path: "/patient/profile" }
    ]
  };

  return (
    <aside className="sidebar">
      <h3 className="sidebar-logo">Healthcare</h3>

      <ul>
        {menu[role]?.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? "active" : ""
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
