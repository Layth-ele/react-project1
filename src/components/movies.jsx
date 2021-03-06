/** @format */

import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { Like } from "../common-components/like";

export default class Movies extends Component {
  state = {
    allMovies: getMovies(),
  };

  moviesCount() {
    return this.state.allMovies.length;
  }

  checkMoviesCounter() {
    if (this.moviesCount() === 0)
      return (
        <div className="alert alert-danger" role="alert">
          there is no Movies in your Database!
        </div>
      );
    else {
      return <p> You have {this.moviesCount()} Movies in your Database</p>;
    }
  }

  handleDelete = (movie) => {
    const allMovies = this.state.allMovies.filter((m) => m._id !== movie._id);
    this.setState({ allMovies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.allMovies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ allMovies: movies });
  };

  render() {
    return (
      <React.Fragment>
        {this.checkMoviesCounter()}
        <table className="table" hidden={this.moviesCount() === 0}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.allMovies.map((movie) => (
              <tr key={movie._id} className="table-borderless">
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    like={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td style={{ paddingLeft: 40, border: 0 }}>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
