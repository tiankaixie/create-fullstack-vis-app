import {Box, Grid,} from "@material-ui/core";
import React from "react";
import {fade, withStyles} from "@material-ui/core/styles";
import preface from "../pictures/preface2.jpg";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const styles = (theme) => ({
  homeContainer: {
    // paddingTop: theme.spacing(10),
  },
  menuContainer: {
    paddingTop: theme.spacing(45),
    paddingLeft: theme.spacing(25),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(3),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "35ch",
    },
  },
});

// async function loadEffect() {
//   require("../effects/hoverEffect");
// }

const mapStateToProps = (state) => {
  return {

  };
};

class Home extends React.Component {
  // const classes = useStyles();

  componentDidMount() {
    // this.props.getData();
  }

  render() {
    const { classes } = this.props;
    return (
      <Box className={classes.homeContainer}>
        <Grid container>
          <Grid item md={6} sm={12}>
            <Box id="preface-container">
              <img
                src={preface}
                id="preface"
                alt="preface"
                className="js-image"
                style={{ width: "100%" }}
              />
            </Box>
          </Grid>
          <Grid item md={6} sm={12}>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.menuContainer}
            >
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Vanilla, are you flying alone to Florida?"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }
}

// interface Props extends WithStyles<typeof styles> {
//     classes: {
//     homeContainer: string;
//     menuContainer: string;
//   };
// }

export default withStyles(styles)(Home);
