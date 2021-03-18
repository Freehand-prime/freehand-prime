import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid,
  Typography,
  TextField,
  makeStyles,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: 250,
    },
    "& .MuiSelect-outlined": {
        width: 250,
      },
  },
  titlePaper: {
    margin: 10,
    padding: 10,
    marginTop: 20,
  },
  formPaper: {
    margin: 8,
    padding: 15,
    marginTop: 100,
    marginBottom: "15rem",
  },
  buttons: {
    margin: 8,
  },
}));

export default function SelectOccasion() {
  // Redux
  const newEvent = useSelector((store) => store.event);
  const occasions = useSelector((store) => store.occasions);

  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // UseEffect to fetch occasions
  useEffect(() => {
    dispatch({ type: "FETCH_OCCASIONS" });
  }, []);

  //onClick function to go back to EnterPerson
  const handleBack = () => {
      // send data to store and user to SelectCategory page
    dispatch({ type: "SET_OCCASION", payload: thisEvent.occasion });
    dispatch({ type: "SET_DATE", payload: thisEvent.date });
      // sends user to EnterPerson page
    history.push("/person");
  }; //end handleBack

  //onClick function to submit occasion & date details
  const handleContinue = () => {
    // send data to store and user to SelectCategory page
    dispatch({ type: "SET_OCCASION", payload: thisEvent.occasion });
    dispatch({ type: "SET_DATE", payload: thisEvent.date });

    history.push("/category");
  }; //end handleContinue

  useEffect(() => {
    dispatch({ type: "FETCH_OCCASIONS" });
      //if we've got an occasion and date in edit store, set the state.
    if(newEvent.occasion){
      setThisEvent({occasion: newEvent.occasion, date: newEvent.date});
    }
  }, []);

  return (
    <Container>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography variant="h5">Tell Us The Occasion!</Typography>
      </Paper>
      <Paper align="center" elevation={4} className={classes.formPaper}>
        <FormControl variant="outlined" className={classes.root}>
          <InputLabel id="select-label">Select Occasion</InputLabel>
          <Select
            labelId="select-label"
            id="event-occasion"
            label="Select Occasion"
            type="text"
            value={newEvent?.occasion}
            onChange={(event) =>
              dispatch({
                type: "SET_OCCASION",
                payload: event.target.value,
              })
            }
          >
            {occasions.slice(1).map((occasion) => {
              return (
                <MenuItem value={occasion.id} key={occasion.id}>
                  {occasion.occasion}
                </MenuItem>
              );
            })}
          </Select>
          </FormControl>
          <FormControl className={classes.root}>
          <TextField
            id="event-date"
            label="enter date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={newEvent?.date}
            onChange={(event) =>
              dispatch({ type: "SET_DATE", payload: event.target.value })
            }
            variant="outlined"
          />
        </FormControl>
        <div>
          <Button
            className={classes.buttons}
            variant="contained"
            color="secondary"
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            className={classes.buttons}
            variant="contained"
            color="primary"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </div>
      </Paper>
    </Container>
  );
} // end SelectOccasion
