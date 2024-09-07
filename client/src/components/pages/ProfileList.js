import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookReader} from "react-icons/fa";
import { MdOutlineHeadsetMic} from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setProfiles(response.data);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="profile-list-container">
      <div className='heading'>OUR USERS PROFILE</div>
        <div className='users'>
          <div className='card-icons'><FaBookReader />Reader</div>
          <div className='card-icons'><MdOutlineHeadsetMic/>Journalist</div>
          <div className='card-icons'><RiAdminFill />Admin</div>
        </div>
      <ul className='container'>
        {profiles.map((profile) => (
          <li className='names' key={profile._id} >
            <img src={profile.photo ? profile.photo:require('../../assets/pic.jpg')} alt="Profile" />
            <div >
              <div>{profile.username}</div>
              <div>{profile.email}</div>
              <div>{profile.bio}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
