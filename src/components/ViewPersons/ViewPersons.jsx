// react, redux, routing
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

// this component shows the user the people they have entered events for
export default function ViewPersons() {
  // hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // state
  const persons = useSelector((store) => store.persons);

  // fetches most recent persons from database
  useEffect(() => {
    dispatch({ type: 'FETCH_PERSONS' });
  }, []);

  return (
    <>
      <Container>
        <br></br>
        <Typography align="center" variant="h5">
          Your People
        </Typography>
        <br></br>
        {/* maps over persons and creates a card for each */}
        {persons &&
          persons.map((person) => (
            <Box key={person.id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    {person.name}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Your {person.relationship}
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {person.num_events} events
                  </Typography>
                  <Box align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        history.push(`/events/${person.id}`);
                      }}
                      size="small"
                    >
                      See Events
                    </Button>
                  </Box>
                </CardContent>
              </Card>
              <br></br>
            </Box>
          ))}
        <Box align="center">
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              history.push('/dashboard');
            }}
          >
            Dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
}
