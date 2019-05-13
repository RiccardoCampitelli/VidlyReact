import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";
import Checkbox from "./checkbox";
import { Typeahead } from "react-bootstrap-typeahead";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const { data } = this.state;

    const result = Joi.validate(data, this.schema, { abortEarly: false });

    const { error } = result;

    if (!error) return null;

    const errors = {};

    error.details.map(item => {
      return (errors[item.path[0]] = item.message);
    });

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = event => {
    event.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleClick = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    data[input.name] = input.checked;
    this.setState({ data });
  };

  handleTypeahead = name => value => {
    const state = { ...this.state };
    /*   const obj = state[name.field]; */
    state[name.field].push(...value);
    this.setState({ ...state });
  };

  renderCheckbox = (name, label) => {
    return <Checkbox name={name} label={label} onClick={this.handleClick} />;
  };

  renderButton = label => {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  handleTypeaheadKeyDown = e => {
    if (e.keyCode === 13) {
      e.currentTarget.value = "";
    }
  };

  handleTypeaheadChange = props => value => {
    props.handler(value);

    const instance = this[props.name].getInstance();
    instance.clear();
  };

  renderTypeahead = ({
    options,
    placeholder,
    labelkey,
    name,
    handleTypeahead,
    autofocus,
    disabled
  }) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{name}</label>
        <Typeahead
          ref={ref => (this[name] = ref)}
          autoFocus={autofocus}
          disabled={disabled}
          placeholder={placeholder}
          id={labelkey}
          labelKey={labelkey}
          minLength={3}
          onChange={this.handleTypeaheadChange({
            handler: handleTypeahead,
            name: name
          })}
          options={options}
          selectHintOnEnter={true}
        />
      </div>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (name, label, options) => {
    const { data, errors } = this.state;

    return (
      <Select
        onChange={this.handleChange}
        name={name}
        options={options}
        error={errors[name]}
        label={label}
        selected={data.genre}
      />
    );
  };
}

export default Form;
