import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NewsScreen.css';

function NewsScreen() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://movies-news1.p.rapidapi.com/movies_news/recent',
      headers: {
        'X-RapidAPI-Key': 'a1f958bd18msheafc3f01c3a53a0p1b804fjsn355759087e1e',
        'X-RapidAPI-Host': 'movies-news1.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(response => {
        setNews(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="news-container">
      <h1>Recent movie news</h1>
      {news.map(article => (
        <div key={article.id} className="news-article">
        <img src={article.image_url} alt={article.title} className="news-image" />
        <h2 className="news-title">{article.title}</h2>
        <p className="news-description">{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsScreen;
