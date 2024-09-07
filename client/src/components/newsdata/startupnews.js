import React,{useState,useEffect} from 'react';
import { startupNews } from '../../service/getNews'
import Vote from '../comments/vote.js';
import NewsComment from '../comments/NewsComment.js';
import moment from 'moment';
import axios from 'axios';
import { toast } from "react-toastify";
import { FaCommentDots, FaRegBookmark} from "react-icons/fa6";

const StartupNews = () => {
    const [news, setNews] = useState([]);
    const [error, setError] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
        
    const fetchNews = async() => {
        let response = await startupNews();
        setNews(response.data.articles);
    }
    useEffect(() => {
        fetchNews();
    },[])

    const toggleCommentSection = (articleId) => {
        setSelectedArticle(selectedArticle === articleId ? null : articleId);
    };

    const saveArticle = async (article) => {
        try {
            const response = await axios.post('http://localhost:5000/api/savedArticles', article);
            console.log('Article saved:', response.data);
            toast.success("Saved an article", {position: "top-center"});
        } catch (error) {
            console.error('Error saving article:', error);
            toast.success("Error saving article", {position: "top-center"});
        }
    };

    return (
    <div>
      <div className='Main'>
        <div className='space-around m-3'>Want to do fundraising for your startup- Add your startup news and register yourself.</div>
        <div className='grid'>
            {news?.map((news,index) => {
                return (
                    <div className='grid-child' key={news.id}>
                        <div className='flexbox1'>
                        <img className="news-image" alt='News' src={news?.urlToImage ? news.urlToImage:require("../../assets/Image-Not-Available.png")} />
                        <div className='flex'>
                            <p className='news-title'>{news?.title}</p>
                            <p className='news-content'>{news?.content}</p>
                            <div className='space-between'>
                                <p className='news-author'>Author: {news?.author ? news?.author: 'Author name not available'}</p>
                                <p className='news-date'>Date: {moment(news?.publishedAt).format('LL')}</p>
                            </div>
                            <div className="flexbox space-between">
                                <div>
                                <a className='card_link' href={news?.url} rel="noreferrer" target='_blank'><span>Read More...</span></a>
                                {/* <button className='button2' onClick={()=>Navigate(news?.url)}>Get NewsAnalysis</button> */}
                                </div>
                                <div className='flexbox'>
                                <Vote key={news.id} article={news}/>
                                <FaCommentDots className='card_icons' key={news.id} onClick={() => toggleCommentSection(index)} />
                                <FaRegBookmark className="card_icons" key={news.id} onClick={() => saveArticle(news)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div> 
                        {selectedArticle === index && <NewsComment articleId={news.id} />}
                    </div>
                </div> 
                ) })}
            </div>
            {error && <p className='error' >{error}</p>}
        </div>
    </div>
  )
}

export default StartupNews;
