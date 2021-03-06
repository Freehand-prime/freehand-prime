// React, Redux, Router
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  TextField,
} from "@material-ui/core";

// Transition for mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LoginDialog() {
  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Redux selectors
  const errors = useSelector((store) => store.errors);
  const login = useSelector((store) => store.login);

  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Login handler and validation + clear state
  const handleLogin = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
        history: history,
      });
      setUsername("");
      setPassword("");
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  // Login cancel handler
  const handleLoginCancel = () => {
    dispatch({ type: "LOGIN_CLOSE" });
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
              color="secondary"
              label="Email"
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <br />
            <TextField
              required
              margin="dense"
              id="password"
              color="secondary"
              label="Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginCancel} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Log In
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
