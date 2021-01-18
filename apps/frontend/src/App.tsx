
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

function App() {
  // const [rawdata, setRawData] = useState<Partial<Class>>({});

  // useEffect(() => {
  //   fetch("http://localhost:8080/rawdata")
  //     .then(res => res.json())
  //     .then((result) => {
  //       setRawData(result);
  //     })
  // }, [])


  return (
    <Router>

      <Navbar />

      <Switch>
        <Route path="/about">
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

  );
}

export default App;
