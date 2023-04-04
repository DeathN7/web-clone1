import React, { useState, useEffect } from 'react';
import axios from "../axios";
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import Modal from 'react-modal';

const IMAGE_BASE_URL = "http://image.tmdb.org/t/p/original/";

function MovieDetailsModal({ movie, isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="movie-details-modal"
      overlayClassName="movie-details-overlay"
    >
      <h2>{movie.title}</h2>
      <p>{movie.release_date}</p>
      <p>{movie.overview}</p>
    </Modal>
  );
}

function Row({ title, fetchUrl, LargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null); // Thêm state selectedMovie

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "550",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // Khi click vào ảnh, tìm kiếm trailer phim và hiển thị trong một Modal
  const handleClick = async (movie) => {
    try {
      const url = await movieTrailer(movie?.name || "");
      if (!url) {
        console.error(`Không tìm thấy URL trailer cho phim: ${movie.name}`);
        return;
      }
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
      setSelectedMovie(movie); // Lưu thông tin phim vào state selectedMovie
    } catch (error) {
      console.error(error);
      setTrailerUrl("error");
    }
  };

  // Đóng trailer khi click vào nút đóng hoặc overlay
  const handleCloseTrailer = () => {
    setTrailerUrl("");
  };

  return (
    <div className="row">
      <h2 className='row-title'>{title}</h2>
      <div className="row_posters">
        {movies && movies.map((movie) => (
          <img 
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${LargeRow && "row-posterLarge"}`}
            src={`${IMAGE_BASE_URL}${LargeRow ? movie.poster_path : movie.backdrop_path}`}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl !== "" && (
        <div className="trailer-wrapper" onClick={handleCloseTrailer}>
          <div className="trailer-container" onClick={(e) => e.stopPropagation()}>
            <Youtube videoId={trailerUrl} opts={opts} className="trailer-video"/>
            <span className="trailer-close" onClick={handleCloseTrailer}></span>
            {selectedMovie && (
              <div className="movie-details-container"> {/* Tạo thêm div bao quanh MovieDetailsModal */}
              <MovieDetailsModal 
              isOpen={true} // Mở Modal
              onRequestClose={() => setSelectedMovie(null)} // Đóng Modal khi click nút đóng hoặc overlay
              movie={selectedMovie} // Truyền thông tin phim vào Modal
              />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


export default Row;