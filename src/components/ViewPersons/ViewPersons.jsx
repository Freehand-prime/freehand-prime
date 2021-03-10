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

export default function ViewPersons() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const persons = useSelector((store) => store.persons);

    useEffect(() => {
        dispatch({ type: 'FETCH_PERSONS' });
      }, []);

  return (
    <>
      <Container>
        <br></br>
        <Typography variant="h5">Your People</Typography>
        <br></br>
        <Paper>
          {persons &&
            persons.map((person) => (
              <Box>
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
                    <Button
                      onClick={() => {
                        history.push('/events');
                      }}
                      size="small"
                    >
                      See Events
                    </Button>
                  </CardContent>
                </Card>
                <br></br>
              </Box>
            ))}
        </Paper>
        <Button
          onClick={() => {
            history.push('/dashboard');
          }}
        >
          Dashboard
        </Button>
      </Container>
    </>
  );
}
