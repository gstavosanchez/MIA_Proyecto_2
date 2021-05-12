import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// Material UI
import 'fontsource-roboto';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
// ToastContainer
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Components
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./components/Login/Login";
import { SignUp } from "./components/Register/SignUp";
import { Index } from "./components/Index/Index";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { UserState } from "./context/user/UserState";
import { BuyMembresia } from "./components/Buy/BuyMembresia";
import { EventCalendar } from "./components/Event/EventCalendar";
import { MyProfile } from "./components/Profile/MyProfile";
import { SportList } from "./components/Deporte/SportList";
import { Result } from "./components/Result/Result";
const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserState>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/buy-member" exact component={BuyMembresia} />
            <Route path="/profile" exact component={MyProfile} />
            <Route path="/calendar/:id" exact component={EventCalendar} />
            <Route path="/sport" exact component={SportList} />
            <Route path="/result" exact component={Result} />
          </Switch>
        </UserState>
      </ThemeProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
