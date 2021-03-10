import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid,
    Typography,
    TextField, 
    makeStyles,
    InputLabel,
    FormControl,
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


export default function EnterPerson() {

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const person = useSelector((store) => store.person)

    

    //onClick function to submit person & relationship details
    const handleContinue = () => {
        // sends user to EnterOccasion page
        history.push('/occasion');

    }; //end handleContinue



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Paper align="center" elevation={4} className={classes.paper}>
                    <Typography variant="h6">Who Do You Appreciate?</Typography>
                        <Typography variant="h6">Tell Us Below</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid align="center" item xs={12} sm={6}>
                    <Paper elevation={4}>
                        <FormControl>
                            <TextField
                                id="person-name"
                                label= "enter name"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                style={{ width: 250, margin: 8 }}
                                value={ person?.name || '' }
                                onChange={(event) => dispatch({ type: 'SET_NAME', payload: event.target.value })}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="person-relationship"
                                label= "enter your relationship"
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                  }}
                                style={{ width: 250, margin: 8 }}
                                value={ person?.relationship || '' }
                                onChange={(event) => dispatch({ type: 'SET_RELATIONSHIP', payload: event.target.value })}
                                variant="outlined"
                            />
                        </FormControl>
                        <div>
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
}; //end EnterPerson