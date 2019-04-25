import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {}
  };
  schema = {
    username: Joi.string()
      .email()
      .label("Username")
      .required(),
    password: Joi.string()
      .min(5)
      .label("Password")
      .required(),
    name: Joi.string()
      .min(5)
      .label("Name")
      .required()
  };

  doSubmit = () => {
    console.log("Submitted");
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
