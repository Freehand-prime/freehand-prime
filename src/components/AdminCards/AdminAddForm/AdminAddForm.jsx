import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

  //MUI
import {
    makeStyles,
    Button,
    FormControl,
    TextField,
    Select,
    InputLabel,
    FormHelperText,
    MenuItem,
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

export default function AdminAddForm({occasions, categories}) {
        //state
        //hooks
    const addCardData = useSelector((store) => store.addCard);
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
            //dispatch POST to cards.saga with form data
        dispatch({type: 'ADD_CARD', payload: addCardData});
    }
        //onRender
    return(
        <form className={classes.addCardForm} noValidate onSubmit={handleSubmit}>   
            <Button 
                variant="contained"
                color="default"
                required
                onClick={handleImageUploadFront}
                className={classes.button}
            >
                Upload Front Image
            </Button>
            <Button 
                variant="contained"
                color="default"
                required
                onClick={handleImageUploadInside}
                className={classes.button}
            >
                Upload Inside Image
            </Button>
            {/*Form Fields go Here*/}
            {categories? 
            <>
            <FormControl>
                <InputLabel>Occasion</InputLabel>
                <Select 
                    label="Occasion"
                    placeholder="enter occasion"
                    helpertext="Required"
                    required
                    value={addCardData.occasion_id}
                    onChange={(event) => 
                        dispatch({ type: 'SET_ADD_CARD_OCCASION_ID', payload: event.target.value})
                    }
                >
                    {occasions?.map((occasion) => (
                            <MenuItem 
                                key={occasion.id} 
                                value={occasion.id} 
                                primarytext={occasion.occasion} 
                            />
                        )
                    )}
                </Select>
                <FormHelperText>Select</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select 
                    label="Category"
                    placeholder="enter category"
                    helpertext="Required"
                    required
                    value={addCardData.category_id}
                    onChange={(event) => 
                        dispatch({ type: 'SET_ADD_CARD_CATEGORY_ID', payload: event.target.value})
                    }
                >
                    {categories?.map((category) => (
                            <MenuItem 
                                key={category.id} 
                                value={category.id} 
                                primarytext={category.category} 
                            />
                        )
                    )}
                </Select>
                <FormHelperText>Select</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel>Artist</InputLabel>
                <TextField 
                    label="Artist Name"
                    id="filled-margin-dense"
                    placeholder="enter artist name"
                    className={classes.textField}
                    helpertext="Required"
                    required
                    margin="dense"
                    variant="filled"
                    value={addCardData.artist}
                    onChange={(event) => 
                        dispatch({type: 'SET_ADD_CARD_ARTIST', payload: event.target.value})
                    }
                />
            </FormControl>
            <FormControl>
                <InputLabel>Details</InputLabel>
                <TextField 
                    label="Details"
                    id="filled-margin-dense"
                    placeholder="enter artist name"
                    className={classes.textField}
                    helpertext="Required"
                    required
                    margin="dense"
                    variant="filled"
                    value={addCardData.details}
                    onChange={(event) => 
                        dispatch({type: 'SET_ADD_CARD_DETAILS', payload: event.target.value})
                    }
                />
            </FormControl>
            </>
            : 
            <>
            </>}
            
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