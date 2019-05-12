import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class Rentals extends Component {
  state = {
    rentals: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    search: ""
  };

  render() {
    return (
      <div className="row">
        <div className="col col-centered">
          <h3>Rentals</h3>
          {auth.getCurrentUser() && (
            <Link to="/rentals/new" className="btn btn-primary">
              New Movie
            </Link>
          )}
        </div>
      </div>
    );
  }
}

export default Rentals;
