import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import {Button} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import {Link} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: "1px solid #bcbcbc",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block",
    // },
    fontFamily: "Raleway",
  },

  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const mapStateToProps = (state) => {
  return {

  };
};

function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="/">Home</Link>
      </MenuItem>
      <MenuItem>
        <Button>Home</Button>
      </MenuItem>
      <MenuItem>
        <Button>Blog</Button>
      </MenuItem>
      <MenuItem>
        <Link to="/about">About</Link>
      </MenuItem>
    </Menu>
  );

  const demoOnClick = () => {
    // this.props.getData();
  };

  return (
    <div className={classes.grow}>
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h5" noWrap>
            DATA&VIS
          </Typography>
          <div className={classes.grow} />

          <Box className={classes.sectionDesktop}>
            <Button><Link to="/">UI Components</Link></Button>

            <Button onClick={demoOnClick}>API Request</Button>

            <Button><Link to={"/viscomponents"}>Vis Components</Link></Button>

            <Button><Link to="/about">About</Link></Button>
          </Box>

          {/*<div className={classes.grow} />*/}
          {/*<div className={classes.sectionDesktop}>*/}
          {/*  <IconButton aria-label="show 4 new mails" color="inherit">*/}
          {/*    <Badge badgeContent={4} color="secondary">*/}
          {/*      <MailIcon />*/}
          {/*    </Badge>*/}
          {/*  </IconButton>*/}
          {/*  <IconButton aria-label="show 17 new notifications" color="inherit">*/}
          {/*    <Badge badgeContent={17} color="secondary">*/}
          {/*      <NotificationsIcon />*/}
          {/*    </Badge>*/}
          {/*  </IconButton>*/}
          {/*  <IconButton*/}
          {/*    edge="end"*/}
          {/*    aria-label="account of current user"*/}
          {/*    aria-controls={menuId}*/}
          {/*    aria-haspopup="true"*/}
          {/*    onClick={handleProfileMenuOpen}*/}
          {/*    color="inherit"*/}
          {/*  >*/}
          {/*    <AccountCircle />*/}
          {/*  </IconButton>*/}
          {/*</div>*/}
          <Box className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

export default PrimarySearchAppBar;
