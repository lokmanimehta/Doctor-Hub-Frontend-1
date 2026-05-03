import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext"; // Only context
import "./AdminProfile.css";

const AdminProfile = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const [fullName, setFullName] = useState(currentUser?.fullName || "");
  const [age, setAge] = useState(currentUser?.age || "");
  const [profileImg, setProfileImg] = useState(currentUser?.profileImg || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImg(reader.result); // base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = { ...currentUser, fullName, age, profileImg };
    setCurrentUser(updatedUser);
    alert("Profile updated!");
  };

  return (
    <div className="admin-profile">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate} className="profile-form">
        <div className="profile-image-wrapper">
          <img
            src={profileImg || "https://i.pravatar.cc/100"}
            alt="Profile"
            className="profile-preview"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AdminProfile;
