import * as React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { updateBrushClusterSelected, updateLassoSelected } from "../actions";
import { regularGrey } from "../constants/colorScheme";

const mapStateToProps = state => {
    return {
        input: state.input,
        output: state.output,
        clusterList: state.ui.clusterList,
        clusterSliderUI: state.ui.clusterSliderUI
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateLassoSelected: selectedNodes =>
            dispatch(updateLassoSelected(selectedNodes)),
        updateBrushClusterSelected: selectedSet =>
            dispatch(updateBrushClusterSelected(selectedSet))
    };
};

class MiningResultDensity extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    componentDidMount() {
        const canvasWidth = this.container.current.getBoundingClientRect()
            .width;
        d3.select("#mining-result-density").style("width", canvasWidth);
        this.initializeCanvas();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const { miningResultControl } = this.props;
        const { output } = nextProps;
        if (Object.keys(output.res).length === 0) return;
        // 2d resg
        if (Array.isArray(Object.values(output.res)[0]["res"])) {
            if (miningResultControl === nextProps.miningResultControl) {
                this.updateCanvas(nextProps);
            } else {
                if (nextProps.miningResultControl === "zoom") {
                    d3.select("#zoomRect2").attr("display", "block");
                } else {
                    d3.select("#zoomRect2").attr("display", "none");
                }
            }
        }
        // 1d res
        else {
            this.updateCanvas(nextProps);
        }
    }

    renderScatterPlot(baseGroup, props) {
        let { canvasHeight, output, updateBrushClusterSelected } = props;
        const height = canvasHeight;
        const width = this.container.current.getBoundingClientRect().width;

        let padding = 40;

        if (Object.keys(output.similarity).length === 0) {
            return;
        }
        const dataset = output.similarity;
        //scale function
        let xScale = d3
            .scaleLinear()
            .domain([0, d3.max(dataset, d => d[0])])
            .range([padding, width - padding * 2]);

        let yScale = d3
            .scaleLinear()
            .domain([0, d3.max(dataset, d => d[1])])
            .range([height - padding, padding]);

        // Add a clipPath: everything out of this area won't be drawn.
        baseGroup
            .append("defs")
            .append("SVG:clipPath")
            .attr("id", "clip2")
            .append("SVG:rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0);

        // Create the scatter letiable: where both the circles and the brush take place
        let scatter = baseGroup.append("g").attr("clip-path", "url(#clip)");

        const circles = scatter
            .selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("id", (d, i) => "mcircle" + Object.keys(output.res)[i])
            .attr("class", "miningPoints")
            .attr("cx", d => xScale(d[0]))
            .attr("cy", d => yScale(d[1]))
            .attr("r", 5)
            .attr("fill", "#e0e0e0")
            .attr("stroke", "#777777")
            .attr("stroke-width", 2);

        // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom
        let zoom = d3
            .zoom()
            .scaleExtent([0.5, 2000]) // This control how much you can unzoom (x0.5) and zoom (x20)
            .extent([
                [0, 0],
                [width, height]
            ])
            .on("zoom", updateChart);

        // This add an invisible rect on top of the chart area. This rect can recover pointer events: necessary to understand when the user zoom
        baseGroup
            .append("rect")
            .attr("id", "zoomRect2")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr("transform", "translate(" + padding + "," + padding + ")")
            .call(zoom);
        // now the user can zoom and it will trigger the function called updateChart

        // A function that updates the chart when the user zoom and thus new boundaries are available
        function updateChart() {
            // recover the new scale
            let newX = d3.event.transform.rescaleX(xScale);
            let newY = d3.event.transform.rescaleY(yScale);

            // update axes with these new boundaries
            // xAxis.call(d3.axisBottom(newX));
            // yAxis.call(d3.axisLeft(newY));

            // update circle position
            scatter
                .selectAll("circle")
                .attr("cx", d => newX(d[0]))
                .attr("cy", d => newY(d[1]));
        }
    }

    renderSvg(baseGroup, props) {
        const { output } = props;
        if (Object.keys(output.res).length !== 0) {
            // this.renderScatterPlot(baseGroup, props);
            if (Array.isArray(Object.values(output.res)[0]["res"])) {
                this.renderScatterPlot(baseGroup, props);
            } else {
                this.renderHistogram(baseGroup, props);
            }
        }
    }

    initializeCanvas() {
        this.renderSvg(this.props);
    }

    updateCanvas(props) {
        const { svgID } = props;
        const svgRoot = d3.select("#" + svgID);
        svgRoot.select("g").remove();
        svgRoot.append("g").attr("id", svgID + "-base");
        this.renderSvg(props);
    }

    render() {
        const { svgID, canvasHeight } = this.props;
        return (
            <div ref={this.container}>
                <svg id={svgID} height={canvasHeight}>
                    <g id={svgID + "-base"} height="100%" width="100%" />
                </svg>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MiningResultDensity);
