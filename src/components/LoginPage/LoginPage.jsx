// React
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// Component
import LoginForm from "../LoginForm/LoginForm";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 300,
    marginBottom: 300,
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  // State
  const [login, setLogin] = useState(true);

  return (
    <div>
      <center>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => setLogin(true)}
        >
          Log In
        </Button>
      </center>
      <LoginForm login={login} setLogin={setLogin} />
    </div>
  );
}
