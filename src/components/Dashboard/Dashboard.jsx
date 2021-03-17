// hooks
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
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
});

import EventCard from '../EventCard/EventCard';

// this component renders the next upcoming event, and allows users to navigate to see their people and add new events
export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // SEAN NOTE - still need logic fix for finding the next upcoming event 3/17
  const events = useSelector((store) => store.events);

  // fetches the most recent events from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  return (
    <>
      <Container>
        <br></br>
        <Typography align="center" variant="h5">
          Dashboard
        </Typography>
        <br></br>
        <Paper>
          {events[0] && <EventCard event={events[0]} includeName={true} />}
          {/* SEAN NOTE DON'T DELETE YET 3/17 <EventCard event={event} /> */}
          {/* <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                Next Event - {events[0]?.date}
              </Typography>
              <Typography variant="h5" component="h2">
                {events[0]?.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {events[0]?.occasion} | {events[0]?.category}
              </Typography>
              <Button
                size="small"
                onClick={() => history.push(`/edit/${events[0].event_id}`)}
              >
                Edit Event
              </Button>
            </CardContent>
          </Card> */}
        </Paper>
        <br></br>
        <Box justifyContent="center" >
          <Box align="center" m={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                history.push('/person');
              }}
            >
              Who Do You Appreciate?
            </Button>
          </Box>
          <Box align="center" m={2}>
            <Button
              align="center"
              color="primary"
              variant="contained"
              size="small"
              onClick={() => {
                history.push('/persons');
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
