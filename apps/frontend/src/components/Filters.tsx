import React, { useContext, useEffect, useState } from 'react';
import "./Filters.scss";
import { FilterData } from "@shared/interfaces/filter-data";
import { TokenContext } from "../context/TokenContext"

export default function Filters()
{
  const [filters, setFilters] = useState<FilterData[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);
  const { loggedinUser, setLoggedin, token, setToken } = useContext(TokenContext);

  const allClassesReqs = [
    {"English Composition 1":["engl150", "engl250", "afprl150"]},
    {"English Composition 2":["engl350", "geog201"]},

    {"Mathematical and Quantitative Reasoning":["math150", "math 265"]},
    {"Life and Physical Sciences":["bio101"]},

    {"World Cultures and Global Issues":["span202"]},
    {"US Experiences in Its Diversity":["geog201"]},
    {"Creative Expression":["engl150"]},

    {"Individual and Society":["soc101", "asian201", "film101"]},
    {"Scientific World":["math150"]},

    {"Group A: Non-European Societies":["afprl150", "span202"]},
    {"Group B: Groups in the USA":["soc101", "asian201"]},
    {"Group C: Women, Gender and Sexual Orientation":["film101"]},
    {"Group D: European Societies":["gemn135"]}
  ]

  const allClasses = [
    "engl150", "engl250", "engl350",
    "afprl150",
    "geog201",
    "math150", "math265",
    "bio101",
    "span202",
    "soc101",
    "asian201", 
    "film101", 
    "gemn135"

  ]

  useEffect(() => {
    fetch("http://localhost:8080/filters")
      .then(res => res.json())
      .then((result) => {
        setFilters(result);
      })
  }, [])

  

  return (
    <>
    <div className="filters">
      {/* <h1>logged in as: {loggedinUser}</h1>  */}
      {JSON.stringify(allClassesReqs, null, 2)}
    <pre style={{ textAlign: "left" }}>


      {JSON.stringify(filters, null, 2)}
    </pre>

    <div className="classes">
      <ul>
        {allClasses.map((item, i) => (
          <div style={{visibility:'visible'}} 
            onClick={(e) => {
              
              console.log(e.currentTarget.style)
            }} >

          {item} <br />
          </div>
        ))
        }
      </ul>
    </div>

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
  </>
)
}
