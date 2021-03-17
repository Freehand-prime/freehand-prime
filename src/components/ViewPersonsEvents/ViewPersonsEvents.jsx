// react, redux, routing
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

// MUI
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
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

// this component shows the user the events of a single person
export default function ViewPersonsEvent() {
  // hooks
  const history = useHistory();
  const classes = useStyles();
  const page = useParams();
  const dispatch = useDispatch();

  // state
  const events = useSelector((store) => store.events);
  const personsEvents = events.filter(function (event) {
    return event.id == page.id;
  });

  // fetches the most recent events from the database
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  return (
    <>
      <Container>
        <br></br>
        <Typography variant="h5">{personsEvents[0]?.name}'s Events</Typography>
        <br></br>
        <Paper>
          {personsEvents &&
            personsEvents.map((event) => (
              <Box>
                {/* SEAN NOTE DON'T DELETE YET 3/17 <EventCard event={event} /> */}
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      {event.date}
                    </Typography>
                    <Typography variant="h5" component="h2">
                      {event.person}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {event.occasion} | {event.category}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => history.push(`/edit/${event.event_id}`)}
                    >
                      Edit Event
                    </Button>
                  </CardContent>
                </Card>
                <br></br>
              </Box>
            ))}
        </Paper>
        <Button
          onClick={() => {
            history.push('/persons');
          }}
        >
          Your People
        </Button>
      </Container>
    </>
  );
}
