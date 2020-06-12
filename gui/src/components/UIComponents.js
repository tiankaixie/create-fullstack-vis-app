import { Box, Grid } from "@material-ui/core";
import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: { padding: theme.spacing(4) }
});

class UIComponents extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <Grid container>
          <Grid item>
            <Box>
              <Button>Plain Button</Button>
              <Button variant="contained" color="secondary" disableElevation>
                Disable elevation
              </Button>
              <Button variant="outlined" color="primary">
                Outlined
              </Button>
              <Button variant="contained" color="primary">
                Outlined
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(UIComponents);
