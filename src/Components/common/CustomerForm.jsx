import React from "react";
import Form from "./form";
import Joi from "joi-browser";
import { saveCustomer } from "../../services/customerService";

class CustomerForm extends Form {
  state = {
    data: { name: "", phone: "", isGold: false },
    errors: {},
    genres: []
  };

  schema = {
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .label("Name"),
    phone: Joi.number()
      .required()
      .label("Phone Number"),
    isGold: Joi.boolean()
  };

  doSubmit = async () => {
    try {
      const customer = { ...this.state.data };
      await saveCustomer(customer);
      this.props.history.push("/customers");
    } catch (error) {
      if (error.response && error.status === 400) {
        const errors = { ...this.state.errors };
        errors.name = error.response;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="row">
        <div className="col col-sm-6 col-centered">
          <h3>Customer Form</h3>
          <hr />
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("name", "Name")}
            {this.renderInput("phone", "Phone Number")}
            {this.renderCheckbox("isGold", "Gold Membership?")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default CustomerForm;
