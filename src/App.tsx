import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [rawdata, setRawData] = useState({});
  
  fetch('http://localhost:8080/rawdata')
    .then(response => response.json())
    .then(data => {
      console.log("HERE");
      console.log(data);
      setRawData(data);
    });
  

  return (
    <div className="App">
      {JSON.stringify(rawdata)}
    </div>
  );
}

export default App;
