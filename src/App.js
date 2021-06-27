import "./styles.scss";
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  scaleTime,
  max,
  min,
  format,
  axisLeft,
} from "d3";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [dataObject, setDataObject] = useState([]);
  const svgRef = useRef();

  // Source
  const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  // Dimensions
  const width = 800;
  const height = 500;
  const padding = 60;

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        //setData(data.data.map((value) => value[1]));
        //setYears(data.data.map((value) => new Date(value[0])));
        setData(data.data);
        setDataObject(
          data.data.map((d) => ({
            date: new Date(d[0]),
            value: d[1],
          }))
        );
      });
  }, []);

  //console.log(years);
  console.log(dataObject);
  console.log(data);

  useEffect(() => {
    // console.log(svgRef);
    const svg = select(svgRef.current)
      .attr("width", width)
      .attr("height", height);
  }, [dataObject]);

  return (
    <>
      <h1 id="title">Title</h1>
      <svg ref={svgRef}>
        <g className="x-axis" id="x-axis" />
        <g className="y-axis" id="y-axis" />
      </svg>
    </>
  );
}

export default App;
