import React from "react";
import Form from "./common/form";
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";

class RentalForm extends Form {
  state = {
    data: {},
    errors: {},
    movies: [],
    customers: [],
    selectedMovies: []
  };

  async componentDidMount() {
    try {
      const movies = await getMovies();
      const customers = await getCustomers();
      this.setState({ movies, customers });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { selectedMovies } = this.state;
    return (
      <div className="row">
        <div className="col col-centered col-sm-6">
          <h1>Form Here</h1>
          {this.renderTypeahead({
            options: this.state.movies,
            labelkey: "title",
            field: { field: "selectedMovies" }
          })}
          <ul>
            {selectedMovies.map((s, index) => {
              console.log(s);
              return <li>{s.title}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default RentalForm;
