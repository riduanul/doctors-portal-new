import { default as React } from "react";
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Appointment from "./components/Appointment/Appointment";
import Home from "./components/Home/Home/Home";
import Login from "./components/Login/Login/Login";


function App() {
  return (
    <Router>
      <Switch>
       
        <Route path="/appointment">
          <Appointment></Appointment>
        </Route>
        <Route path="/login">
          <Login></Login>
        </Route>
        <Route exact Path="/">
          <Home></Home>
        </Route>
      </Switch>
        
    </Router>
  );
}

export default App;
