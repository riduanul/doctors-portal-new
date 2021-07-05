
import  React, {useState, createContext } from "react";
import {
  BrowserRouter as Router,

  Route, Switch
} from "react-router-dom";
import './App.css';
import Appointment from "./components/Appointment/Appointment";
import Home from "./components/Home/Home/Home";
import Login from "./components/Login/Login/Login";
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";


export const UserContext = createContext();



function App() {
  
  const [loggedInUser, setLoggedInUser] = useState();
  
  return (
    
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
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

    </UserContext.Provider>  );
}

export default App;
