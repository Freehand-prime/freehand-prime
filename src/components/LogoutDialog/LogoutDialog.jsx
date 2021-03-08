// React, Redux, Router
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// Transition for mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutDialog({ logout, setLogout }) {
  
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Logout handler - push home
  const handleLogout = () => {
    setLogout(false);
    dispatch({ type: "LOGOUT" });
    history.push("/home");
  };

  // Logout cancel
  const handleLogoutCancel = () => {
    setLogout(false);
  };

  return (
    <>
      <Dialog
        open={logout}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLogoutCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Logout?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you'd like to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="inherit">
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


