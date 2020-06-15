import { Box, Grid } from "@material-ui/core";
import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GraphBasic from "./GraphBasic";
import {connect} from "react-redux";
const styles = theme => ({
  root: { padding: theme.spacing(4) }
});

const mapStateToProps = (state) => {
  return {
    data: state.data
  };
};

class VISComponents extends React.Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Box className={classes.root}>
        <Grid container>
          <Grid item>
            <Box>
              <GraphBasic canvasHeight={500} canvasWidth={500} data={data}/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(VISComponents));
