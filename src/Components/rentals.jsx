import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRentals } from "../services/rentalService";
import auth from "../services/authService";
import RentalTable from "./common/rentalsTable";

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    search: ""
  };

  async componentDidMount() {
    this.setState({ rentals: await getRentals() });
    console.log(this.state.rentals);
  }

  handleSort = sortCol => {
    this.setState({ sortColumn: sortCol });
  };

  render() {
    return (
      <div className="row">
        <div className="col col-centered col-sm-8">
          <h3>Rentals</h3>
          {auth.getCurrentUser() && (
            <Link to="/rentals/new" className="btn btn-primary">
              New Rental
            </Link>
          )}
          <RentalTable
            rentals={this.state.rentals}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
          />
        </div>
      </div>
    );
  }
}

export default Rentals;
