import React, {useState, useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

function App() {
  // mock data 
  const [data] = useState([25, 50, 35, 15, 94, 10, 63, 19]);
  const svgRef = useRef();
    // write svg code here and anytime data changes
    // we're going to rerender that svg element
    // we're passing it as useRef so that d3 now 
    // has access to the dom
  useEffect(() => {
    // setting up svg (w and h)
    const w = 500;
    const h = 120;
    console.log(svgRef);
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible'); // hidden before
    // setting the scaling (range of the values of the chart that it will plot)
    console.log(svg);
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h, 0]);
    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);
    // setting the axes
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 1);
    const yAxis = d3.axisLeft(yScale)
      .ticks(5);
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0, ${h})`);
    svg.append('g')
      .call(yAxis);
    // setting up the data for the svg
    svg.selectAll('.line')
      .data([data])
      .join('path')
        .attr('d', d => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', 'black');

  }, [data]);

  return (
    <div className="App">
      <h1>D3 React App</h1>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
