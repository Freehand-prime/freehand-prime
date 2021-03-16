import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

  //MUI
import {
    makeStyles,
    TableCell,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 300,
    },
    media: {
        height: 140,
    },
    button: {
        margin: 10,
    },
}));

export default function AdminCardTableRowEdit({editFlag, setEditFlag, card, categories, occasions}) {
        //default state object to hold the data passed to the edit function.
    const defaultAddCard = {
        id: card.id,
        image_front: card.image_front,
        image_inside: card.image_inside,
        category_id: card.category_id,
        occasion_id: card.occasion_id,
        artist: card.artist,
        details: card.details
    }
        //state
    const [addCardData, setAddCardData] = useState(defaultAddCard);
        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
    const handleImageUploadFront = () => {
        console.log('handleImageUploadFront Clicked');
        setAddCardData({...addCardData, image_front: card.image_front});
    }
    const handleImageUploadInside = () => {
        console.log('handleImageUploadInside Clicked');
        setAddCardData({...addCardData, image_front: card.image_inside});
    }
    const handleSaveEdit = () => {
        //DEBUG: function status log to console
    console.log('handleEdit Clicked on:', card.id);
        dispatch({type: 'EDIT_CARD', payload: addCardData});
        //flip edit flag to render AdminCardTableRowEdit
    setEditFlag(!editFlag);
    }
    const handleDelete = () => {
        //DEBUG: function status log to console
    console.log('handleDelete Clicked:', card.id);
        //dispatching to card.saga 
    dispatch({type: 'DELETE_CARD', payload: card.id});
    }
        //onRender
    return(
        <>
        <TableCell className={classes.root}>
            <Button 
                variant="contained"
                color="default"
                onClick={handleImageUploadFront}
                className={classes.button}
            >
                Upload Front Image
            </Button>
        </TableCell>
        <TableCell>
            <Button 
                variant="contained"
                color="default"
                onClick={handleImageUploadInside}
                className={classes.button}
            >
                Upload Inside Image
            </Button>
        </TableCell>
        <TableCell>
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
        </TableCell>
        <TableCell>
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
        </TableCell>
        <TableCell>{card.likes}</TableCell>
        <TableCell>
            <FormControl>
                <InputLabel>Artist</InputLabel>
                <TextField 
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
        </TableCell>
        <TableCell>
            <FormControl>
                <InputLabel>Details</InputLabel>
                <TextField 
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
        </TableCell>
        <TableCell>
            <Button 
                variant="contained"
                color="primary"
                onClick={handleSaveEdit}
            >
                SAVE
            </Button>
        </TableCell>
        <TableCell>
            <Button 
                variant="contained"
                color="secondary"
                onClick={handleDelete}
            >
                DELETE
            </Button>
        </TableCell>
        </>
    )
}