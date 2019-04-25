import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: 0, rate: 0 },
    errors: {},
    genres: []
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string()
      .required()
      .label("Title"),
    genre: Joi.string()
      .label("Genres")
      .required(),
    numberInStock: Joi.number()
      .required()
      .integer()
      .min(0)
      .label("Number in stock"),
    rate: Joi.number()
      .required()
      .min(0)
      .label("Daily rental rate")
  };

  componentDidMount() {
    const { match, history } = this.props;
    const data = { ...this.state.data };
    const genres = getGenres();
    this.setState({ genres });

    if (match.path !== "/movies/new") {
      const movie = getMovie(match.params.id);

      if (movie == null) return history.replace("/not-found");

      data._id = movie._id;
      data.title = movie.title;
      data.numberInStock = movie.numberInStock;
      data.genre = movie.genre.name;
      data.rate = movie.dailyRentalRate;
      this.setState({ data });
    }
  }

  doSubmit = () => {
    saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    const { match, history } = this.props;
    const genres = getGenres().map(g => g.name);
    return (
      <div>
        <h1>Movie Form {match.params.id} </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("rate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>

        {/*  <button
          className="btn btn-primary"
          onClick={() => history.push("/movies")}
        >
          Save
        </button> */}
      </div>
    );
  }
}

export default MovieForm;
