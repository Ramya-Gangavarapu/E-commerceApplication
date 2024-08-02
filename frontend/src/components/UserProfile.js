// src/components/UserProfile.js
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import '../styles/UserProfile.css'; 

const UserProfile = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-profile">
      {user ? (
        <div className="profile-details">
          <h2>User Profile</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p className="no-data">No user data available</p>
      )}
    </div>
  );
};

export default UserProfile;