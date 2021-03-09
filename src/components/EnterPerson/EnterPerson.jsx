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


export default function EnterPerson() {

    
    const history = useHistory();
    const dispatch = useDispatch();

    const [newPerson, setNewPerson] = React.useState({
        name: '',
        relationship: '',
    })

    //function to update state from input fields
    const handleChange = (key, event) => {
        console.log('in handleChange');

        switch(key) {
            case 'name':
                setNewPerson({ ...newPerson, name: event.target.value })
                break;
            case 'relationship':
                setNewPerson({ ...newPerson, relationship: event.target.value })
                break;

        }
    }; //end handleChange

    //onClick function to submit person & relationship details
    const handleContinue = (event) => {
        console.log('clicked handleContinue');

        //dispatch to reducer:
        dispatch({
            type: 'ADD_PERSON',
            payload: newPerson
        });

        //adding newPerson
        setNewPerson({
            name: '',
            relationship: '',
        });

        history.push('/occasion');

    }; //end handleContinue



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Paper align="center" elevation={4} className={classes.paper}>
                    <Typography variant="h5">Who Do You Appreciate?</Typography>
                        <Typography variant="h5">Tell Us Below</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid align="center" item xs={12} sm={6}>
                    <Paper elevation={4}>
                        <FormControl>
                            <TextField
                                id="person-name"
                                label= "name"
                                placeholder="enter name"
                                type="text"
                                value={newPerson.name}
                                onChange={(event) => handleChange('name', event)}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="person-relationship"
                                label= "relationship"
                                placeholder="enter your relationship"
                                type="text"
                                value={newPerson.relationship}
                                onChange={(event) => handleChange('relationship', event)}
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