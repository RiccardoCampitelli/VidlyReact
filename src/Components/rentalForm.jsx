import React from "react";
import Form from "./common/form";
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";
import { createRental } from "../services/rentalService";
import Joi from "joi-browser";
import _ from "lodash";
import { toast } from "react-toastify";

class RentalForm extends Form {
  state = {
    data: { selectedMovies: [], selectedCustomer: {} },
    errors: {},
    movies: [],
    customers: []
  };

  schema = {
    selectedMovies: Joi.array().min(1),
    selectedCustomer: Joi.object().keys({
      _id: Joi.required(),
      name: Joi.required(),
      phone: Joi.required(),
      isGold: Joi.required()
    })
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

  doSubmit = async () => {
    const { selectedCustomer, selectedMovies } = this.state.data;

    try {
      await Promise.all(
        selectedMovies.map(async m => {
          return await createRental({
            customerId: selectedCustomer._id,
            movieId: m._id
          });
        })
      );
      toast.success("Success.");
      this.setState({ data: { selectedMovies: [], selectedCustomer: {} } });
    } catch (err) {
      console.log(err);
      toast.warn("Something went wrong.");
    }
  };

  handleCustomerTypeahead = value => {
    const data = { ...this.state.data };
    data.selectedCustomer = { ...value[0] };
    this.setState({ data });
  };

  handleMovieTypeahead = value => {
    const state = { ...this.state };

    state.data.selectedMovies.push(...value);
    this.setState({ ...state });
  };

  render() {
    const { selectedMovies, selectedCustomer } = this.state.data;
    return (
      <div className="row">
        <div className="col col-centered col-sm-10">
          <div className="row">
            <div className="col col-sm-4">
              <form onSubmit={this.handleSubmit}>
                {this.renderTypeahead({
                  options: this.state.customers,
                  placeholder: "Select customer..",
                  labelkey: "name",
                  name: "Customer",
                  handleTypeahead: this.handleCustomerTypeahead
                })}
                {this.renderTypeahead({
                  options: this.state.movies,
                  placeholder: "Select Movie...",
                  labelkey: "title",
                  name: "Movies",
                  handleTypeahead: this.handleMovieTypeahead
                })}
                {this.renderButton("Submit")}
              </form>
            </div>
            <div className="col col-sm-8">
              <h3 className="text-center">New Rental</h3>
              <div className="card text-center">
                <div className="card-header">
                  {!_.isEmpty(selectedCustomer) ? (
                    <p>{selectedCustomer.name}</p>
                  ) : (
                    <p>Select Customer</p>
                  )}
                </div>

                <ul className="list-group list-group-flush">
                  {selectedMovies.map((s, index) => {
                    return (
                      <li className="list-group-item" key={index}>
                        {s.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RentalForm;
