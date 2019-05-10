import React, { Component } from "react";

import auth from "../../services/authService";
import Table from "./table";
import Gold from "./gold";

class CustomersTable extends Component {
  columns = [
    { path: "name", label: "Name" },
    {
      path: "isGold",
      label: "Is Gold",
      content: customer => <Gold isGold={customer.isGold} />
    },
    { path: "phone", label: "Phone Number" }
  ];

  deleteColumn = {
    key: "delete",
    content: customer => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(customer._id)}
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    if (auth.isAdmin()) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { customers, sortColumn, onSort } = this.props;

    return (
      <Table
        columns={this.columns}
        data={customers}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CustomersTable;
