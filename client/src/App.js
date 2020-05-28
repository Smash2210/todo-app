import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";


class App extends React.Component {

  constructor(props) {
    super(props);
    const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
    this.state = {
      isLoggedIn
    }
  }

  loggedIn = () => {
    console.log('login func');
    this.setState({ isLoggedIn: true });
    console.log(this.state);
  }

  loggedOut = () => {
    console.log('logout func');
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <Router>
        <Header isLoggedIn={this.state.isLoggedIn} logout={() => this.loggedOut()}></Header>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} isLoggedIn={this.state.isLoggedIn} loggedIn={() => this.loggedIn()}></Login>} />
          <Route exact path="/dashboard" render={(props) => <Dashboard {...props} isLoggedIn={this.state.isLoggedIn}></Dashboard>} />
          <Route path="/*" component={() => <Redirect to={'/login'} />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
