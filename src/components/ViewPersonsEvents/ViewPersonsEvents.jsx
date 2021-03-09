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

export default function ViewPersonsEvent() {
  const history = useHistory();
  const classes = useStyles();

  const dummyEvents = [
    {
      date: '3/14/2021',
      person: 'Brian',
      occasion: 'birthday',
      category: 'memes',
      card_id: null,
    },
    {
      date: '4/5/2021',
      person: 'Brian',
      occasion: 'promotion',
      category: 'congratulations',
      card_id: null,
    },
  ];

  return (
    <>
      <Container>
        <br></br>
        <Typography variant="h5">{dummyEvents.name}'s Events</Typography>
        <br></br>
        <Paper>
          {dummyEvents &&
            dummyEvents.map((event) => (
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
                    <Button size="small">Edit Event</Button>
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
