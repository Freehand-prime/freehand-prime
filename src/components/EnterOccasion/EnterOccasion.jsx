import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
    Grid,
    Typography,
    TextField, 
    makeStyles,
    InputLabel,
    FormControl,
    Select,
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

    
    const history = useHistory();
    const dispatch = useDispatch();

    const [newEvent, setNewEvent] = React.useState({
        occasion: '',
        date: '',
    })

    //function to update state from input fields
    const handleChange = (key, event) => {
        console.log('in handleChange');

        switch(key) {
            case 'occasion':
                setNewEvent({ ...newEvent, occasion: event.target.value })
                break;
            case 'date':
                setNewEvent({ ...newEvent, date: event.target.value })
                break;

        }
    }; //end handleChange

    //onClick function to go back to EnterPerson
    const handleBack = () => {
        history.push('/person');
    }; //end handleBack

    //onClick function to submit occasion & date details
    const handleContinue = (event) => {
        console.log('clicked handleContinue');

        //dispatch to reducer:
        dispatch({
            type: 'ADD_OCCASION_DATE',
            payload: newEvent
        });

        //adding newPerson
        setNewEvent({
            occasion: '',
            date: '',
        });

        history.push('/category');

    }; //end handleContinue



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Paper align="center" elevation={4} className={classes.paper}>
                        <Typography variant="h5">Tell Us The Occasion!</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid align="center" item xs={12} sm={6}>
                    <Paper elevation={4}>
                        <FormControl>
                            <TextField
                                id="event-occasion"
                                label= "occasion"
                                placeholder="enter occasion"
                                type="text"
                                value={newEvent.occasion}
                                onChange={(event) => handleChange('occasion', event)}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="event-date"
                                label= "date"
                                placeholder="enter date"
                                type="date"
                                value={newEvent.date}
                                onChange={(event) => handleChange('date', event)}
                                variant="outlined"
                            />
                        </FormControl>
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
}; //EnterOccasion