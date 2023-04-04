import React, { useEffect, useState } from 'react';
import axios from '../axios';
import requests from "../requests";
import "./Banner.css";

function Banner() {
    const  [movie , setMovie] = useState([]);

    useEffect(() => {
      async function fetchData(){
        const request = await axios.get(requests.fetchNetflixOriginals);
        if (request.data && request.data.results) {
          setMovie(
            request.data.results[
            Math.floor(Math.random() * request.data.results.length - 1)
          ]);
        }
        return request;
      }
      fetchData();
    }, []);
    
    function truncate(str, n){
      return str?.length > n ? str.substr(0, n -1) + "..." :str;
    }
  return (
    <header className='banner'
    style={{
      backgroundSize: "cover",
      backgroundImage: movie?.backdrop_path ? `url("http://image.tmdb.org/t/p/original/${movie.backdrop_path}")` : "",
      backgroundPosition: "center center",
    }}
  >
      <div className='banner-contents'>
        <h1 className='banner-titles'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className='banner_buttons'>
          <button className='banner_button'>Play</button>
          <button className='banner_button'>My List</button>
        </div>
        <h1 className='banner_description'>{truncate(movie?.overview,250)}</h1>
      </div>

      <div className='banner-fadeBottom'/>
    </header>
  )
}

export default Banner