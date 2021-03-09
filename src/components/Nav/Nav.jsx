// React, Redux, Router
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// Component
import NavDrawer from "./NavDrawer/NavDrawer";

// MUI styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {

  // Drawer open state
  const [open, setOpen] = useState(false);

  // User selector
  const user = useSelector((store) => store.user);

  // Hooks
  const classes = useStyles();
  const location = useLocation();

  // Regexp for Appbar title on URL by ID
  // const pathStr = /[a-z\/]/gi;
  // const pathId = location.pathname.replace(pathStr, "");

  // Drawer open handler
  const handleDrawerOpen = () => {
      setOpen(true);
  };

  // Appbar title switch statement
  const changeTitle = () => {
    if (user.id != null) {
      switch (location.pathname) {
        case "/admin":
          return "Admin";
        case "/admincards":
          return "Admin";
        default:
          return "Freehand Cards";
      }
    } else {
      return "Freehand Cards";
    }
  };

  // Title declare
  let title = changeTitle();

  return (
    <div className={classes.root}>
      <AppBar color="primary">
        <Toolbar>
            <>
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" className={classes.title}>
                {title}
              </Typography>
            </>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NavDrawer open={open} setOpen={setOpen} />
    </div>
  );
}
