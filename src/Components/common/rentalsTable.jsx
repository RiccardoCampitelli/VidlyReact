import React, { Component } from "react";
import Table from "./table";

class RentalTable extends Component {
  columns = [
    { path: "customer.name", label: "Customer" },
    { path: "movie.title", label: "Movie" },
    { path: "dateOut", label: "Rented" },
    { path: "DateIn", label: "Returned" }
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
