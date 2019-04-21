import React from "react";

// List items  - allSelector - function to call

const ListFilter = props => {
  return (
    <ul className="list-group">
      <li
        className={
          props.activeItem == null
            ? "list-group-item active"
            : "list-group-item"
        }
        onClick={() => props.genreSelect(null)}
      >
        {props.allSelector}
      </li>
      {props.listItems.map((item, index) => {
        return (
          <li
            key={index}
            className={
              props.activeItem === item
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => props.genreSelect(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default ListFilter;
