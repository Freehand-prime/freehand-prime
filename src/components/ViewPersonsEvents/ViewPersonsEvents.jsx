import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ViewPersonsEvent() {
  const history = useHistory();
  const classes = useStyles();
  const page = useParams();
  const events = useSelector((store) => store.events);
  const personsEvents = events.filter(function (event) {
    return event.id == page.id;
  });

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
                    <Button size="small" onClick={() => history.push(`/edit/${event.event_id}`)}>Edit Event</Button>
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
