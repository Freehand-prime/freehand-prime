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
    TextField
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    selectEmpty: {
    marginTop: theme.spacing(1),
    },
  formControl: {
      minWidth: 140,
      marginTop: 20,
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
        dispatch({type: 'EDIT_CARD', payload: addCardData});
        //flip edit flag to render AdminCardTableRowEdit
    setEditFlag(!editFlag);
    }
    const handleDelete = () => {
        //dispatching to card.saga 
    dispatch({type: 'DELETE_CARD', payload: card.id});
    }
        //onRender
    return(
        <>
        <TableCell className={classes.root}>
            < S3Uploader addCardData={addCardData} setAddCardData={setAddCardData} image={'front'} />
        </TableCell>
        <TableCell>
            < S3Uploader addCardData={addCardData} setAddCardData={setAddCardData} image={'inside'} />
        </TableCell>
        <TableCell>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel color="secondary" id="select-occasion-edit-label">Occasion</InputLabel>
                <Select 
                    labelId="select-occasion-edit-label"
                    label="Occasion"
                    required
                    type="text"
                    color="secondary"
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
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel color="secondary" id="select-category-edit-label">Category</InputLabel>
                <Select
                    labelId="select-category-edit-label"
                    label="Occasion"
                    required
                    type="text"
                    color="secondary"
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
            <FormControl className={classes.formControl}>
                <TextField 
                    required
                    label="Artist Name"
                    variant="outlined"
                    value={addCardData.artist}
                    onChange={(event) => setAddCardData({...addCardData, artist: event.target.value})}
                />
                <FormHelperText>Enter Artist Name</FormHelperText>
            </FormControl>
        </TableCell>
        <TableCell>
            <FormControl className={classes.formControl}>
                <TextField 
                    required
                    label="Details"
                    variant="outlined"
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
                <SaveIcon/>
                SAVE
            </Button>
        </TableCell>
        <TableCell>
            <Button 
                
                variant="contained"
                color="secondary"
                onClick={handleDelete} 
            >
                <DeleteIcon/>
                DELETE
            </Button>
        </TableCell>
        </>
    )
}