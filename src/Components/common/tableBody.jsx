import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, col) => {
    if (col.content) return col.content(item);

    return _.get(item, col.path);
  };

  createKey = (item, col) => {
    return item._id + (col.path || col.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(item => {
          return (
            <tr key={item._id}>
              {columns.map(col => {
                return (
                  <td key={this.createKey(item, col)}>
                    {this.renderCell(item, col)}
                  </td>
                );
              })}
            </tr>
          );
        })}
        <tr />
      </tbody>
    );
  }
}

export default TableBody;
