import React from "react";

const Select = ({ name, label, error, options, selected, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        <option value="" />

        {options.map(o => (
          <option
            key={o._id}
            value={o.name}
            selected={o.name === selected ? "selected" : null}
          >
            {o.name}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
