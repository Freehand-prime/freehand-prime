import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid,
    Typography,
    TextField, 
    makeStyles,
    InputLabel,
    FormControl,
    MenuItem,
    Select,
    Paper,
    Button,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
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


export default function EnterOccasion() {
    // Hooks
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();

    const newEvent = useSelector((store) => store.event);
    const occasions = useSelector((store) => store.occasions)

    useEffect(() => {
        dispatch({ type: 'FETCH_OCCASIONS' });
      }, []);
    
    //onClick function to go back to EnterPerson
    const handleBack = () => {
        // sends user to EnterPerson page
        history.push('/person');
    }; //end handleBack

    //onClick function to submit occasion & date details
    const handleContinue = () => {
        // sends user to SelectCategory page
        history.push('/category');

    }; //end handleContinue



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Paper align="center" elevation={4} className={classes.paper}>
                        <Typography variant="h6">Tell Us The Occasion!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid align="center" item xs={12} sm={6}>
                    <Paper elevation={4}>
                        {/* Select input for occasion choice, maps occasion reducer to display options, 
                        onChange dispatches to event reducer */}
                        <FormControl>
                            <Select
                                id="event-occasion"
                                label= "select occasion"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                style={{ width: 250, margin: 8 }}
                                variant="outlined"
                                value={newEvent?.occasion}
                                onChange={(event) => dispatch({ type: 'SET_OCCASION', payload: event.target.value })}
                            >
                                {occasions.map((occasion) => {
                                    return (
                                        <MenuItem value = {occasion.id} key = {occasion.id}>{occasion.occasion}</MenuItem>
                                    );
                                })}
                                
                            </Select>
                        </FormControl>
                        {/* Input to select date for new event, onChange dispatches to event reducer */}
                        <FormControl>
                            <TextField
                                id="event-date"
                                label= "enter date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                style={{ width: 250, margin: 8 }}
                                value={newEvent?.date}
                                onChange={(event) => dispatch({ type: 'SET_DATE', payload: event.target.value })}
                                variant="outlined"
                            />
                        </FormControl>
                        {/* Buttons to send user back to EnterPerson page and to continue to SelectCategory */}
                        <div>
                            <Button variant="outlined" onClick={handleBack}>
                            Back
                            </Button>
                            
                            <Button variant="outlined" onClick={handleContinue}>
                            Continue
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
            </Grid>
        </div>
)
}; // end EnterOccasion