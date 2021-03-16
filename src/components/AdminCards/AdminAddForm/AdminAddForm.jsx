import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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
        //default state object to hold add form data
    const defaultAddCard = {
        image_front: '',
        image_inside: '',
        category_id: '',
        occasion_id: '',
        artist: '',
        details: ''
    }
        //state
    const [addCardData, setAddCardData] = useState(defaultAddCard);

        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
    const handleImageUploadFront = () => {
        console.log('handleImageUploadFront Clicked');
        //hard-coded to first card images until image upload implemented
        setAddCardData({...addCardData, image_front: 'https://freehand-prime.s3.us-east-2.amazonaws.com/card1front.jpeg'})
    }
    const handleImageUploadInside = () => {
        console.log('handleImageUploadInside Clicked');
            //hard-coded to first card images until image upload implemented
        setAddCardData({...addCardData, image_inside: 'https://freehand-prime.s3.us-east-2.amazonaws.com/card1inside.jpeg'})
    }
    const handleSubmit = () => {
        console.log('handleSubmit Clicked');
            //dispatch POST to cards.saga with form data
        dispatch({type: 'ADD_CARD', payload: addCardData});
            //reset the default add card data after submit
        setAddCardData(defaultAddCard);
    }

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
                    helpertext="Required"
                    required
                    defaultValue = "1"
                    value={addCardData.occasion_id}
                    onChange={(event) => setAddCardData({...addCardData, occasion_id: event.target.value})}
                >
                {occasions?.map((occasion) => (
                        <MenuItem 
                            key={occasion.id} 
                            value={occasion.id} 
                        >
                            {occasion.occasion}
                        </MenuItem>
                    )
                )}
                </Select>
                <FormHelperText>Select</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel>Category</InputLabel>
                <Select 
                    helpertext="Required"
                    required
                    defaultValue = "1"
                    value={addCardData.category_id}
                    onChange={(event) => setAddCardData({...addCardData, category_id: event.target.value})}
                >
                    {categories?.map((category) => (
                            <MenuItem 
                                key={category.id} 
                                value={category.id} 
                            >
                                {category.category}
                            </MenuItem>
                        )
                    )}
                </Select>
                <FormHelperText>Select</FormHelperText>
            </FormControl>
            <FormControl>
                <InputLabel>Artist</InputLabel>
                <TextField 
                    id="filled-margin-dense"
                    className={classes.textField}
                    helpertext="Required"
                    required
                    margin="dense"
                    variant="filled"
                    value={addCardData.artist}
                    onChange={(event) => setAddCardData({...addCardData, artist: event.target.value})}
                />
                <FormHelperText>Enter Artist Name</FormHelperText>
            </FormControl>

            <FormControl>
                <InputLabel>Details</InputLabel>
                <TextField 
                    id="filled-margin-dense"
                    className={classes.textField}
                    helpertext="Required"
                    required
                    margin="dense"
                    variant="filled"
                    value={addCardData.details}
                    onChange={(event) => setAddCardData({...addCardData, details: event.target.value})}
                />
                <FormHelperText>Enter Card Description</FormHelperText>
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