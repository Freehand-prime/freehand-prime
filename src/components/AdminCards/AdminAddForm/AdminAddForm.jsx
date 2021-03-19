import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import S3Uploader from '../../S3Uploader/S3Uploader';
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
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    addCardForm: {
        formControl: {
          margin: theme.spacing(1),
          minWidth: 400,
        },
        selectEmpty: {
          marginTop: theme.spacing(2),
        },
    },
    button: {
        margin: 10,
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
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('handleSubmit Clicked');
            //dispatch POST to cards.saga with form data
        dispatch({type: 'ADD_CARD', payload: addCardData});
            //reset the default add card data after submit
        setAddCardData(defaultAddCard);
    }

    return(
        <form onSubmit={handleSubmit}>   
            < S3Uploader addCardData={addCardData} setAddCardData={setAddCardData} image={'front'}/>

            < S3Uploader addCardData={addCardData} setAddCardData={setAddCardData} image={'inside'}/>

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
                <AddIcon/>
                ADD CARD
            </Button>
        </form>
    )
}