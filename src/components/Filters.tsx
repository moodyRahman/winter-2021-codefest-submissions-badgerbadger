import React, { useEffect, useState } from 'react';
import "./Filters.scss";

export default function Filters() {
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/filters")
      .then(res => res.json())
      .then((result) => {
        setFilters(result);
      })
  }, [])

  const filterList = JSON.parse(filters);

  return (
    <div className="filters">
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(filters, null, 2)}
      </pre>
      {filterList.map((item, i) => (
        <tr key={i}>
          <td>{item.category}</td>
          <td>{item.requirement}</td>
        </tr>
      ))}
    </div>
  )
}