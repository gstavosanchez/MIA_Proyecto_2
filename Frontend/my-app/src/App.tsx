import React from "react";
import { BrowserRouter, Route,Switch } from 'react-router-dom'
// Bootstrap
import "bootswatch/dist/journal/bootstrap.min.css";
// ToastContainer
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// Components
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Register/SignUp";
import { Index } from './components/Index/Index'
import { Dashboard } from "./components/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="container p-4">
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/signin" exact component={Login} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/dashboard" exact component={Dashboard} />
        </Switch>
      </div>
      <ToastContainer/>
    </BrowserRouter>
  );
}

export default App;
