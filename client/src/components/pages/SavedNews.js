import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCommentDots, FaRegBookmark} from "react-icons/fa6";
import moment from 'moment';
import { toast } from "react-toastify";
import Vote from '../comments/vote.js';

const SavedNews = () => {
  const [savedNews, setSavedNews] = useState([]);

  useEffect(() => {
    const fetchSavedNews = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/savedArticles');
          setSavedNews(response.data);
        } catch (error) {
          console.error('Error fetching saved news:', error);
        }
      };

    fetchSavedNews();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/savedArticles/${id}`);
      setSavedNews(savedNews.filter((news) => news._id !== id));
    } catch (error) {
      console.error('Error deleting post', error);
    }
    toast.success("Unsaved an article", {
      position: "top-center",
    });
  };

  return (
    <>
      <div className='heading'>SAVED NEWS</div>
      <div className='grid'>
        {savedNews?.map((news,index) => {
          return (
          <div className='grid-child' key={news.id}>
            <img className="news-image" alt='News' src={news?.urlToImage ? news.urlToImage:require("../../assets/Image-Not-Available.png")} />
            <div className='flex'>
              <div className='news-title'>{news?.title}</div>
              <div className='news-content'>{news?.content}</div>
              <div className='space-between'>
                <p className='news-author'>Author: {news?.author ? news?.author: 'Author name not available'}</p>
                <p className='news-date'>Date: {moment(news?.publishedAt).format('LL')}</p>
              </div>
              <div className="flexbox space-between">
                <div>
                  <a className='card_link' href={news?.url} rel="noreferrer" target='_blank'><span>Read More...</span></a>
                </div>
                <div className='flexbox'>
                  <Vote key={news.id} article={news}/>
                  <FaCommentDots className='card_icons' />
                  <FaRegBookmark key={news.id} className="card_icons" onClick={() => handleDelete(news?._id)}/>
                </div>
              </div>
            </div>
          </div> 
          ) })}
      </div>
    </>
  );
};

export default SavedNews;
