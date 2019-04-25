import React from "react";

const Select = ({ name, label, error, options, selected, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        <option value="" />
        {options.map(o => (
          <option
            key={o}
            value={o}
            selected={o === selected ? "selected" : null}
          >
            {o}
          </option>
        ))}
      </select>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
