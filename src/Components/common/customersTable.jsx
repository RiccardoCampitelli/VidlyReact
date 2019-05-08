import React, { Component } from "react";

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
