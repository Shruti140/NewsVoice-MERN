import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";

const AddNews = ({ selectedPost, onPostSaved }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [photo, setPhoto] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [categories, setCategories] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setDesc(selectedPost.desc);
      setPhoto(selectedPost.photo);
      setUsername(selectedPost.username);
      setUserId(selectedPost.userId);
      setCategories(selectedPost.categories.join(','));
    }
  }, [selectedPost]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPost = {
      title,
      desc,
      photo,
      username,
      userId,
      categories: categories.split(','),
    };

    try {
      if (selectedPost) {
        await axios.put(`http://localhost:5000/api/posts/${selectedPost._id}`, newPost);
      } else {
        await axios.post('http://localhost:5000/api/posts', newPost);
      }
      onPostSaved();
      setTitle('');
      setDesc('');
      setPhoto('');
      setUsername('');
      setUserId('');
      setCategories('');
    } catch (error) {
      console.error('Error saving post', error);
    }
    toast.success("News is Added", {
      position: "top-center",
    });
  };

  return (
  <div className='profile'>
  <div className='news1-container'>
    <div className='heading'>ADD A NEWS - CONTRIBUTE TO OUR COMMUNITY</div>
    <form className='form-container' onSubmit={handleSubmit}>
      <div className='flexbox'>
        <div className='form-label'><p>Title</p></div>
        <input
          type="text"
          value={title}
          className='form-input'
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className='flexbox'>
        <div className='form-label'>Description</div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
      </div>
      <div className='flexbox'>
        <div className='form-label'>Photo URL</div>
        <input
          type="text"
          value={photo}
          className='form-input'
          onChange={(e) => setPhoto(e.target.value)}
        />
      </div>
      <div className='flexbox'>
        <div className='form-label'>Username</div>
        <input
          type="text"
          value={username}
          className='form-input'
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className='flexbox'>
        <div className='form-label'>User ID</div>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
          className="form-input"
        />
      </div>
      <div className='flexbox'>
        <div className='form-label'>Categories (comma separated)</div>
        <input
          type="text"
          value={categories}
          className='form-input'
          onChange={(e) => setCategories(e.target.value)}
        />
      </div>
      <button className='button4' type="submit">{selectedPost ? 'Update' : 'Add'} Post</button>
    </form>
  </div>
  </div>
  );
};

export default AddNews;
