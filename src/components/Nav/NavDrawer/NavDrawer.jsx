// React, Redux, Router
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";

// Component
import LogoutDialog from "../LogoutDialog/LogoutDialog";
import LoginDialog from "../../LoginDialog/LoginDialog";

// MUI styling
const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    height: 56,
  },
  drawerFooter: {
    position: "fixed",
    bottom: 0,
    textAlign: "center",
    paddingBottom: 10,
  },
}));

export default function NavDrawer({ open, setOpen }) {
  // Logout/Login dialog state
  const [logout, setLogout] = useState(false);
  const [login, setLogin] = useState(false);

  // User store
  const user = useSelector((store) => store.user);

  // Hooks
  const classes = useStyles();
  const history = useHistory();

  // Link list for drawer - pushes the user to places
  const linkList = [
    {
      text: "Dashboard",
      icon: <AccountCircleIcon />,
      onClick: () => history.push("/user"),
    },
    {
      text: "View People",
      icon: <PeopleIcon />,
      onClick: () => history.push("/persons"),
    },
    {
      text: "Add Event",
      icon: <AddCircleIcon />,
      onClick: () => history.push("/person"),
    },
  ];

  // Drawer open
  const handleDrawerOpen = () => {
    if (user.id != null) {
      setOpen(true);
    }
  };

  // Drawer close
  const handleDrawerClose = () => {
    if (user.id != null) {
      setOpen(false);
    }
  };

  // Open logout dialog
  const handleLogoutOpen = () => {
    setLogout(true);
  };

  // Open login dialog
  const handleLoginOpen = () => {
    setLogin(true);
  };

  return (
    <>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onOpen={handleDrawerOpen}
        onClose={handleDrawerClose}
        onClick={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {linkList.map((item, i) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button key={i} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
        <div className={classes.drawerFooter}>
          <List>
            {user.id ? (
              <ListItem button key="logout" onClick={handleLogoutOpen}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            ) : (
              <ListItem button key="login" onClick={handleLoginOpen}>
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItem>
            )}
          </List>
        </div>
      </SwipeableDrawer>
      <LogoutDialog logout={logout} setLogout={setLogout} />
      <LoginDialog login={login} setLogin={setLogin} />
    </>
  );
}
