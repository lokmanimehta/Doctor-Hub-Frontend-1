// doctorProfileDummyData.js
export const DOCTORS = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  name: `Dr. ${["Amit", "Neha", "Rahul", "Sneha"][i % 4]} Sharma`,
  degree: "MBBS, MD",
  specialty: ["Cardiologist", "Dermatologist", "Physician"][i % 3],
  experience: 5 + (i % 15),
  rating: (4 + (i % 10) / 10).toFixed(1),
  reviews: 100 + i * 3,
  fee: 400 + i * 50,
  image: `https://i.pravatar.cc/150?img=${i + 15}`,
  clinicName: "Sharma Care Clinic",
  clinicAddress: "2nd Floor, MG Road, Mumbai",
  city: "Mumbai",
  languages: ["English", "Hindi", "Marathi"],
  registrationNo: "MMC/2012/45" + i,
  availability: "Mon – Sat (10 AM – 7 PM)",
  symptoms: ["Chest Pain", "BP", "Diabetes"],
  about: "Experienced doctor providing patient-centric, ethical and evidence-based treatment."
}));