import React, { useContext, useEffect, useState } from 'react';
import "./Filters.scss";
import { FilterData } from "@shared/interfaces/filter-data";
import { TokenContext } from "../context/TokenContext"

export default function Filters()
{
  const [filters, setFilters] = useState<FilterData[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);
  const { loggedinUser, setLoggedin, token, setToken } = useContext(TokenContext);
  
  useEffect(() => {
    fetch("http://localhost:8080/filters")
      .then(res => res.json())
      .then((result) => {
        setFilters(result);
      })
  }, [])

  

  return (
    <div className="filters">
      <h1>logged in as: {loggedinUser}</h1> 
    <pre style={{ textAlign: "left" }}>


      {JSON.stringify(filters, null, 2)}
    </pre>
    <div className="filter-row">
      {filters.map((item, i) => (
        <div key={i}>
          <p className="header">{item.category}</p>
          {/* TODO: if necessary, make the filters into their own components */}
          {item.requirements.map((item, i) => (
            <p key={i} onClick={() => {
              if (highlight.includes(item)){
                setHighlight(highlight => highlight.filter(elem => elem !== item));
              }
              else {
                setHighlight(highlight => [...highlight, item])
              }
            }} className={highlight.includes(item) ? "selected" : "deselected"}>{item}</p>
            ))}
            {/* {console.log(highlight)} */}
        </div>
      ))}
    </div>
  </div>
)
}
