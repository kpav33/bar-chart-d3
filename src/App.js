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
} from "d3";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [dataObject, setDataObject] = useState([]);
  const svgRef = useRef();

  const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.map((value) => value[1]));
        setYears(data.data.map((value) => new Date(value[0])));
        setDataObject(
          data.data.map((d) => ({
            date: new Date(d[0]),
            value: d[1],
          }))
        );
      });
  }, []);

  console.log(years);
  console.log(dataObject);

  useEffect(() => {
    // console.log(svgRef);
    const svg = select(svgRef.current).attr("width", 900).attr("height", 500);

    // scaleTime
    const xScale = scaleTime()
      .domain([min(years, (d) => d), max(data, (d) => d)])
      .range([0, 900]);

    /*const xScale = scaleLinear()
      .domain([0, max(data, (d) => d)])
      .range([0, 500]);*/

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d)])
      .range([500, 0]);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").style("transform", "translateY(500px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(900px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(d))
      .attr("y", yScale)
      .attr("width", (d, index) => xScale(d))
      .attr("height", (d, index) => 500 - yScale(d));
  }, [data]);

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
