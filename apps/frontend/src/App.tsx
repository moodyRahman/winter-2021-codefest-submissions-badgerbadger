import React, { useEffect, useState } from 'react';

import Navbar from "./components/Navbar";
import Filters from "./components/Filters";

import './App.css';

import { Class } from "@shared/interfaces/class";

function App() {
  const [rawdata, setRawData] = useState<Partial<Class>>({});

  useEffect(() => {
    fetch("http://localhost:8080/rawdata")
      .then(res => res.json())
      .then((result) => {
        setRawData(result);
      })
  }, [])


  return (
    <div className="App">
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(rawdata, null, 2)}
      </pre>
      <Navbar />
      <Filters />
    </div>
  );
}

export default App;