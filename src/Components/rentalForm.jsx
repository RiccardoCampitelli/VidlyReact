import React from "react";
import Form from "./common/form";
import { getCustomers } from "../services/customerService";
import { getMovies } from "../services/movieService";
import { createRental, getRentals } from "../services/rentalService";
import Joi from "joi-browser";
import _ from "lodash";
import { toast } from "react-toastify";

class RentalForm extends Form {
  state = {
    data: { selectedMovies: [], selectedCustomer: {} },
    errors: {},
    movies: [],
    customers: [],
    rentals: [],
    customerSelected: false
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
      const rentals = await getRentals();
      this.setState({ movies, customers, rentals });
    } catch (error) {
      console.log(error);
    }
  }

  getAvailableMovies = customer => {
    const rentalsArray = [...this.state.rentals];
    const rentedMovies = rentalsArray
      .filter(r => r.customer._id === customer._id && !_.has(r, "dateReturned"))
      .map(r => r.movie._id);

    const moviesArray = [...this.state.movies];

    const res = moviesArray.filter(m => !rentedMovies.includes(m._id));
    return res;
  };

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
      this.setState({
        data: { selectedMovies: [], selectedCustomer: {} },
        customerSelected: false
      });
    } catch (err) {
      console.log(err);
      toast.warn("Something went wrong.");
    }
  };

  handleCustomerTypeahead = async value => {
    const data = { ...this.state.data };
    data.selectedCustomer = { ...value[0] };
    data.selectedMovies = [];
    const movies = this.getAvailableMovies(data.selectedCustomer);

    this.setState({ data, movies, customerSelected: true });
  };

  handleMovieTypeahead = value => {
    const state = { ...this.state };

    state.data.selectedMovies.push(...value);
    const index = state.movies.indexOf(value[0]);
    state.movies.splice(index, 1);

    this.setState({ ...state });
  };

  render() {
    const { selectedMovies, selectedCustomer } = this.state.data;
    const { customerSelected } = this.state;
    return (
      <div className="row">
        <div className="col col-centered col-sm-10">
          <div className="row">
            <div className="col col-sm-4">
              <form onSubmit={this.handleSubmit}>
                {this.renderTypeahead({
                  options: this.state.customers,
                  autofocus: true,
                  disabled: false,
                  placeholder: "Select customer..",
                  labelkey: "name",
                  name: "Customer",
                  handleTypeahead: this.handleCustomerTypeahead
                })}
                {this.renderTypeahead({
                  options: this.state.movies,
                  autofocus: false,
                  disabled: !this.state.customerSelected,
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
              <div
                className={
                  customerSelected
                    ? "card text-center text-white bg-primary"
                    : "card text-center"
                }
              >
                <div className="card-header">
                  {!_.isEmpty(selectedCustomer) ? (
                    <h4 className="font-weight-bold">
                      {selectedCustomer.name}
                    </h4>
                  ) : (
                    <h4 className="font-weight-bold">Select Customer</h4>
                  )}
                </div>

                <ul className="list-group list-group-flush text-dark">
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
