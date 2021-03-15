import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid,
    Typography,
    TextField, 
    makeStyles,
    MenuItem,
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

    const [selectedPerson, setSelectedPerson] = useState({});

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user)
    const person = useSelector((store) => store.person)
    const allPersons = useSelector((store => store.persons))

    const userPersons = allPersons.filter((person) => {
        if (person.user_id === user.id)
        return person; 
    })

    console.log(userPersons);

    useEffect(() => {
        dispatch({ type: 'FETCH_PERSONS' });
      }, [person]);

    //onClick function to submit person & relationship details
    const handleContinue = () => {
        // sends user to EnterOccasion page
        history.push('/occasion');

    }; //end handleContinue

    const handleSelectPerson = (event) => {
        event.preventDefault();
        userPersons.forEach((person) => {
            if(person.name == event.target.value) {
                setSelectedPerson(person);
                dispatch({type: 'SET_EDIT_PERSON', payload: selectedPerson})
            }
        })
    }

    console.log(selectedPerson);

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
                                value={ person?.name || selectedPerson.name }
                                onChange={(event) => dispatch({ type: 'SET_NAME', payload: event.target.value })}
                                variant="outlined"
                            />
                            {user.id && (
                                <Select
                                id="select-person-name"
                                label="select person"
                                type="text"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                style={{ width: 250, margin: 8 }}
                                variant="outlined"
                                value={selectedPerson?.name || ''}
                                onChange={handleSelectPerson}
                              >
                                {userPersons.map((person) => {
                                  return (
                                    <MenuItem value={person.name} key={person.id}>
                                      {person.name}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                            )}
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
                                value={ person?.relationship || selectedPerson.relationship }
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