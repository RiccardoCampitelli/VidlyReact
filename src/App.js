import React, { Component } from "react";
import "./App.css";
import Movies from "./Components/movies";
import NavBar from "./Components/common/NavBar";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./Components/customers";
import Rentals from "./Components/rentals";
import NotFound from "./Components/not-found";
import MovieForm from "./Components/MovieForm";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
