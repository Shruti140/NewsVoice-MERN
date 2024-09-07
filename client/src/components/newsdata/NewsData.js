import React, { useEffect ,useState, useCallback} from 'react';
import moment from 'moment';
import axios from 'axios';
import alanBtn from '@alan-ai/alan-sdk-web';
import {useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";
import { FaCommentDots, FaRegBookmark} from "react-icons/fa6";
//import LazyLoad from 'react-lazyload';

import {SearchNews, getNews} from '../../service/getNews.js';
import Search from './Search.js';
import Vote from '../comments/vote.js';
import NewsComment from '../comments/NewsComment.js';
import FakeNewsDetector from '../newsAnalysis/fakeNewsAnalysis.js';

import "../theme/theme.css";
import './App.css';

function NewsData() {
    const [news, setNews] = useState([]);
    const [category, setCategory] = useState('general');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const navigate = useNavigate();

    const alanKey='8d76a4338d59f44bf83cd3d040ad0a042e956eca572e1d8b807a3e2338fdd0dc/stage';
    const categories=['business','entertainment','general','health','science','sports','technology',];

    const fetchNews = useCallback(async (category, page) => {
        try {
            const response = await getNews(category, page);
            setNews(prevNews => [...prevNews, ...response.data.articles]);
            console.log('Fetched News:', response.data.articles);
        } catch (err) {
            setError('Error fetching news');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        setNews([]); 
        setPage(1); 
        fetchNews(category, 1);
    }, [category, fetchNews]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                setPage(prevPage => prevPage + 1);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (page > 1) {
            fetchNews(category, page);
        }
    }, [page, category, fetchNews]);

    const handleSearch = async (keyword) => {
        try {
            const result = await SearchNews(keyword);
            setNews(result.articles);
            setError(result.error);
        } catch (err) {
            setError('Error searching news');
        }
    };

    const Navigate = async(url)=> {
        navigate(`/NewsAnalysis/${encodeURIComponent(url)}`);
    };

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, category: alanCategory, keyword }) => {
                if (command === 'changeCategory') {
                    setCategory(alanCategory);
                    fetchNews(alanCategory,1);
                } else if (command === 'searchNews') {
                    handleSearch(keyword);
                }
            },
        });
    }, [fetchNews]);

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
    <>
    <div className='Main'>
        <div className='navbar'>
            <div style={{marginLeft: "10px"}}>
                {categories.map((cat) => (
                    <button className='button1' key={cat} onClick={() => setCategory(cat)}>
                        {cat.charAt(0).toUpperCase()+cat.slice(1)}
                    </button>
                ))}
            </div>
            <Search onSearch={handleSearch} />
        </div>
        <div className='grid'>
            {news?.map((news,index) => {
                return (
                    <div className='grid-child' key={news.id} >
                        <div className='flexbox1'>
                        <img className="news-image" alt='News' src={news?.urlToImage ? news.urlToImage:require("../../assets/Image-Not-Available.png")} />
                        <div className='flex'>
                            <p className='news-title'>{news?.title}</p>
                            <p className='news-content'>{news?.content}</p>
                            <div className='space-between'>
                                <p className='news-author'>Author: {news?.author ? news?.author: 'Author name not available'}</p>
                                <p className='news-date'>Date: {moment(news?.publishedAt).format('LL')}</p>
                            </div>
                            <FakeNewsDetector title={news?.title} content={news?.content} />
                            <div className="flexbox space-between">
                                <div>
                                <a className='card_link' href={news?.url} rel="noreferrer" target='_blank'><span>Read More...</span></a>
                                <button className='button2' onClick={()=>Navigate(news?.url, news?.title, news?.content)}>Get NewsAnalysis</button>
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
                {loading && <p>Loading more news...</p>}
            </div>
            {error && <p className='error' >{error}</p>}
        </div>
    </>
    );
}

export default NewsData;