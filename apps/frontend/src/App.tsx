
import Navbar from "./components/Navbar";
import Filters from "./components/Filters";
import Login from "./pages/Login"
import Register from "./pages/Register"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";
import { TokenContext } from "./context/TokenContext";


type TokenType = {
  token: string
  setToken: (token: string) => void
}


function App() {
  const [token, setToken] = useState<string>("");


  return (
    <TokenContext.Provider value={{token, setToken}}>

    <Router>

      <Navbar />

      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>

        <Route path="/">
          <Filters />
        </Route>

      </Switch>

    </Router>
    </TokenContext.Provider>

  );
}

export default App;
