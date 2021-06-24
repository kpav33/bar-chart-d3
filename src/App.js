import "./styles.scss";
import {
  select,
  axisBottom,
  axisRight,
  scaleLinear,
  scaleBand,
  scaleTime,
  max,
} from "d3";

import React, { useState, useEffect, useRef } from "react";

function App() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [effort, setEffort] = useState([]);
  const svgRef = useRef();

  const dataUrl =
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  console.log(data);
  console.log(effort);
  console.log(years);

  useEffect(() => {
    fetch(dataUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data.data.map((value) => value[1]));
        setYears(data.data.map((value) => value[0]));
      });
  }, []);

  useEffect(() => {
    // console.log(svgRef);
    const svg = select(svgRef.current).attr("width", 500).attr("height", 500);

    // scaleTime
    const xScale = scaleBand()
      .domain(data.map((d, index) => index))
      .range([0, 500]);

    /*const xScale = scaleLinear()
      .domain([0, max(data, (d) => d)])
      .range([0, 500]);*/

    const yScale = scaleLinear()
      .domain([0, max(data, (d) => d)])
      .range([500, 0]);

    const xAxis = axisBottom(xScale);
    svg.select(".x-axis").style("transform", "translateY(500px)").call(xAxis);

    const yAxis = axisRight(yScale);
    svg.select(".y-axis").style("transform", "translateX(500px)").call(yAxis);

    svg
      .selectAll(".bar")
      .data(data)
      .join("rect")
      .attr("class", "bar")
      .attr("x", (d, index) => xScale(index))
      .attr("y", yScale)
      .attr("width", xScale.bandwidth())
      .attr("height", (d, index) => 500 - yScale(d));
  }, [data]);

  return (
    <>
      <h1 id="title">Title</h1>
      <svg ref={svgRef}>
        <g className="x-axis" id="x-axis" />
        <g className="y-axis" id="y-axis" />
      </svg>
      <button onClick={() => setData(data.map((value) => value + 5))}>
        Update Data
      </button>
      <button onClick={() => setData(data.filter((value) => value < 35))}>
        Filter Data
      </button>
    </>
  );

  /*const [data, setData] = useState([])
  const ref = useRef()

  console.log(data)
  console.log(ref)

  const dataUrl = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

  const temperatureData = [ 8, 5, 13, 9, 12 ]
  d3.select(ref.current)
        .selectAll("h2")
        .data(temperatureData)
        .enter()
            .append("h2")
            .text("New Temperature")

  
  useEffect(() => {
    fetch(dataUrl)
      .then(response => response.json())
      .then(data => {
        setData(data.data)
      })
  }, []);
  
  return (
    <div className="app">
      <div className="panel">
        <h1>Hello World</h1>
      </div>
      <div id="myDiv" ref={ref}></div>
    </div>
  );
  return ( <BarChart /> )*/
}

export default App;
