// src/utils/adminDashboardDummyData.js

export const adminDashboardData = {
  stats: {
    totalDoctors: 350,
    activeDoctors: 310,
    pendingDoctors: 12,
    totalPatients: 1200,
    totalAppointments: 5400,
    cancelledAppointments: 180,
    unreadFeedback: 5
  },

  pendingDoctors: [
    {
      id: 1,
      name: "Dr. Aisha Khan",
      specialty: "Dermatologist",
      hospital: "City Care Hospital",
      city: "Mumbai",
      status: "pending"
    },
    {
      id: 2,
      name: "Dr. Marc Post",
      specialty: "Cardiologist",
      hospital: "Heart Plus Clinic",
      city: "Delhi",
      status: "pending"
    }
  ],

  recentFeedback: [
    {
      id: 1,
      user: "Rohit Sharma",
      message: "Doctor was very professional and helpful",
      createdAt: "2 hours ago",
      status: "unread"
    },
    {
      id: 2,
      user: "Anjali Mehta",
      message: "Appointment booking was smooth",
      createdAt: "1 day ago",
      status: "reviewed"
    }
  ],

  systemLogs: [
    {
      id: 1,
      type: "info",
      message: "New doctor registered",
      actor: "System",
      time: "2 mins ago"
    },
    {
      id: 2,
      type: "warning",
      message: "Multiple failed login attempts",
      actor: "Security",
      time: "3 hours ago"
    },
    {
      id: 3,
      type: "error",
      message: "Database backup failed",
      actor: "Admin",
      time: "Yesterday"
    }
  ]
};
// src/utils/adminDashboardDummyData.js
export const adminDashboarddoctorData = {
  pendingDoctors: [
    {
      id: 1,
      name: "Dr. Amit Sharma",
      specialty: "Cardiology",
      experience: 12,
      qualification: "MBBS, MD (Cardiology)",
      registrationNumber: "MCI-458796",
      consultationFee: "₹800",
      clinic: {
        name: "Heart Care Clinic",
        city: "Mumbai",
        area: "Andheri West",
        address: "SV Road, Andheri West, Mumbai"
      },
      image: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 2,
      name: "Dr. Neha Verma",
      specialty: "Dermatology",
      experience: 7,
      qualification: "MBBS, MD (Dermatology)",
      registrationNumber: "MCI-784512",
      consultationFee: "₹600",
      clinic: {
        name: "SkinCare Plus",
        city: "Pune",
        area: "Baner",
        address: "Baner Road, Pune"
      },
      image: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 3,
      name: "Dr. Rajesh Kumar",
      specialty: "Neurology",
      experience: 15,
      qualification: "MBBS, MD (Neurology)",
      registrationNumber: "MCI-998877",
      consultationFee: "₹1200",
      clinic: {
        name: "Brain & Spine Center",
        city: "Mumbai",
        area: "Bandra",
        address: "Bandra West, Mumbai"
      },
      image: "https://i.pravatar.cc/150?img=45"
    },
    {
      id: 4,
      name: "Dr. Priya Singh",
      specialty: "Pediatrics",
      experience: 8,
      qualification: "MBBS, MD (Pediatrics)",
      registrationNumber: "MCI-556677",
      consultationFee: "₹700",
      clinic: {
        name: "Little Care Clinic",
        city: "Pune",
        area: "Kothrud",
        address: "Kothrud Road, Pune"
      },
      image: "https://i.pravatar.cc/150?img=55"
    }
  ]
};