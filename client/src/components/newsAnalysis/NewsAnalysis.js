import { useState ,useEffect} from "react";
import { useParams } from 'react-router-dom';
import {getSummary,analyzeSentiment} from '../../service/getSummary.js';
import "./NewsAnalysis.css";

function NewsAnalysis() {

    const [summary, setSummary] = useState('');
    const [error, setError] = useState('');
    const [sentiment, setSentiment] = useState('');

    const { url } = useParams();
    const articleUrl = decodeURIComponent(url);

    useEffect(() => {
        const handleSubmit = async () => {
            const result = await getSummary(articleUrl);
            setSummary(result.summary);
            setError(result.error);
        };

        const handleAnalyzeSentiment = async () => {
            const sentimentResult = await analyzeSentiment(articleUrl);
            setSentiment(sentimentResult.sentiment);
            setError(sentimentResult.error);
        };

        handleSubmit();
        handleAnalyzeSentiment();
    },[articleUrl]);

    return(
        <div className="center-box">
            <div className='box'>
                <div className="box-header">AI News Summarizer</div>
                <hr/>
                <div className="box-container">
                    {summary && (
                    <div>
                        <h4>Summary</h4>
                        <p>{summary}</p>
                    </div>
                )}
                {error && <p className="error">{error}</p>}
                </div>
            </div>
            <div className="box">
                <div className="box-header">Check Sentiment Analysis</div>
                <hr/>
                <div className='box-container'>Sorry for Inconvenience, Still in Development Phase...</div>
                <div className="box-container">
                    {error && <p className="error">{error}</p>}
                    {sentiment && <p>Sentiment: {sentiment}</p>}
                </div>
            </div>
        </div>
    );
}

export default NewsAnalysis;