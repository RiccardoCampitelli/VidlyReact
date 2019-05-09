import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";

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
      .integer()
      .required()
      .min(0)
      .label("Daily rental rate")
  };

  async componentDidMount() {
    await this.populateGenres();

    await this.populateMovie();
  }

  async populateMovie() {
    const { match, history } = this.props;
    const data = { ...this.state.data };

    if (match.path !== "/movies/new") {
      try {
        const movie = await getMovie(match.params.id);
        data._id = movie._id;
        data.title = movie.title;
        data.numberInStock = movie.numberInStock;
        data.genre = movie.genre.name;
        data.rate = movie.dailyRentalRate;
        this.setState({ data });
      } catch (error) {
        return history.replace("/not-found");
      }
    }
  }

  async populateGenres() {
    const genres = await getGenres();
    this.setState({ genres });
  }

  mapToDto = movie => {
    const genre = this.state.genres.find(g => g.name === movie.genre)._id;

    return {
      _id: movie._id,
      title: movie.title,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.rate,
      genreId: genre
    };
  };

  doSubmit = async () => {
    const movie = { ...this.state.data };
    const movieDto = this.mapToDto(movie);
    await saveMovie(movieDto);

    this.props.history.push("/movies");
  };

  render() {
    const { genres } = this.state;
    return (
      <div className="row">
        <div className="col col-sm-6 col-centered">
          <h3>Movie Form</h3>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genre", "Genre", genres)}
            {this.renderInput("numberInStock", "Number In Stock", "number")}
            {this.renderInput("rate", "Rate", "number")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;
