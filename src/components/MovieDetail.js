import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function MovieDetail() {
  const { id } = useParams(); // Get movie ID from the URL
  const [movie, setMovie] = useState(null); // State to hold movie details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const API_KEY = '8098683717549e4a7bebc6501e93ce53'; // Replace with your valid API key
  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // Base URL for movie poster images 

  useEffect(() => {
    // Fetch movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(error => {      
        setError(error.message);        setLoading(false);
      });

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="movie-detail">
      {movie && (
        <>
          {/* Movie Poster, Title, Overview, and Rating */}
          <div className="movie-info">
            {movie.poster_path && (
              <img
                src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
            )}
            <div className="movie-meta">
              <h1>{movie.title}</h1>
              <p><strong>Rating:</strong> {movie.vote_average}/10</p>
              <p><strong>Overview:</strong> {movie.overview}</p>
              <p><strong>Release Date:</strong> {movie.release_date}</p>
              <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
            </div>
          </div>

        </>
      )}
    </div>
  );
}

export default MovieDetail;
