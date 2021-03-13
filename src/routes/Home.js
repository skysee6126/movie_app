import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
import Movie from '../components/Movie';
import "./Home.css";

class Home extends React.Component {
  state = {
    isLodading: true,
    movies: []
  };
  getMovies = async () => {
    const {data: {data: {movies}}} = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
    this.setState({movies, isLodading: false});
  }
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLodading, movies } = this.state;
    return (
      <section className="container">
        {isLodading? 
        ( <div className="loader">
          <span className="loader__text">Loading...</span>
        </div>
        ) : (
          <div className= "movies">
            { movies.map(movie=>{
          // console.log(movie);
          return <Movie 
            key={movie.id}
            id={movie.id} 
            year={movie.year} 
            title={movie.title}
            summary={movie.summary}
            poster={movie.medium_cover_image}
            genres={movie.genres}
          />
            })}
          </div>
          
        )}
      </section>
    )
  }

}


export default Home;
