import React, { Component } from "react";
import CustomersTable from "./common/customersTable";
import { getCustomers } from "../services/customerService";

class Customers extends Component {
  state = {
    customers: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    search: ""
  };

  async componentDidMount() {
    this.setState({ customers: await getCustomers() });
  }

  handleSort = sortCol => {
    this.setState({ sortColumn: sortCol });
  };

  render() {
    return (
      <React.Fragment>
        <h1>Customers</h1>
        <CustomersTable
          customers={this.state.customers}
          sortColumn={this.state.sortColumn}
          onSort={this.handleSort}
        />
      </React.Fragment>
    );
  }
}

export default Customers;
