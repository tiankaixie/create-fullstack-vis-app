import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles(theme => ({
  root: {
    height: 8,
    borderRadius: 1
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700]
  },
  bar: {
    borderRadius: 1,
    backgroundColor: "#1a90ff"
  }
}))(LinearProgress);

export default function CustomizedProgressBar(props) {
  const { value } = props;
  return <BorderLinearProgress variant="determinate" value={value} />;
}
