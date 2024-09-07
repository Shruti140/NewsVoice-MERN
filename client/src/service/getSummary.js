import axios from 'axios';

const API_KEY = 'f5749cf2ef79ec92a52e041a81bd29bb';

export const getSummary = async (url, sentences = 5) => {
  const ENDPOINT = 'https://api.meaningcloud.com/summarization-1.0';
  try {
    const response = await axios.post(ENDPOINT, null, {
      params: {
        key: API_KEY,
        url: url,
        sentences: sentences,
      },
    });

    if (response.data.status.code === '200') {
      return { summary: response.data.summary, error: '' };
    } else {
      return { summary: '', error: 'Error summarizing the URL.' };
    }
  } catch (error) {
    return { summary: '', error: 'An error occurred while fetching the summary.' };
  }
}

export const analyzeSentiment = async (text) => {
  const API_ENDPOINT = 'https://api.meaningcloud.com/sentiment-2.1';
  try {
    const response = await axios.post(API_ENDPOINT, null, {
      params: {
        key: API_KEY,
        lang: 'en',
        txt: text,
      },
    });

    if (response.status === 200) {
      return { sentiment: response.data.score_tag, error: '' };
    } else {
      return { sentiment: null, error: 'Error performing sentiment analysis.' };
    }
  } catch (error) {
    return { sentiment: null, error: 'An error occurred while performing sentiment analysis.' };
  }
};

// Function to fetch the content of a news article from a given URL
export const fetchArticleContent = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(response.data, 'text/html');
      const content = doc.querySelector('body').innerText;
      return { content, error: '' };
    } else {
      return { content: '', error: 'Error fetching article content.' };
    }
  } catch (error) {
    return { content: '', error: 'An error occurred while fetching the article content.' };
  }
};