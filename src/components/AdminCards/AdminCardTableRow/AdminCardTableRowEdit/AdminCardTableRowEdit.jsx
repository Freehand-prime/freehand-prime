import React from 'react';
import { useDispatch } from 'react-redux';

  //MUI
import {
    makeStyles,
    TableCell,
    Button,
    Card,
    CardMedia,
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
    const handleSaveEdit = () => {
        //DEBUG: function status log to console
    console.log('handleEdit Clicked on:', card.id);
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
        <TableCell>{card.occasion_id}</TableCell>
        <TableCell>{card.category_id}</TableCell>
        <TableCell>{card.artist}</TableCell>
        <TableCell>{card.details}</TableCell>
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