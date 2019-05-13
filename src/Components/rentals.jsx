import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getRentals, returnRental } from "../services/rentalService";
import auth from "../services/authService";
import RentalTable from "./common/rentalsTable";

import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import _ from "lodash";
import { toast } from "react-toastify";

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    search: ""
  };

  async componentDidMount() {
    this.loadRentals();
  }

  loadRentals = async () => {
    this.setState({ rentals: await getRentals() });
  };

  handleReturn = async id => {
    try {
      const rental = this.state.rentals.find(r => r._id === id);
      console.log(rental);
      await returnRental({
        customerId: rental.customer._id,
        movieId: rental.movie._id
      });
      await this.loadRentals();
      toast.success("Returned.");
    } catch (error) {
      console.log(error);
      toast.warn("Something went wrong.");
    }
  };

  handleSort = sortCol => {
    this.setState({ sortColumn: sortCol });
  };

  handleSearch = event => {
    const value = event.target.value.toString();

    this.setState({ search: value.toLowerCase() });
  };

  filterRentals = rentals => {
    const filteredRentals = rentals.filter(c =>
      c.customer.name.toLowerCase().includes(this.state.search)
    );

    return filteredRentals;
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const filteredRentals = this.filterRentals(this.state.rentals);

    const sortedRentals = _.orderBy(
      filteredRentals,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const rentals = paginate(
      sortedRentals,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: filteredRentals.length, rentals: rentals };
  };

  render() {
    const { totalCount, rentals } = this.getPageData();
    return (
      <div className="row">
        <div className="col col-centered col-sm-8">
          <h3>Rentals</h3>
          {auth.getCurrentUser() && (
            <Link to="/rentals/new" className="btn btn-primary">
              New Rental
            </Link>
          )}

          <input
            placeholder="Search customer..."
            type="text"
            className="form-control m-2"
            onChange={this.handleSearch}
            value={this.state.search}
          />

          <RentalTable
            rentals={rentals}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
            onReturn={this.handleReturn}
          />

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

export default Rentals;
