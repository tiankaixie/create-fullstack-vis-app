import { Box, Grid } from "@material-ui/core";
import React from "react";
import { fade, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import GraphBasic from "./GraphBasic";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";

const styles = theme => ({
  root: { padding: theme.spacing(4) }
});

const mapStateToProps = state => {
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
            <Card variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Graph Basic
                </Typography>
                <Box>
                  <GraphBasic
                    canvasHeight={600}
                    canvasWidth={600}
                    data={data}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

export default connect(mapStateToProps)(withStyles(styles)(VISComponents));
