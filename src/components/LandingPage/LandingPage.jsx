import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Paper,
  Button,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  titlePaper: {
    margin: 15,
    padding: 10,
    marginTop: 25,
    marginBottom: 10,
  },
  buttons: {
    margin: 14,
  },
}));

export default function LandingPage() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();

  const enterPersonRedirect = () => {
    //debug
    console.log(`Who do you Appreciate?' - Clicked.`);
    //redirect`'
    history.push("/person");
  };

  //clear the person and event redux stores whenever we return to landing page
  useEffect(() => {
    dispatch({ type: "CLEAR_INPUT_STORE" });
  }, []);
  return (
    <Container>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <img
          src="https://freehand-prime.s3.us-east-2.amazonaws.com/tplogo.png"
          alt="Freehand Cards Logo"
        />
        <Typography variant="h6">
          We all lead busy lives with so many things competing for our
          attention.
        </Typography>
        <Typography variant="h6">
          Freehand Cards makes sure you never miss another occasion, and will
          deliver our distinctive cards directly to the people you appreciate.
        </Typography>
        <br />
        <Button
          className={classes.buttons}
          align="center"
          variant="contained"
          color="primary"
          size="large"
          onClick={enterPersonRedirect}
        >
          Who Do You Appreciate?
        </Button>
      </Paper>
    </Container>
  );
}
