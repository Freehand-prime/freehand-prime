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

// Transition on mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function RegisterDialog({ register, setRegister }) {
  // State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Error selector
  const errors = useSelector((store) => store.errors);

  // Person and Event Reducers
  const newEvent = useSelector((store) => store.event);
  const person = useSelector((store) => store.person);

  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Registration handler function and error catch + state clear
  const handleRegister = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: "REGISTER",
        payload: {
          username: username,
          password: password,
        },
        person: person,
        newEvent: newEvent,
      });
      setRegister(false);
      history.push("/dashboard");
      setUsername("");
      setPassword("");
    } else {
      dispatch({ type: "REGISTRATION_INPUT_ERROR" });
    }
  };

  // Cancel register handler
  const handleRegisterCancel = () => {
    setRegister(false);
  };

  return (
    <>
      <Dialog
        open={register}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleRegisterCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Register"}</DialogTitle>
        <form onSubmit={handleRegister}>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {errors.registrationMessage && (
                <h3 className="alert" role="alert">
                  {errors.registrationMessage}
                </h3>
              )}
              Enter an email and password to register. You will receive an email
              reminder 2 weeks prior to your event!
            </DialogContentText>
            <TextField
              required
              autoFocus
              margin="dense"
              id="regName"
              label="Email"
              color="secondary"
              type="email"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="regPassword"
              label="Password"
              color="secondary"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRegisterCancel} color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
