import React from "react";

import movieTitles from "./movieTitles";
class GetMovieData extends React.Component {
  state = {
    movieData: []
  };
  async componentDidMount() {
    try {
      const movieData = [];
      await Promise.all(
        movieTitles.map(async title => {
          const res = await fetch(
            `http://www.omdbapi.com/?t=${title}&apikey=apiKey`
          );
          if (res.ok) {
            const result = await res.json();
            if (result) {
              movieData.push({
                Title: result.Title,
                imdbID: result.imdbID,
                Genre: result.Genre,
                imdbRating: result.imdbRating,
                imdbVotes: result.imdbVotes
              });
            }
          }
        })
      );
      this.setState({
        movieData
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false, loadingError: true });
    }
  }
  render() {
console.table(JSON.stringify(this.state.movieData, null, 2))

    return (
      <table>
        <thead>
          <tr>
            <td>Movie rating</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Title</td>
            <td>imdbID</td>
            <td>Genre</td>
            <td>imdbRating</td>
            <td>imdbVotes</td>
          </tr>
          {this.state.movieData.map((movie, key) => (
            <tr key={key}>
              <td>{movie.Title}</td>
              <td>{movie.imdbID}</td>
              <td>{movie.Genre}</td>
              <td>{movie.imdbRating}</td>
              <td>{movie.imdbVotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default GetMovieData;
