// React, Redux, Router
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import TextField from "@material-ui/core/TextField";

// Transition for mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog({ login, setLogin }) {
  
  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redux store
  const errors = useSelector((store) => store.errors);

  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Login handler and validation
  const handleLogin = () => {
    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
      setLogin(false);
      history.push("/user");
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  // Login cancel handler
  const handleLoginCancel = () => {
    setLogin(false);
  };

  return (
    <>
      <Dialog
        open={login}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleLoginCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Log In"}</DialogTitle>
        <form onSubmit={handleLogin}>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {errors.loginMessage && (
              <h3 className="alert" role="alert">
                {errors.loginMessage}
              </h3>
            )}
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Username"
            type="text"
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="password"
            label="Password"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLoginCancel} color="inherit">
            Cancel
          </Button>
          <Button type="submit" color="inherit">
            Log In
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
