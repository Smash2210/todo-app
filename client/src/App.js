import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";



function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props}></Login>} />
        <Route exact path="/dashboard" render={() => <Dashboard></Dashboard>} />
        <Route path="/*" component={() => <Redirect to={'/login'} />} />
      </Switch>
    </Router>
  );
}

export default App;
