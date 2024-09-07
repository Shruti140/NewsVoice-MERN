import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = ({ selectedProfileId }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    bio: '',
    photo: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${selectedProfileId}`);
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (selectedProfileId) {
      fetchProfile();
    }
  }, [selectedProfileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, photo: URL.createObjectURL(e.target.files[0]) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${selectedProfileId}`, profile);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="create-profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={profile.photo ? profile.photo:require('./pic.jpg')} alt="Profile" />
          {editMode && <input type="file" name="photo" onChange={handleFileChange} />}
        </div>
        <div className="profile-info">
          {editMode ? (
            <>
              <input type="text" name="username" value={profile.username} onChange={handleChange} />
              <input type="email" name="email" value={profile.email} onChange={handleChange} />
              <textarea name="bio" value={profile.bio} onChange={handleChange}></textarea>
            </>
          ) : (
            <>
              <h2>{profile.username}</h2>
              <p>{profile.email}</p>
              <p>{profile.bio}</p>
            </>
          )}
        </div>
      </div>
      <div className="profile-footer">
        {editMode ? (
          <button onClick={handleSubmit}>Save</button>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default User;
