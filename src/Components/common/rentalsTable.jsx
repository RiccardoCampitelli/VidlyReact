import React, { Component } from "react";
import Table from "./table";

class RentalTable extends Component {
  columns = [
    { path: "customer.name", label: "Customer" },
    { path: "movie.title", label: "Movie" },
    {
      path: "dateOut",
      label: "Rented",
      content: rental => {
        return rental.dateOut
          .toString()
          .slice(0, 10)
          .replace(/-/g, "/");
      }
    },
    {
      path: "DateIn",
      label: "Returned",
      content: rental => {
        return rental.dateReturned ? (
          rental.dateReturned
            .toString()
            .slice(0, 10)
            .replace(/-/g, "/")
        ) : (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onReturn(rental._id)}
          >
            Return
          </button>
        );
      }
    }
  ];

  render() {
    const { rentals, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={rentals}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default RentalTable;
