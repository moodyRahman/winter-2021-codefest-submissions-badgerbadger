import React, { useEffect, useState } from 'react';
import "./Filters.scss";

interface filterData {
  category: string;
  requirements: string[];
}

export default function Filters() {
  const [filters, setFilters] = useState<filterData[]>([]);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/filters")
      .then(res => res.json())
      .then((result) => {
        setFilters(result);
      })
  }, [])

  // changeHighlight(

  return (
    <div className="filters">
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(filters, null, 2)}
      </pre>
      <div className="filter-row">
        {filters.map((item, i) => (
          <div key={i}>
            <p className="header">{item.category}</p>
            {item.requirements.map((item) => (
              // <p onClick={() => changeHighlight()}>{item}</p>
              <p>{item}</p>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}