// React
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import {
  Grid,
  Typography,
  MenuItem,
  makeStyles,
  Container,
  FormControl,
  Select,
  Paper,
  Button,
} from "@material-ui/core";

// Component
import RegisterDialog from "../RegisterDialog/RegisterDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SelectCategory() {
  // Confirm dialog state
  const [register, setRegister] = useState(false);
  const [thisEvent, setThisEvent] = useState({category: ''});

  // Hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // State
  const newEvent = useSelector((store) => store.event);
  const person = useSelector((store) => store.person);
  const categories = useSelector((store) => store.categories);
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_CATEGORIES" });
      //if we've got a category in edit store, set the state.
    if(newEvent.category){
      setThisEvent({category: newEvent.category});
    }
  }, []);

  // onClick function to go back to EnterOccasion
  const handleBack = () => {
    dispatch({ type: "SET_CATEGORY", payload: thisEvent.category });
    history.push("/occasion");
  }; //end handleBack

  // onClick function to submit person & relationship details
  const handleContinue = () => {
    if (user.id) {
      // dispatches collected form data if user is logged in
      dispatch({ type: "SET_CATEGORY", payload: thisEvent.category });
      dispatch({ type: "ADD_PERSON_AND_EVENT", payload: { person, newEvent }});
      // Sends user to Dashboard with newly created Event
      history.push("/dashboard");
    } else {
      // triggers Registration Dialog to register new user
      setRegister(true);
    } //else go to register/login
  }; //end handleContinue

  return (
    <Container>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <Paper align="center" elevation={4} className={classes.paper}>
              <Typography variant="h6">
                What type of cards would you like to consider for this occasion?
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}></Grid>
          <Grid item xs={6} sm={3}></Grid>
          <Grid align="center" item xs={12} sm={6}>
            <Paper elevation={4}>
              <FormControl>
                <Select
                  id="event-category"
                  label="select category"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 250, margin: 8 }}
                  variant="outlined"
                  value={thisEvent.category}
                  onChange={(event) => setThisEvent({...thisEvent, category: event.target.value})}
                >
                  {categories.map((category) => {
                    return (
                      <MenuItem value={category.id} key={category.id}>
                        {category.category}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <div>
                <Button variant="contained" color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleContinue}>
                  Continue
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}></Grid>
        </Grid>
        <RegisterDialog register={register} setRegister={setRegister} />
      </div>
    </Container>
  );
} // end SelectCategory
