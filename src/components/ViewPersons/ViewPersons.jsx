import { useSelector } from 'react-redux';
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
  const classes = useStyles();

  const dummyPersons = [
    {
      name: 'Brian',
      relationship: 'Brother',
      num_events: 2,
      address: '2010 Scott Ave N',
    },
    {
      name: 'Tavis',
      relationship: 'Roommate',
      num_events: 1,
      address: '628 Adams St NE',
    },
    {
      name: 'Paige',
      relationship: 'Friend',
      num_events: 3,
      address: null,
    },
  ];

  return (
    <>
      <Container>
        <br></br>
        <Typography variant="h5">Your People</Typography>
        <br></br>
        <Paper>
          {dummyPersons &&
            dummyPersons.map((person) => (
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
