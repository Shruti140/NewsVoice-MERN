import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const ShowNews = ({ onPostSelected }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter((post) => post._id !== id));
    } catch (error) {
      console.error('Error deleting post', error);
    }
  };

  return (
    <>
    <div className='heading'>POSTED NEWS</div>
    <div className='grid'>
      {posts?.map((post) => {
        return(
        <div className='grid-child' key={post.id}>
          <img className='news-image' src={post?.photo ? post?.photo:require("../../assets/Image-Not-Available.png")} alt="Post" />
          <div className='flex'>
            <div className='news-title'>{post?.title}</div>
            <div className='news-content'>{post?.desc}</div>
            <div className='space-between'>
                <p className='news-author'>Author: {post?.username}</p>
                <p className='news-date'>Date: {moment(post?.createdAt).format('LL')}</p>
            </div>
            <div className='flexbox space-between'>
              <div>
                <p className='news-author'>Categories: {post?.categories.join(', ')}</p>
              </div>
              <div className='flexbox'> 
                <button className='button2' onClick={() => onPostSelected(post)}>Edit</button>
                <button className='button2' onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      ) })} 
    </div>
    </>
  );
};

export default ShowNews;
