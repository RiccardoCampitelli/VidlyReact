import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Movies from "./Components/movies";
import NavBar from "./Components/common/NavBar";
import Customers from "./Components/customers";
import Rentals from "./Components/rentals";
import NotFound from "./Components/not-found";
import MovieForm from "./Components/MovieForm";
import LoginForm from "./Components/loginForm";
import "./App.css";
import RegisterForm from "./Components/registerForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/register" component={RegisterForm} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
