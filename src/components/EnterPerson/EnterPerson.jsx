// React, Redux, Router
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import {
  Typography,
  TextField,
  makeStyles,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Paper,
  Button,
} from "@material-ui/core";

// MUI style
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
    marginTop: 80,
    marginBottom: "6rem",
  },
  buttons: {
    margin: 8,
  },
}));

export default function EnterPerson() {
  // State
  const [selectedPerson, setSelectedPerson] = useState({
    name: "",
    relationship: "",
  });

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // Redux Selectors
  const user = useSelector((store) => store.user);
  const person = useSelector((store) => store.person);
  const userPersons = useSelector((store) => store.persons);

  useEffect(() => {
    if (user.id) {
      dispatch({ type: "FETCH_PERSONS" });
    }
  }, []);

  //onClick function to submit person & relationship details
  const handleContinue = () => {
    // sends user to EnterOccasion page
    if (selectedPerson.id) {
      dispatch({ type: "SET_EDIT_PERSON", payload: selectedPerson });
    }
    history.push("/occasion");
  }; //end handleContinue

  const handleSelectPerson = (event) => {
    event.preventDefault();
    userPersons.forEach((person) => {
      if (person.name == event.target.value) {
        setSelectedPerson(person);
      }
    });
  }; //end handleSelectPerson

  // onClick function to go back to Dashboard
  const handleBack = () => {
    if (user.id) {
      history.push("/dashboard");
    } else {
      history.push("/home");
    }
  }; //end handleBack

  return (
    <Container>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography variant="h5">Who Do You Appreciate?</Typography>
        <br />
        <Typography variant="h6">Tell Us Below:</Typography>
      </Paper>
      <Paper align="center" elevation={4} className={classes.formPaper}>
        <FormControl variant="outlined" className={classes.root}>
          {user.id && (
            <>
              <InputLabel color="secondary" id="select-label">Select Existing Person</InputLabel>
              <Select
                labelId="select-label"
                id="select-person-name"
                label="Select Existing Person"
                color="secondary"
                value={selectedPerson?.name}
                onChange={handleSelectPerson}
              >
                {userPersons?.map((person) => {
                  return (
                    <MenuItem value={person.name} key={person.id}>
                      {person.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <br />
              <br />
            </>
          )}
        </FormControl>
        <FormControl className={classes.root}>
          <TextField
            className={classes.inputField}
            id="person-name"
            label="Enter Name"
            type="text"
            color="secondary"
            // InputLabelProps={{
            //   shrink: selectedPerson?.name,
            // }}
            value={person?.name || selectedPerson.name}
            onChange={(event) =>
              dispatch({ type: "SET_NAME", payload: event.target.value })
            }
            variant="outlined"
          />
        </FormControl>
        <FormControl className={classes.root}>
          <TextField
            className={classes.inputField}
            id="person-relationship"
            label="Enter Your Relationship"
            type="text"
            color="secondary"
            // InputLabelProps={{
            //   shrink: selectedPerson.relationship,
            // }}
            value={person?.relationship || selectedPerson.relationship}
            onChange={(event) =>
              dispatch({
                type: "SET_RELATIONSHIP",
                payload: event.target.value,
              })
            }
            variant="outlined"
          />
        </FormControl>
        <br />
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
} //end EnterPerson
