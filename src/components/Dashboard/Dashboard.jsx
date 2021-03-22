// React, Redux, Router
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import {
  makeStyles,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";

// MUI style
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  titlePaper: {
    margin: 40,
    padding: 10,
    marginBottom: 110,
  },
  buttonBox: {
    marginTop: "6rem",
    marginBottom: "4rem",
  },
  nextEvent: {
    padding: 5,
    paddingLeft: 15,
  }
});

// Custom components
import EventCard from "../EventCard/EventCard";

// This component renders the next upcoming event, and allows users to navigate 
// to see their people and add new events
export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // NOTE - still need logic fix for finding the next upcoming event 3/17
  const events = useSelector((store) => store.events);

  // Fetches the most recent events from the database
  useEffect(() => {
    dispatch({ type: "FETCH_EVENTS" });
    // Clear the person and event redux stores whenever we return to dashboard
    dispatch({ type: "CLEAR_INPUT_STORE" });
  }, [dispatch]);

  return (
    <>
      <Container>
        <Paper align="center" elevation={4} className={classes.titlePaper}>
          <Typography align="center" variant="h5">
            Dashboard
          </Typography>
        </Paper>
        <Paper elevation={4} className={classes.nextEvent}>
          <Typography variant="h6">
            Your next event is:
          </Typography>
        </Paper>
        <Paper>
          {events[0] && <EventCard event={events[0]} includeName={true} />}
        </Paper>
        <br></br>
        <Box justifyContent="center" className={classes.buttonBox}>
          <Box align="center" m={2}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                history.push("/person");
              }}
            >
              Who Do You Appreciate?
            </Button>
          </Box>
          <Box align="center" m={4}>
            <Button
              align="center"
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                history.push("/persons");
              }}
            >
              View People
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
