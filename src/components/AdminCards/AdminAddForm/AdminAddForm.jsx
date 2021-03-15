import React from 'react';
import { useDispatch } from 'react-redux';
import AdminImageUploadDialog from './AdminImageUploadDialog/AdminImageUploadDialog';

  //MUI
import {
    makeStyles,
    Button,
    FormControl,
    TextField,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 300,
    },
    addCardForm: {
        '& .MuiTextField-addCardForm': {
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
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
    button: {
        margin: 10,
    },
    media: {
        height: 140,
    },
}));

export default function AdminAddForm() {
        //state
        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
    const handleImageUploadFront = () => {
        console.log('handleImageUploadFront Clicked');
    }
    const handleImageUploadInside = () => {
        console.log('handleImageUploadInside Clicked');
    }
    const handleSubmit = () => {
        console.log('handleSubmit Clicked');
    }
        //onRender
    return(
        <form className={classes.addCardForm} noValidate onSubmit={handleSubmit}>   
            <Button 
                variant="contained"
                color="default"
                onClick={handleImageUploadFront}
                className={classes.button}
            >
                Upload Front Image
            </Button>
            <Button 
                variant="contained"
                color="default"
                onClick={handleImageUploadInside}
                className={classes.button}
            >
                Upload Inside Image
            </Button>
            {/*Form Fields go Here*/}
            <FormControl>
                <TextField 
                    label="Occasion"
                    id="filled-margin-dense"
                    placeholder="enter occasion"
                    className={classes.textField}
                    helperText="Required"
                    margin="dense"
                    variant="filled"
                />
            </FormControl>
            <FormControl>
                <TextField 
                    label="Category"
                    id="filled-margin-dense"
                    placeholder="enter category"
                    className={classes.textField}
                    helperText="Required"
                    margin="dense"
                    variant="filled"
                />
            </FormControl>
            <FormControl>
                <TextField 
                    label="Artist Name"
                    id="filled-margin-dense"
                    placeholder="enter artist name"
                    className={classes.textField}
                    helperText="Required"
                    margin="dense"
                    variant="filled"
                />
            </FormControl>
            <Button 
                type="submit"
                variant="contained"
                color="primary" 
                className={classes.button}
            >
                ADD CARD
            </Button>
        </form>
    )
}