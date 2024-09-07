import React, { useState } from 'react';
import CreateUserProfile from './CreateProfile';
import ProfileList from './ProfileList';

const UserProfile = ()=> {
  const [selectedProfileId, setSelectedProfileId] = useState(null);

  return (
      <div className="app-container">
        <CreateUserProfile fetchProfiles={() => setSelectedProfileId(null)} />
        <ProfileList />
      </div>
  );
}

export default UserProfile;
