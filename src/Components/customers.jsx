import React, { Component } from "react";
import CustomersTable from "./common/customersTable";
import { getCustomers, deleteCustomer } from "../services/customerService";
import auth from "../services/authService";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import { toast } from "react-toastify";
import _ from "lodash";

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

  handleDelete = async id => {
    const originalCustomers = this.state.customers;
    const customers = originalCustomers.filter(m => m._id !== id);
    this.setState({ customers });
    try {
      await deleteCustomer(id);
      toast.warn("Deleted.");
    } catch (error) {
      if (error.response && error.response.status === 404) {
      }
      toast.error("Error.");
      console.log(error);

      this.setState({ customers: originalCustomers });
    }
  };

  handleSearch = event => {
    const value = event.target.value.toString();

    this.setState({ search: value.toLowerCase() });
  };

  filterCustomers = customers => {
    const filteredCustomers = customers.filter(c =>
      c.name.toLowerCase().includes(this.state.search)
    );

    return filteredCustomers;
  };

  handleSort = sortCol => {
    this.setState({ sortColumn: sortCol });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPageData = () => {
    const filteredCustomers = this.filterCustomers(this.state.customers);

    const sortedCustomers = _.orderBy(
      filteredCustomers,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );

    const customers = paginate(
      sortedCustomers,
      this.state.currentPage,
      this.state.pageSize
    );

    return { totalCount: filteredCustomers.length, customers: customers };
  };

  render() {
    const { totalCount, customers } = this.getPageData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col col-centered col-sm-5">
            <h3>Customers</h3>
            {auth.isAdmin() && (
              <Link to="/customers/new" className="btn btn-primary">
                New Customer
              </Link>
            )}

            <input
              placeholder="Search..."
              type="text"
              className="form-control m-2"
              onChange={this.handleSearch}
              value={this.state.search}
            />

            <CustomersTable
              customers={customers}
              sortColumn={this.state.sortColumn}
              onSort={this.handleSort}
              onDelete={this.handleDelete}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              currentPage={this.state.currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Customers;
