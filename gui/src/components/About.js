import React from "react";
import {Box} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({});

class About extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5">
              Tiankai Xie
            </Typography>
          </Grid>
          <Grid item xs={6}>
              <Box/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(About);
