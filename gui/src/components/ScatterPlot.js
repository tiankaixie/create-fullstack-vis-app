import * as React from "react";
import * as d3 from "d3";
import { findDOMNode } from "react-dom";

export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
  }
    componentDidMount() {
    // console.log("mount");
    this.initializeCanvas();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateCanvas(nextProps);
  }


  renderSvg(baseGroup, props) {
    let { canvasHeight, canvasWidth } = props;
    let w = canvasWidth;
    let h = canvasHeight;
    let padding = 40;
    let dataset = [];
    dataset.push([46, 32]);
    dataset.push([47, 31]);
    dataset.push([51, 41]);
    dataset.push([52, 38]);
    dataset.push([38, 29]);

    //scale function
    let xScale = d3
      .scaleLinear()
      //.domain(["Alabama","Alaska","Arizona","Arkansas","California"])
      .domain([
        0,
        d3.max(dataset, function(d) {
          return d[0];
        })
      ])
      //.range([padding, w-padding * 2]);
      .range([padding, w - padding * 2]);

    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, function(d) {
          return d[1];
        })
      ])
      //.range([padding, w-padding * 2]);
      .range([h - padding, padding]);

    let xAxis = d3
      .axisBottom()
      .scale(xScale)
      .ticks(5);

    let yAxis = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5);

    //create svg element
    let svg = baseGroup;

    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", function(d) {
        return xScale(d[0]);
      })
      .attr("cy", function(d) {
        return h - yScale(d[1]);
      })
      .attr("r", 5)
      .attr("fill", "green");

    //x axis
    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);

    //y axis
    svg
      .append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);
  }
  /**
   * Entry point
   * @returns None
   */
  initializeCanvas() {
    const { removedID } = this.props;

    const baseGroup = d3.select("#graph-basic-base");
    this.renderSvg(baseGroup, this.props);

    baseGroup.raise();
  }

  /***
   * When updating the props, according canvas needs to be updated.
   * Remove original canvas and draw a new one.
   * @param props {Object} from React.Component
   */
  updateCanvas(props) {
    const thisDOM = findDOMNode(this);
    const svgRoot = d3.select(thisDOM);
    let baseGroup = d3.select(thisDOM).select("#scatter-plot-base");
    baseGroup.remove();
    baseGroup = svgRoot.append("g").attr("id", "scatter-plot-base");
    this.renderSvg(baseGroup, props);
  }

  render() {
    const { canvasHeight, canvasWidth } = this.props;
    const svgID = "scatter-plot";
    const svgIDBase = "scatter-plot-base";
    return (
      <svg id={svgID} style={{ height: canvasHeight, width: canvasWidth }}>
        <g id={svgIDBase} style={{ height: "100%", width: "100%" }} />
      </svg>
    );
  }
}
