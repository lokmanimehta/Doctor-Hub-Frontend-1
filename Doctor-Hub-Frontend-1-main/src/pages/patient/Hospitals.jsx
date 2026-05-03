import React, { useState } from 'react';
import './Hospitals.css';
import { useNavigate } from 'react-router-dom';

const Hospitals = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [bedFilter, setBedFilter] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState("");
  const [preview, setPreview] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bedType, setBedType] = useState("General Ward");

  const selectedProfile = JSON.parse(localStorage.getItem("selectedProfile"));

  const hospitalImages = [
    "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200"
  ];

  const hospitalsData = [
    {
      id: 1,
      name: "A-Care Orthopaedic & General Hospital",
      location: "G-1, Giriraj Tower, Sai Baba Nagar, Mira Bhayander Road, Mira Road.",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "401107",
      country: "India",
      phoneNumber: "022-28123621",
      rating: "4.6",
      images: hospitalImages,
      depts: ["Orthopedics", "General"],
      bedsAvailable: 18,
      totalBeds: 40
    },
    {
      id: 2,
      name: "A.U.S. Clinic & Lithotripsy Centre",
      location: "Arun Chambers, Tardeo, Mumbai-400034Tardeo",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400034",
      country: "India",
      phoneNumber: "022-23523037",
      rating: "4.5",
      images: hospitalImages,
      depts: ["Urology", "Lithotripsy"],
      bedsAvailable: 12,
      totalBeds: 30
    },
    {
      id: 3,
      name: "Aarogyam Multispeciality Hospital",
      location: "1St Floor, Renuka Bldg, Appo Mangala High School, Above Bank, Maharashtra, Mumbaimumbai",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400603",
      country: "India",
      phoneNumber: "9323885921, 08879347444",
      rating: "4.7",
      images: hospitalImages,
      depts: ["Multi-Speciality", "General"],
      bedsAvailable: 22,
      totalBeds: 50
    },
    {
      id: 4,
      name: "Aashirwad Nursing Home",
      location: "Ashirwad, Swami Samarth Nagar, 2Nd Cross Lane, Lokhandwala Complex, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400053",
      country: "India",
      phoneNumber: "022-26361857",
      rating: "4.4",
      images: hospitalImages,
      depts: ["Nursing Home", "General"],
      bedsAvailable: 10,
      totalBeds: 25
    },
    {
      id: 5,
      name: "Abhishek Nursing Home (L.P.Diagnostics Pvt. Ltd.)",
      location: "Jagruti Co-Op.Soci Bhatwadi,Ghatkopm- (W), Mumbai - 400084Near Maratha Mandir,Co-Op Bank",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400084",
      country: "India",
      phoneNumber: "022-25106577, 022-25106578",
      rating: "4.5",
      images: hospitalImages,
      depts: ["Nursing Home", "Diagnostics"],
      bedsAvailable: 14,
      totalBeds: 32
    },
    {
      id: 6,
      name: "Abhijit Hospital",
      location: "Divya Trusha Mamlatdar Wadiroad Malad (West)",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400064",
      country: "India",
      phoneNumber: "022-28823046",
      rating: "4.3",
      images: hospitalImages,
      depts: ["General", "Emergency"],
      bedsAvailable: 16,
      totalBeds: 35
    },
    {
      id: 7,
      name: "Adarsh Hospital",
      location: "Meenakshi Apartments,C - Wing, 1St Floor, Marve Road,Maladmalad (W)",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400064",
      country: "India",
      phoneNumber: "022-28172284",
      rating: "4.4",
      images: hospitalImages,
      depts: ["General", "ICU"],
      bedsAvailable: 20,
      totalBeds: 45
    },
    {
      id: 8,
      name: "Adittya Eye Clinic",
      location: "M.G.Road, Ronik Apts, 1St Floor,Kandival(W)",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400067",
      country: "India",
      phoneNumber: "022-28655588",
      rating: "4.6",
      images: hospitalImages,
      depts: ["Eye Care", "Ophthalmology"],
      bedsAvailable: 8,
      totalBeds: 20
    },
    {
      id: 9,
      name: "Aditya Jyot Eye Hospital (P) Ltd.",
      location: "Plot # 153,Mojar Parmeshwaranroad (Opp) Siws Collage Gate #",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400031",
      country: "India",
      phoneNumber: "022-24177600",
      rating: "4.8",
      images: hospitalImages,
      depts: ["Eye Care", "Surgery"],
      bedsAvailable: 15,
      totalBeds: 30
    },
    {
      id: 10,
      name: "Agarwal Nursing Home",
      location: "4Th Floor,Shanti Centre, Plot # 8,Sec-17,Vashi,Navi Mumbai,Vashi, Navi Mumbai-400703",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400703",
      country: "India",
      phoneNumber: "022-27895318",
      rating: "4.4",
      images: hospitalImages,
      depts: ["Nursing Home", "General"],
      bedsAvailable: 13,
      totalBeds: 28
    },
    {
      id: 11,
      name: "Aggarwal Eye Hospital",
      location: "No.102/5,Ketayan Mansion,Shahaji Raje Marg,Koldongri,Andheri(E),Sahaje Raje Marg, Koldongri,",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400069",
      country: "India",
      phoneNumber: "02226824323, 9821111116",
      rating: "4.6",
      images: hospitalImages,
      depts: ["Eye Care", "Ophthalmology"],
      bedsAvailable: 11,
      totalBeds: 24
    },
    {
      id: 12,
      name: "Agrawal Clinic Surgical & General Hospital With Icu",
      location: "49, Daftary Road, Malad (East), Mumbai, Maharashtra, Opp. Subhash Lane.",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400097",
      country: "India",
      phoneNumber: "02228886666, 9773403465",
      rating: "4.7",
      images: hospitalImages,
      depts: ["Surgery", "ICU"],
      bedsAvailable: 19,
      totalBeds: 40
    },
    {
      id: 13,
      name: "Agrawal Eye Hospital",
      location: "1St Floor, Maharaja Apartment, Opp. Tel. Exchange, S.V. Road, Malad (West) Mumbai-400064",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400064",
      country: "India",
      phoneNumber: "022-28820900, 02228801201",
      rating: "4.5",
      images: hospitalImages,
      depts: ["Eye Care", "Ophthalmology"],
      bedsAvailable: 9,
      totalBeds: 22
    },
    {
      id: 14,
      name: "Amrut Hospital & Endoscopy Clinic",
      location: "Dr. Rajendra Prasad Road, Tilak Nagar, Dombivali(E), Thane, Maharashtra",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "421201",
      country: "India",
      phoneNumber: "022-2451005, 0251-2433636",
      rating: "4.6",
      images: hospitalImages,
      depts: ["Endoscopy", "General"],
      bedsAvailable: 17,
      totalBeds: 36
    },
    {
      id: 15,
      name: "Akanksha Maternity & Surgical Hospital",
      location: "6, Manish Tower, Manish Nagar, J P Road, Ahdheri(W)J.P. Road, Andheri (W)",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400053",
      country: "India",
      phoneNumber: "022-26353194",
      rating: "4.5",
      images: hospitalImages,
      depts: ["Maternity", "Surgery"],
      bedsAvailable: 21,
      totalBeds: 42
    },
    {
      id: 16,
      name: "Ankur Hospital",
      location: "1St Floor, Kalpatoru,Mathura Das Road,Kandivli (W)Mathuradas Rd, Kandivli (W)",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400067",
      country: "India",
      phoneNumber: "022-28070401",
      rating: "4.4",
      images: hospitalImages,
      depts: ["General", "Emergency"],
      bedsAvailable: 12,
      totalBeds: 30
    },
    {
      id: 17,
      name: "Anil Eye Hospital",
      location: "1St Floor, Krishna Smirti, Phadke Road, Dombivli",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "421201",
      country: "India",
      phoneNumber: "0251-2474874, 2449295",
      rating: "4.5",
      images: hospitalImages,
      depts: ["Eye Care", "Ophthalmology"],
      bedsAvailable: 7,
      totalBeds: 18
    },
    {
      id: 18,
      name: "Ankur Maternity And Surgical Nursing Home",
      location: "Shree Vijay Chs Ltd,Kanjur Marg East",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400042",
      country: "India",
      phoneNumber: "022-25783858",
      rating: "4.4",
      images: hospitalImages,
      depts: ["Maternity", "Nursing Home"],
      bedsAvailable: 15,
      totalBeds: 32
    },
    {
      id: 19,
      name: "Anmmol Orthovision",
      location: "101-102,Manisha Heights,Balrajeshwar Road,Mulund West",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400080",
      country: "India",
      phoneNumber: "022-25680989",
      rating: "4.6",
      images: hospitalImages,
      depts: ["Orthopedics", "Vision Care"],
      bedsAvailable: 10,
      totalBeds: 25
    },
    {
      id: 20,
      name: "Anupama Maternity & Nursing Home",
      location: "1/18, Jaykar Smruti,Aarey Road, Goregaon West.",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400062",
      country: "India",
      phoneNumber: "022-28720826",
      rating: "4.5",
      images: hospitalImages,
      depts: ["Maternity", "Nursing Home"],
      bedsAvailable: 14,
      totalBeds: 30
    }
  ];

  const handleOpenDetails = (hosp) => {
    setSelectedHospital(hosp);
    setIsModalOpen(true);
    setCurrentImageIndex(0);
  };

  const handleConfirm = (e) => {
    e.preventDefault();

    if (!selectedHospital) {
      alert("Something went wrong");
      return;
    }

    if (!selectedProfile) {
      alert("Please select patient profile first");
      navigate("/patient/profile");
      return;
    }

    const booking = {
      type: "HOSPITAL",
      hospitalId: selectedHospital.id,
      hospitalName: selectedHospital.name,
      hospitalPhoneNumber: selectedHospital.phoneNumber,
      hospitalAddress: selectedHospital.location,
      patientId: selectedProfile.id,
      patientName: selectedProfile.fullName,
      relation: selectedProfile.relation,
      bedsRequested: bedType,
      date: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("appointments")) || [];

    localStorage.setItem(
      "appointments",
      JSON.stringify([...existing, booking])
    );

    setIsModalOpen(false);
    setShowConfirmation(true);
  };

  const handleReset = () => {
    setSearchText("");
    setLocationFilter("");
    setBedFilter("");
    setSpecialityFilter("");
  };

  const filteredHospitals = hospitalsData.filter((hosp) => {
    const searchValue = searchText.toLowerCase();

    const matchSearch =
      hosp.name.toLowerCase().includes(searchValue) ||
      hosp.location.toLowerCase().includes(searchValue) ||
      hosp.phoneNumber.toLowerCase().includes(searchValue);

    const matchLocation =
      locationFilter === "" ||
      hosp.city.toLowerCase().includes(locationFilter.toLowerCase()) ||
      hosp.location.toLowerCase().includes(locationFilter.toLowerCase());

    const matchBeds =
      bedFilter === "" ||
      (bedFilter === "ICU" && hosp.bedsAvailable > 0) ||
      bedFilter === "Private Room" ||
      bedFilter === "General Ward";

    const matchSpeciality =
      specialityFilter === "" ||
      hosp.depts.join(" ").toLowerCase().includes(specialityFilter.toLowerCase());

    return matchSearch && matchLocation && matchBeds && matchSpeciality;
  });

  return (
    <div className="hospitals-page">
      <header className="top-search-section">
        <div className="search-wrapper">
          <input
            type="text"
            className="global-search-input"
            placeholder="Search hospitals, address, phone number..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <div className="filter-row">
            <select
              className="filter-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">Location</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Malad">Malad</option>
              <option value="Andheri">Andheri</option>
              <option value="Kandivli">Kandivli</option>
              <option value="Dombivli">Dombivli</option>
              <option value="Mulund">Mulund</option>
              <option value="Goregaon">Goregaon</option>
            </select>

            <select
              className="filter-select"
              value={bedFilter}
              onChange={(e) => setBedFilter(e.target.value)}
            >
              <option value="">Beds</option>
              <option value="ICU">ICU Available</option>
              <option value="Private Room">Private Room</option>
              <option value="General Ward">General Ward</option>
            </select>

            <select
              className="filter-select"
              value={specialityFilter}
              onChange={(e) => setSpecialityFilter(e.target.value)}
            >
              <option value="">Speciality</option>
              <option value="General">General</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Eye Care">Eye Care</option>
              <option value="Maternity">Maternity</option>
              <option value="Surgery">Surgery</option>
              <option value="ICU">ICU</option>
              <option value="Diagnostics">Diagnostics</option>
            </select>

            <button className="reset-filter-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </header>

      <section className="hospital-card-list">
        <h2>All Hospitals</h2>

        <div className="hospitals-grid">
          {filteredHospitals.map((hosp) => (
            <div key={hosp.id} className="hosp-standard-card">
              <div className="hosp-card-img">
                <img src={hosp.images[0]} alt={hosp.name} />
                <span className="rating-tag">⭐ {hosp.rating}</span>
              </div>

              <div className="hosp-card-info">
                <h3>{hosp.name}</h3>
                <p className="loc-text">📍 {hosp.location}</p>
                <p className="loc-text">🏙️ {hosp.city}, {hosp.state} - {hosp.pinCode}</p>
                <p className="loc-text">📞 {hosp.phoneNumber}</p>

                <div className="hosp-meta">
                  <span>❤️ {hosp.depts[0]} • {hosp.depts[1] || "General"}</span>
                  <span>🏠 Emergency • ICU Available</span>
                </div>

                <p className="bed-types">Bed Types: ICU, Private Room, General Ward</p>

                <button
                  className="view-details-btn"
                  onClick={() => handleOpenDetails(hosp)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {isModalOpen && selectedHospital && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>

            <div className="modal-flex">
              <div className="modal-info-side">
                {selectedHospital.images.length > 0 && (
                  <>
                    <img
                      src={selectedHospital.images[currentImageIndex]}
                      className="modal-hero-img"
                      alt={selectedHospital.name}
                      onClick={() => setPreview(selectedHospital.images[currentImageIndex])}
                    />

                    {selectedHospital.images.length > 1 && (
                      <>
                        <button
                          className="arrow left"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === 0 ? selectedHospital.images.length - 1 : prev - 1
                            )
                          }
                        >
                          ◀
                        </button>

                        <button
                          className="arrow right"
                          onClick={() =>
                            setCurrentImageIndex((prev) =>
                              prev === selectedHospital.images.length - 1 ? 0 : prev + 1
                            )
                          }
                        >
                          ▶
                        </button>
                      </>
                    )}

                    <div className="modal-gallery">
                      {selectedHospital.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt={`${selectedHospital.name} ${i + 1}`}
                          onClick={() => setCurrentImageIndex(i)}
                          style={{
                            border:
                              i === currentImageIndex
                                ? "2px solid var(--primary-color)"
                                : "1px solid #eee",
                          }}
                        />
                      ))}
                    </div>
                  </>
                )}

                <div className="modal-header-info">
                  <div className="hosp-logo-mini">
                    <img src={selectedHospital.images[0]} alt={selectedHospital.name} />
                  </div>

                  <div className="hosp-title-wrap">
                    <h2>{selectedHospital.name}</h2>
                    <p>
                      📍 {selectedHospital.city}, {selectedHospital.state}
                      <span className="star-span">⭐ {selectedHospital.rating}</span>
                    </p>
                  </div>
                </div>

                <div className="about-section">
                  <h4>Hospital Address</h4>
                  <p>{selectedHospital.location}</p>
                  <p>
                    {selectedHospital.city}, {selectedHospital.state} - {selectedHospital.pinCode}, {selectedHospital.country}
                  </p>
                </div>

                <div className="about-section">
                  <h4>Contact Number</h4>
                  <p>📞 {selectedHospital.phoneNumber}</p>
                </div>

                <div className="about-section">
                  <h4>About Hospital</h4>
                  <p>
                    {selectedHospital.name} provides healthcare services with hospital admission support,
                    emergency care, ICU availability, and patient-focused treatment facilities.
                  </p>
                </div>

                <div className="depts-section">
                  <h4>Departments</h4>
                  <div className="icon-grid">
                    {selectedHospital.depts.map((dept) => (
                      <div key={dept} className="dept-icon-item">
                        <span>⚕️</span>
                        <small>{dept}</small>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="facilities-section">
                  <h4>Facilities</h4>
                  <div className="icon-grid">
                    <div className="dept-icon-item">
                      <span>🏥</span>
                      <small>ICU</small>
                    </div>
                    <div className="dept-icon-item">
                      <span>🚑</span>
                      <small>Emergency</small>
                    </div>
                    <div className="dept-icon-item">
                      <span>💊</span>
                      <small>Pharmacy</small>
                    </div>
                    <div className="dept-icon-item">
                      <span>🛏️</span>
                      <small>Beds</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-form-side">
                <h3>Booking & Admission Request</h3>

                <form onSubmit={handleConfirm}>
                  <div className="form-group">
                    <label>Bed Selection</label>
                    <select
                      className="form-select"
                      value={bedType}
                      onChange={(e) => setBedType(e.target.value)}
                    >
                      <option>General Ward</option>
                      <option>Private Room</option>
                      <option>Deluxe Room</option>
                      <option>ICU</option>
                      <option>Ventilator ICU</option>
                      <option>Emergency Bed</option>
                      <option>Isolation Ward</option>
                      <option>Maternity Ward</option>
                      <option>Pediatric Ward</option>
                    </select>
                  </div>

                  <div className="bed-availability-ui">
                    <p>Bed Availability UI (Real-Time)</p>
                    <small className="green-text">
                      Beds Available: {selectedHospital.bedsAvailable} / {selectedHospital.totalBeds}
                    </small>

                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${(selectedHospital.bedsAvailable / selectedHospital.totalBeds) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="booking-section">
                    <p>Patient Info</p>

                    {selectedProfile ? (
                      <div className="selected-patient-card">
                        <h4>{selectedProfile.fullName}</h4>
                        <p>
                          {selectedProfile.relation} • {selectedProfile.age || "N/A"} yrs • {selectedProfile.gender}
                        </p>
                      </div>
                    ) : (
                      <p style={{ color: "red" }}>No profile selected</p>
                    )}
                  </div>

                  <button type="submit" className="book-bed-btn">
                    Book Bed Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="success-overlay">
          <div className="success-toast">
            <p style={{ fontWeight: "bold", color: "#10B981" }}>
              Bed booked successfully ✅
            </p>

            <div style={{ fontSize: "13px", margin: "10px 0", color: "#666" }}>
              <p><strong>Hospital:</strong> {selectedHospital?.name}</p>
              <p><strong>Phone:</strong> {selectedHospital?.phoneNumber}</p>
              <p><strong>Type:</strong> {bedType}</p>
            </div>

            <button
              className="view-details-btn"
              onClick={() => setShowConfirmation(false)}
            >
              Confirm
            </button>
          </div>
        </div>
      )}

      {preview && (
        <div className="full-preview-overlay active" onClick={() => setPreview(null)}>
          <img
            src={preview}
            className="full-preview-img"
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
          />

          <button className="preview-close-btn" onClick={() => setPreview(null)}>
            ×
          </button>

          {selectedHospital?.images?.length > 1 && (
            <>
              <button
                className="full-preview-arrow left"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = selectedHospital.images.indexOf(preview);
                  const newIndex = idx === 0 ? selectedHospital.images.length - 1 : idx - 1;
                  setPreview(selectedHospital.images[newIndex]);
                }}
              >
                ◀
              </button>

              <button
                className="full-preview-arrow right"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = selectedHospital.images.indexOf(preview);
                  const newIndex = idx === selectedHospital.images.length - 1 ? 0 : idx + 1;
                  setPreview(selectedHospital.images[newIndex]);
                }}
              >
                ▶
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Hospitals;