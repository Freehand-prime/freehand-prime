import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import S3Uploader from '../../../S3Uploader/S3Uploader';

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
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

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
        //default state object to hold the data passed to the edit function on card prop.
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
    const handleSaveEdit = (event) => {
        event.preventDefault();
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
            < S3Uploader addCardData={addCardData} setAddCardData={setAddCardData} image={'front'}/>
        </TableCell>
        <TableCell>
            < S3Uploader addCardData={addCardData} setAddCardData={setAddCardData} image={'inside'}/>
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