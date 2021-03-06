// React, Router, Redux
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import {
  InputLabel,
  Typography,
  MenuItem,
  makeStyles,
  Container,
  FormControl,
  Select,
  Paper,
  Button,
} from "@material-ui/core";

// Custom components
import RegisterDialog from "../RegisterDialog/RegisterDialog";

// MUI style
const useStyles = makeStyles((theme) => ({
  root: {
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
    marginBottom: "16rem",
  },
  buttons: {
    margin: 8,
  },
}));

export default function SelectCategory() {
  // Register dialog state
  const [register, setRegister] = useState(false);
  const [thisEvent, setThisEvent] = useState({ category: "" });

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // Redux
  const newEvent = useSelector((store) => store.event);
  const person = useSelector((store) => store.person);
  const categories = useSelector((store) => store.categories);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
    // if we've got a category in edit store, set the state.
    if (newEvent.category) {
      setThisEvent({ category: newEvent.category });
    }
  }, []);

  // onClick function to go back to EnterOccasion
  const handleBack = () => {
    dispatch({ type: "SET_CATEGORY", payload: thisEvent.category });
    history.push("/occasion");
  }; // end handleBack

  const handleChange = (event) => {
    // dispatch and set local state on selector change
    dispatch({ type: "SET_CATEGORY", payload: event });
    setThisEvent({ ...thisEvent, category: event });
  };
  // onClick function to submit person & relationship details
  const handleContinue = () => {
    if (user.id) {
      // dispatches collected form data if user is logged in
      dispatch({ type: "SET_CATEGORY", payload: thisEvent.category });
      // check to make sure the person and event are filled out
      // TODO: add error dialogue or something if it fails.
      if (
        person.name &&
        person.relationship &&
        newEvent.occasion &&
        newEvent.date
      ) {
        dispatch({
          type: "ADD_PERSON_AND_EVENT",
          payload: { person, newEvent },
        });
        // Sends user to Dashboard with newly created Event
        history.push("/dashboard");
      }
    } else {
      // triggers Registration Dialog to register new user
      setRegister(true);
    } // else go to register/login
  }; // end handleContinue

  return (
    <Container>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography variant="h6">
          What type of cards would you like to consider for this occasion?
        </Typography>
      </Paper>
      <Paper align="center" elevation={4} className={classes.formPaper}>
        <FormControl variant="outlined" className={classes.root}>
          <InputLabel color="secondary" id="select-label">
            Select Category
          </InputLabel>
          <Select
            labelId="select-label"
            id="event-category"
            label="Select Category"
            type="text"
            color="secondary"
            value={newEvent?.category}
            onChange={(event) =>
              dispatch({
                type: "SET_CATEGORY",
                payload: event.target.value,
              })
            }
          >
            {categories.slice(1).map((category) => {
              return (
                <MenuItem value={category.id} key={category.id}>
                  {category.category}
                </MenuItem>
              );
            })}
          </Select>
          <br />
          <br />
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
      <RegisterDialog register={register} setRegister={setRegister} />
    </Container>
  );
} // end SelectCategory
