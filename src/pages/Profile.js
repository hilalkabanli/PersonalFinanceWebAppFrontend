// src/pages/Profile.js
import React from 'react';
import ProfilePage from '../components/ProfilePage';

const Profile = () => {
  const userId = '19d7cc53-ac7b-43aa-ea43-08dc946af152'; // Adjust according to your auth setup

  return (
    <div>
      <ProfilePage userId={userId} />
    </div>
  );
};

export default Profile;
