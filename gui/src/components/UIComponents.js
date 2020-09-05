import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import MultipleSelect from "./MultipleSelect";
import MuiVirtualizedTable from "./VirtualizedTable";
import VirtualizedTable from "./VirtualizedTable";
import ReactVirtualizedTable from "./VirtualizedTable";

const styles = (theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  buttons: {
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  selects: {
    width: "90%",
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)

  },
});

class UIComponents extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.root}>
        <Grid container>
          <Grid item md={6}>
            <Typography variant="h5" gutterBottom>Button</Typography>
            <Card variant="outlined" className={classes.buttons}>
              <Button size="small" variant="contained" color="primary">
                Contained
              </Button>
              <Button size="small" variant="outlined" color="primary">
                Outlined
              </Button>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                disableElevation
              >
                Disable elevation
              </Button>
              <Button size="small">Plain Button</Button>
            </Card>
            <Typography variant="h5" gutterBottom>Select</Typography>
            <Card variant="outlined" className={classes.selects}>
              <MultipleSelect />
            </Card>
          </Grid>
          <Grid item md={6}>
            <Typography variant="h5" gutterBottom>Table</Typography>
            <ReactVirtualizedTable />
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default withStyles(styles)(UIComponents);
