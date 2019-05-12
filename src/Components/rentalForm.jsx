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
    selectedMovies: [],
    selectedCustomer: {}
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

  handleCustomerTypeahead = value => {
    console.log(value[0]);
    const selectedCustomer = { ...value[0] };
    this.setState({ selectedCustomer });
  };

  handleMovieTypeahead = value => {
    const state = { ...this.state };
    /*   const obj = state[name.field]; */
    state.selectedMovies.push(...value);
    this.setState({ ...state });
  };

  render() {
    const { selectedMovies } = this.state;
    return (
      <div className="row">
        <div className="col col-centered col-sm-6">
          <h1>Form Here</h1>
          {this.renderTypeahead({
            options: this.state.movies,
            labelkey: "title",
            name: "movies",
            handleTypeahead: this.handleMovieTypeahead
          })}
          <ul>
            {selectedMovies.map((s, index) => {
              return <li key={index}>{s.title}</li>;
            })}
          </ul>
          {this.renderTypeahead({
            options: this.state.customers,
            labelkey: "name",
            name: "customer",
            handleTypeahead: this.handleCustomerTypeahead
          })}
          {this.state.selectedCustomer ? (
            <p>{this.state.selectedCustomer.name}</p>
          ) : null}
        </div>
      </div>
    );
  }
}

export default RentalForm;
