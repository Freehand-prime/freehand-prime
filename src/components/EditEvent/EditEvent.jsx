import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
    Grid,
    Typography,
    MenuItem,
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






export default function EditEvent() {

    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const editInput = useSelector((store) => store.edit);

    //onClick function DELETE an event
    const handleDelete = () => {
        // sends user to PersonsEvents page
        history.push('/events');
    }; //end handleBack


    //onClick function to UPDATE an event
    const handleUpdate = () => {
        // triggers SAGA that will save the local changes to database
        dispatch({
            type: 'SAVE_EDIT',
            payload: editInput,
        });

        // sends user to PersonsEvents page
        history.push('/events');
    }; //end handleBack


    //onClick function to CANCEL and go back to PersonsEvents
    const handleCancel= () => {
        // sends user to PersonsEvents page
        history.push('/events');

    }; //end handleContinue



    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={12} sm={6}>
                    <Paper align="center" elevation={4} className={classes.paper}>
                    <Typography variant="h5">What type of cards would you like to consider for this occasion?</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid item xs={6} sm={3}></Grid>
                <Grid align="center" item xs={12} sm={6}>
                    <Paper elevation={4}>
                        <FormControl>
                            <TextField
                                id="edit-person-name"
                                label= "name"
                                placeholder="enter name"
                                type="text"
                                value={ editInput?.name }
                                onChange={(event) => dispatch({ type: 'EDIT_NAME', payload: event.target.value })}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="edit-event-occasion"
                                label= "occasion"
                                placeholder="enter occasion"
                                type="text"
                                value={ editInput?.occasion }
                                onChange={(event) => dispatch({ type: 'EDIT_OCCASION', payload: event.target.value })}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <TextField
                                id="edit-event-date"
                                label= "date"
                                placeholder="enter date"
                                type="date"
                                value={ editInput?.date }
                                onChange={(event) => dispatch({ type: 'EDIT_DATE', payload: event.target.value })}
                                variant="outlined"
                            />
                        </FormControl>
                        <FormControl>
                            <Select
                                id="edit-event-category"
                                label= "category"
                                placeholder="select catagory"
                                type="text"
                                value={ editInput?.category }
                                onChange={(event) => dispatch({ type: 'EDIT_CATEGORY', payload: event.target.value })}
                                variant="outlined"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={'funny'}>Funny</MenuItem>
                                <MenuItem value={'romantic'}>Romantic</MenuItem>
                                <MenuItem value={'depressing'}>Depressing</MenuItem>
                                
                            </Select>
                        </FormControl>
                        
                        <div>
                            <Button variant="outlined" onClick={handleDelete}>
                            DELETE
                            </Button>
                            <Button variant="outlined" onClick={handleUpdate}>
                            UPDATE
                            </Button>
                            <Button variant="outlined" onClick={handleCancel}>
                            CANCEL
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6} sm={3}></Grid>
            </Grid>
        </div>
    )
}