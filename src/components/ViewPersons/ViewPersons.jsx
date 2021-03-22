// React, Redux, Routing
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

// MUI
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";

// MUI style
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

export default function ViewPersons() {
  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // Redux selector
  const persons = useSelector((store) => store.persons);

  // Fetches most recent persons from database
  useEffect(() => {
    dispatch({ type: "FETCH_PERSONS" });
  }, []);

  return (
    <>
      <Container>
        <Paper align="center" elevation={4} className={classes.titlePaper}>
          <Typography align="center" variant="h5">
            Your People
          </Typography>
        </Paper>
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
              history.push("/dashboard");
            }}
          >
            Dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
}
