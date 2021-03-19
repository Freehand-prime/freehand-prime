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
  titlePaper: {
    margin: 20,
    padding: 10,
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

  // fetches the most recent events from the database and clear the edit store
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
    dispatch({ type: 'CLEAR_EDIT_STORE'});
  }, [dispatch]);

  return (
    <>
      <Container>
        <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography align="center" variant="h5">{personsEvents[0]?.name}'s Events</Typography>
        </Paper>
        {personsEvents &&
          personsEvents.map((event) => (
            <Box key={event.date+event.name}>
              <EventCard event={event} includeName={false} />
              <br></br>
            </Box>
          ))
        }
        <Box align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push('/persons');
            }}
          >
            Your People
          </Button>
        </Box>
      </Container>
    </>
  );
}
