import React, { useState } from 'react';
import axios from 'axios';
import { MdEdit } from "react-icons/md";

const CreateUserProfile = ({ fetchProfiles }) => {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    OneWord: '',
    bio: '',
    photo: ''
  });

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
      await axios.post('http://localhost:5000/api/users', profile);
      fetchProfiles();
      setProfile({
        username: '',
        email: '',
        password: '',
        bio: '',
        photo: ''
      });
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  return (
    <div className='profile'>
    <div className="create-profile-container">
      <h2>Design your Profile</h2>
      <MdEdit size={25} style={{color:"black"}}/>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="OneWord"
          placeholder="One Word that describes you!!"
          value={profile.password}
          onChange={handleChange}
          required
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleChange}
        ></textarea>
        <input type="file" name="photo" onChange={handleFileChange} />
        <button type="submit">Create Profile</button>
      </form>
    </div>
    </div>
  );
};

export default CreateUserProfile;
