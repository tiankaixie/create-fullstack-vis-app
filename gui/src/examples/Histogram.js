import * as React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";
import { updateBrushClusterSelected, updateLassoSelected } from "../actions";
import { regularGrey } from "../constants/colorScheme";

const mapStateToProps = state => {
    return {
        // input: state.input,
        // output: state.output,
        // clusterList: state.ui.clusterList,
        // clusterSliderUI: state.ui.clusterSliderUI
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // updateLassoSelected: selectedNodes =>
        //     dispatch(updateLassoSelected(selectedNodes)),
        // updateBrushClusterSelected: selectedSet =>
        //     dispatch(updateBrushClusterSelected(selectedSet))
    };
};

export default class Histogram extends React.Component {
    constructor(props) {
        super(props);
        this.container = React.createRef();
    }

    componentDidMount() {
        this.initializeCanvas();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.updateCanvas(nextProps);
    }

    renderSvg(props) {
        const { svgID, canvasHeight } = props;
        console.log(props);
        const data = {
            0: 5.1,
            1: 4.9,
            2: 8.6,
            3: 6.2,
            4: 5.1,
            5: 7.1,
            6: 6.7,
            7: 6.1,
            8: 5,
            9: 5,
            10: 5.2,
            11: 7.9,
            12: 11.1,
            13: 5.9,
            14: 5.5,
            15: 5.6,
            16: 6.5,
            17: 7.7,
            18: 5.7,
            19: 6.7,
            20: 5.7,
            21: 4.8,
            22: 5.6,
            23: 9.5,
            24: 5.7,
            25: 4.7,
            26: 6.3,
            27: 5.7,
            28: 6.6,
            29: 5.5,
            30: 5.4,
            31: 9.3,
            32: 7.6,
            33: 6.3,
            34: 5.6,
            35: 5.9,
            36: 5.5,
            37: 5.2,
            38: 6,
            39: 6.4,
            40: 4.9,
            41: 5,
            42: 10.3,
            43: 7.2,
            44: 4.9,
            45: 6.9,
            46: 6.1,
            47: 5.1,
            48: 6.5,
            49: 8.6,
            50: 5.6
        };
        const margin = { top: 24, right: 25, bottom: 30, left: 45 };
        const height = canvasHeight;
        const width =
            this.container.current.getBoundingClientRect().width * 0.91;
        d3.select("#" + svgID).style("width", width);
        console.log(width);
        const svg = d3.select("#" + svgID + "-base");
        let xScale = d3
            .scaleBand()
            .domain(Object.keys(data))
            .range([margin.left, width - margin.right]);

        let yScale = d3
            .scaleLinear()
            .domain([0, d3.max(Object.values(data))])
            .range([height - margin.bottom, margin.top]);

        svg.selectAll(".bar")
            .data(Object.keys(data))
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return xScale(d);
            })
            .attr("width", xScale.bandwidth())
            .attr("y", d => yScale(data[d]))
            .attr("height", function(d) {
                return height - yScale(data[d]) - margin.bottom;
            })
            .attr("fill", regularGrey)
            .attr("opacity", 1);

        // let brush = d3
        //     .brushX() // Add the brush feature using the d3.brush function
        //     .extent([
        //         [margin.left, margin.top],
        //         [width - margin.right, height - margin.bottom]
        //     ]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        //     .on("end", brushed);
        //
        // function brushed() {
        //     const extent = d3.brushSelection(this);
        //
        //     function isIncluded(i) {
        //         return (
        //             xScale(((i + 1) * bandwidth).toFixed(4)) >= extent[0] &&
        //             xScale(((i + 1) * bandwidth).toFixed(4)) <= extent[1]
        //         );
        //     }
        //
        //     const filteredData = Object.keys(output.res).filter(key => {
        //         let index = Math.ceil(output.res[key].res / bandwidth);
        //         if (index < 0) {
        //             index = 0;
        //         } else if (index >= k) {
        //             index = k - 1;
        //         }
        //         return isIncluded(index);
        //     });

        //}
        //
        // svg.append("g")
        //     .attr("class", "overview-brush")
        //     .call(brush);

        svg.append("g")
            .attr(
                "transform",
                "translate(" +
                    (Number(width) - 50) +
                    "," +
                    (Number(height)) +
                    ")"
            )
            .append("text")
            .attr("font-size", "0.6rem")
            .text("X label");

        svg.append("g")
            .attr(
                "transform",
                "translate(" + 0 + "," + Number(margin.top - 10) + ")"
            )
            .append("text")
            .attr("font-size", "0.6rem")
            .text("Count");

        svg.append("g")
            .attr(
                "transform",
                "translate(0," + (Number(height) - Number(margin.bottom)) + ")"
            )
            .call(
                d3.axisBottom(xScale).tickFormat((t, i) => {
                    if (i % 2 === 0) {
                        return t;
                    } else {
                        return "";
                    }
                })
            )
            .selectAll("text")
            .attr("class", "label-text")
            .attr("font-size", "0.6rem")
            .style("text-anchor", "end");

        svg.append("g")
            .attr("transform", "translate(" + margin.left + ",0)")
            .call(d3.axisLeft(yScale).ticks(6));
    }

    initializeCanvas() {
        console.log(this.props);
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
        console.log(this.props);
        return (
            <div ref={this.container}>
                <svg id={svgID} height={canvasHeight}>
                    <g id={svgID + "-base"} />
                </svg>
            </div>
        );
    }
}

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Histogram);
