import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  
  const [rawdata, setRawData] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:8080/rawdata")
      .then(res => res.json())
      .then( (result) => {
          setRawData(result);
        }
      )
  }, [])
  

  return (
    <div className="App">
      <pre style={{textAlign:"left"}}>

      {JSON.stringify(rawdata, null, 2)}
      </pre>
    </div>
  );
}

export default App;
