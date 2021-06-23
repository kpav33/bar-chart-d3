import './styles.scss';
import * as d3 from "d3"
import BarChart from './BarChart'

import React, {useState, useEffect, useRef} from "react"


function App() {
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
  );*/
  return ( <BarChart /> )

}

export default App;
