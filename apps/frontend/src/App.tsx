
import Navbar from "./components/Navbar";
import Search from "./pages/Search";
import Login from "./pages/Login"
import Register from "./pages/Register"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "./context/TokenContext";


function App() {
  const [token, setToken] = useState<string>("");
  const [loggedinUser, setLoggedin] = useState<string>("");


  return (
    <TokenContext.Provider value={{ loggedinUser, setLoggedin, token, setToken}}>

    <Router>

      <Navbar />
      {token === "" &&        // if user is not logged in, use the following routes 
          <Switch>
            
            <Route path="/register">
              <Register />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <Login />
            </Route>

          </Switch>
      }

        {token !== "" &&        // if the user is logged in, use these routes
          <Switch>

            <Route path="/search">
              <Search />
            </Route>

          <Route path="/">
            THE USER IS LOGGED IN AND USING THE LOGGED IN SWITCHES
            this route hasn't been written yet o_O
          </Route>

          </Switch>
        }




    </Router>
    </TokenContext.Provider>

  );
}

export default App;
