import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";

import ListFilter from "./common/listFilter";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import MoviesTable from "./common/moviesTable";
import _ from "lodash";

class movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    activeGenre: null,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleGenreSelect = genreSelected => {
    this.setState({ activeGenre: genreSelected, currentPage: 1 });
  };

  filterMovies = movies => {
    if (this.state.activeGenre == null) return movies;

    const filteredMovies = movies.filter(
      m => m.genre.name === this.state.activeGenre
    );

    return filteredMovies;
  };

  deleteHandler = id => {
    const movies = this.state.movies.filter(m => m._id !== id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSort = sortCol => {
    this.setState({ sortColumn: sortCol });
  };

  getPageData = () => {
    const filteredMovies = this.filterMovies(this.state.movies);

    const sortedMovies = _.orderBy(
      filteredMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const movies = paginate(
      sortedMovies,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: filteredMovies.length, movies: movies };
  };

  render() {
    const genreList = this.state.genres.map(g => g.name);

    const { totalCount, movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListFilter
            listItems={genreList}
            allSelector={"All Genres"}
            activeItem={this.state.activeGenre}
            genreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>There are {totalCount} movies.</p>
          {totalCount > 0 ? (
            <MoviesTable
              movies={movies}
              sortColumn={this.state.sortColumn}
              onLike={this.handleLike}
              onDelete={this.deleteHandler}
              onSort={this.handleSort}
            />
          ) : (
            <p>There are no movies</p>
          )}
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default movies;
