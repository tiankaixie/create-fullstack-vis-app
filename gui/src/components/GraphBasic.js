import * as React from "react";
import * as d3 from "d3";
import { findDOMNode } from "react-dom";

export default class GraphBasic extends React.Component {
  componentDidMount() {
    // console.log("mount");
    this.initializeCanvas();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.updateCanvas(nextProps);
  }

  /***
   * Graph simulation when dragging the node
   * @param simulation {Object} d3 simulation
   * @returns {Function} d3 function
   */
  drag = simulation => {
    function dragStarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = d.x;
      d.fy = d.y;
    }

    return d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
  };

  renderSvg(baseGroup, props) {
    const { canvasWidth, canvasHeight, data } = props;
    const circleRadius = 7;
    if (
      !data["graphBasic"] ||
      data["graphBasic"]["nodes"] === [] ||
      data["graphBasic"]["edges"] === []
    )
      return;

    let nodesData = data["graphBasic"]["nodes"];
    let edgesData = data["graphBasic"]["edges"];

    console.log(nodesData);
    /***
     * Graph simulation
     */
    const simulation = d3
      .forceSimulation(nodesData)
      .force(
        "link",
        d3
          .forceLink(edgesData)
          .id(d => {
            return d.node_id;
          })
          .distance(d => {
            // if (d.target.level === "inf") {
            //   return 500;
            // }
            //return d.target.level * 10;
            // return Math.exp(d.target.level) *5
            return 200;
          })
      )
      .force("charge", d3.forceManyBody().strength(-10))
      .force("center", d3.forceCenter(canvasWidth / 2.6, canvasHeight / 2))
      .force("collision", d3.forceCollide(circleRadius + 5));

    const svg = baseGroup;

    /*****
     * Drawing Graphs
     */
    svg
      .append("defs")
      .append("marker")
      .attr("id", "arrowhead")
      .attr("markerUnits", "userSpaceOnUse")
      .attr("viewBox", "-0 -5 10 10")
      .attr("refX", 20)
      .attr("refY", 0)
      .attr("orient", "auto")
      .attr("markerWidth", 8)
      .attr("markerHeight", 8)
      .attr("xoverflow", "visible")
      .append("svg:path")
      .attr("d", "M 0,-5 L 10 ,0 L 0,5")
      .attr("fill", "black")
      .attr("opacity", 0.3)
      .style("stroke", "none");

    const link = svg
      .append("g")
      .attr("class", "edges")
      .attr("stroke-opacity", 0.3)
      .selectAll(".edges")
      .data(edgesData)
      .enter()
      .append("path")
      .attr("stroke-width", d => {
        return 1;
      })
      .attr("fill", "none")
      .attr("stroke", d => {
        return "black";
      })
      .style("stroke-dasharray", d => {
        if (d.target.level === "inf") {
          return "3, 3";
        }
      })
      .attr("marker-end", d => {
        return "url(#arrowhead)";
      });

    const node = svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(nodesData)
      .enter()
      .append("g");

    const circles = node
      .append("circle")
      .attr("id", d => "node-" + d.node_id)
      .attr("fill", d => {
        return "white";
      })
      .attr("stroke", d => {
        return "black";
      })
      .attr("stroke-width", d => {
        return 1;
      })
      .attr("r", d => {
        return circleRadius;
      })
      .call(this.drag(simulation))
      .on("click", d => {
        d.fx = null;
        d.fy = null;
      });

    const text = node.append("text").attr("text", d => d.node_id);

    simulation.on("tick", () => {
      // direct
      // link
      //   .attr("x1", d => d.source.x)
      //   .attr("y1", d => d.source.y)
      //
      //   .attr("x2", d => d.target.x)
      //   .attr("y2", d => d.target.y);

      link.attr("d", positionLink);

      circles.attr("cx", d => d.x).attr("cy", d => d.y);
    });

    function zoomed() {
      svg.attr("transform", d3.event.transform);
    }

    // links are drawn as curved paths between nodes,
    // through the intermediate nodes
    function positionLink(d) {
      let offset = 30;

      let midpoint_x = (d.source.x + d.target.x) / 2;
      let midpoint_y = (d.source.y + d.target.y) / 2;

      let dx = d.target.x - d.source.x;
      let dy = d.target.y - d.source.y;

      let normalise = Math.sqrt(dx * dx + dy * dy);

      let offSetX = midpoint_x + offset * (dy / normalise);
      let offSetY = midpoint_y - offset * (dx / normalise);

      return (
        "M" +
        d.source.x +
        "," +
        d.source.y +
        "S" +
        offSetX +
        "," +
        offSetY +
        " " +
        d.target.x +
        "," +
        d.target.y
      );
    }

    const svgRoot = d3.select("#graph-basic");

    svgRoot.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [canvasWidth, canvasHeight]
        ])
        .scaleExtent([0, 8])
        .on("zoom", zoomed)
        .filter(function() {
          switch (d3.event.type) {
            case "mousedown":
              return d3.event.button === 1;
            case "wheel":
              return d3.event.button === 0;
            default:
              return false;
          }
        })
    );
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return false;
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
    let baseGroup = d3.select(thisDOM).select("#graph-basic-base");
    baseGroup.remove();
    baseGroup = svgRoot.append("g").attr("id", "graph-basic-base");
    this.renderSvg(baseGroup, props);
  }

  render() {
    const { canvasHeight, canvasWidth } = this.props;
    const svgID = "graph-basic";
    const svgIDBase = "graph-basic-base";
    return (
      <svg id={svgID} style={{ height: canvasHeight, width: canvasWidth }}>
        <g id={svgIDBase} style={{ height: "100%", width: "100%" }} />
      </svg>
    );
  }
}
