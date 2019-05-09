import React from "react";

const Checkbox = ({ name, label, onClick }) => {
  return (
    <div className="form-group form-check">
      <input
        type="checkbox"
        className="form-check-input"
        id={name}
        name={name}
        onClick={onClick}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
