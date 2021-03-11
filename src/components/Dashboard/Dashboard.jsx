import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Button,
  ButtonGroup,
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

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const events = useSelector((store) => store.events);

  // do we not need a useEffect bc we are setting state after registration / login?
  useEffect(() => {
    dispatch({ type: 'FETCH_EVENTS' });
  }, []);

  return (
    <>
      <Container>
        <br></br>
        <Typography variant="h5">Dashboard</Typography>
        <br></br>
        <Paper>
          <Card className={classes.root}>
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
              <Button size="small">Edit Event</Button>
            </CardContent>
          </Card>
        </Paper>
        <br></br>
        <Box justifyContent="center">
          <Paper>
            <ButtonGroup orientation="vertical" color="primary" variant="text">
              <Button
                onClick={() => {
                  history.push('/person');
                }}
              >
                Who Do You Appreciate?
              </Button>
              <Button
                onClick={() => {
                  history.push('/persons');
                }}
              >
                View People
              </Button>
              <Button>View Calendar</Button>
            </ButtonGroup>
          </Paper>
        </Box>
      </Container>
    </>
  );
}
