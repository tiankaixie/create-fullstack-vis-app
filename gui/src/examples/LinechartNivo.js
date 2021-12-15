// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/line
import { ResponsiveLine } from "@nivo/line";
import { connect } from "react-redux";
import * as React from "react";

const mapStateToProps = (state) => {
  return {
    data: state.data.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // updateLassoSelected: selectedNodes =>
    //     dispatch(updateLassoSelected(selectedNodes)),
    // updateBrushClusterSelected: selectedSet =>
    //     dispatch(updateBrushClusterSelected(selectedSet))
  };
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

// class LinechartNivo extends React.Component {
//   constructor(props) {
//     super(props);
//     this.container = React.createRef();
//   }

//   // componentDidMount() {
//   //   this.initializeCanvas();
//   // }

//   // componentWillReceiveProps(nextProps, nextContext) {
//   //   this.updateCanvas(nextProps);
//   // }
//   render() {
//     const { data } = this.props;
//     console.group("LinechartNivo");
//     console.log(data);
//     console.groupEnd();
//     return (
//       <div ref={this.container} style={{ height: 500, width: 900 }}>
//         <ResponsiveLine
//           data={data}
//           margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//           xScale={{ type: "point" }}
//           yScale={{
//             type: "linear",
//             min: "auto",
//             max: "auto",
//             stacked: false,
//             reverse: false,
//           }}
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             orient: "bottom",
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: "",
//             legendOffset: 36,
//             legendPosition: "middle",
//           }}
//           axisLeft={{
//             orient: "left",
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: "",
//             legendOffset: -40,
//             legendPosition: "middle",
//           }}
//           colors={{ scheme: "nivo" }}
//           pointSize={10}
//           pointColor={{ theme: "background" }}
//           pointBorderWidth={2}
//           pointBorderColor={{ from: "serieColor" }}
//           pointLabel="y"
//           pointLabelYOffset={-12}
//           useMesh={true}
//           legends={[
//             {
//               anchor: "bottom-right",
//               direction: "column",
//               justify: false,
//               translateX: 100,
//               translateY: 0,
//               itemsSpacing: 0,
//               itemDirection: "left-to-right",
//               itemWidth: 80,
//               itemHeight: 20,
//               itemOpacity: 0.75,
//               symbolSize: 12,
//               symbolShape: "circle",
//               symbolBorderColor: "rgba(0, 0, 0, .5)",
//               effects: [
//                 {
//                   on: "hover",
//                   style: {
//                     itemBackground: "rgba(0, 0, 0, .03)",
//                     itemOpacity: 1,
//                   },
//                 },
//               ],
//             },
//           ]}
//         />
//       </div>
//     );
//   }
// }

const LinechartNivo = (props) => {
  const { canvasHeight, data } = props;
  console.group("LinechartNivo");
  console.log(data);
  console.groupEnd();
  return (
    <div
      style={{
        height: canvasHeight,
        width: "100%",
      }}
    >
      <ResponsiveLine
        data={data}
        width={900}
        height={500}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LinechartNivo);
