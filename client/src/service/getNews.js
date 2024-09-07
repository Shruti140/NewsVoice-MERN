import axios from 'axios';
const API_Key= `34dde4c8f492418fbab595b353af1724`;

export function getNews(category, page = 1) {
    const API_Endpoint = `https://newsapi.org/v2/top-headlines?category=${category}&page=${page}&pageSize=10`;
    return axios.get(`${API_Endpoint}&apiKey=${API_Key}`); 
}

export const SearchNews = async (keyword) => {
    const ENDPOINT = 'https://newsapi.org/v2/everything';
    try {
        const response = await axios.get(ENDPOINT, {
            params: {
                apiKey: API_Key,
                q: keyword,
                sortBy: 'relevance',
                language: 'en',
            },
        });

        if (response.status === 200) {
            return { articles: response.data.articles, error: '' };
        } else {
            return { articles: [], error: 'Error fetching news articles.' };
        }
    } catch (error) {
        return { articles: [], error: 'An error occurred while fetching the news.' };
    }
};

export const startupNews = async() => {
    const API_Endpoint= `https://newsapi.org/v2/top-headlines?q=startup`;
    return axios.get(`${API_Endpoint}&apikey=${API_Key}`)
}