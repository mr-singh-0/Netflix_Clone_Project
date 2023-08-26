import React, { useEffect, useState } from 'react';
import axiosInstance from './axios';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

   /* useEffect(() => {
        async function fetchData() {
            console.log('Fetching data from:', fetchUrl);
    
            try {
                const request = await axios.get(fetchUrl);
                console.log('Received data:', request.data);
                setMovies(request.data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [fetchUrl]);*/
    

    /*useEffect(() => {

        async function fetchData() {
            // eslint-disable-next-line no-undef
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);*/

    useEffect(() => {
        // Fetch data using axiosInstance
        axiosInstance.get(fetchUrl)
            .then(response => {
                setMovies(response.data.results);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };

      const handleClick = (movie) => {
        if (!movie) {
            console.log("Invalid movie data");
            return;
        }
    
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                if (!url) {
                    console.log("No trailer URL found for the movie");
                    return;
                }
    
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    };
    
    //console.table(movies);

    /*const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    };*/

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name} 
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;