import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

export default function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const recentEvent = useSelector((store) => store.events);

  // do we not need a useEffect bc we are setting state after registration / login?
  // right now the nav drawer routes to '/user' when dashboard is clicked instead of dashboard

  useEffect(() => {
    dispatch({ type: 'FETCH_RECENT_EVENT' });
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
                Next Event - {recentEvent.date}
              </Typography>
              <Typography variant="h5" component="h2">
                {recentEvent.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {recentEvent.occasion} | {recentEvent.category}
              </Typography>
              <Button size="small">Edit Event</Button>
            </CardContent>
          </Card>
        </Paper>
        <br></br>
        <Box justifyContent="center">
          <Paper>
            <ButtonGroup orientation="vertical" color="primary" variant="text">
              <Button>Who Do You Appreciate?</Button>
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
