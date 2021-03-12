import React from 'react';
import { useDispatch } from 'react-redux';
import AdminCardTableRowCard from './AdminCardTableRowCard/AdminCardTableRowCard';

  //MUI
import {
    makeStyles,
    Button,
    TableCell,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 300,
    },
}));

export default function AdminCardTableRow({card}) {
        //state
        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
    const handleEdit = () => {
        console.log('handleEdit Clicked on:', card.id);
    }
    const handleDelete = () => {
        console.log('handleDelete Clicked:', card.id);
    }
        //onRender
    return(
        <>
        {/*This component will render each row of cards and handle edit and delete*/}
            <TableCell className={classes.root}>
                <AdminCardTableRowCard image={card.image_front}/>
            </TableCell>
            <TableCell>
                <AdminCardTableRowCard image={card.image_inside}/>
            </TableCell>
            <TableCell>{card.occasion_id}</TableCell>
            <TableCell>{card.category_id}</TableCell>
            <TableCell>{card.artist}</TableCell>
            <TableCell>
                <Button 
                    variant="outlined"
                    color="primary"
                    onClick={handleEdit}
                >
                    EDIT
                </Button>
            </TableCell>
            <TableCell>
                <Button 
                    variant="outlined"
                    color="secondary"
                    onClick={handleDelete}
                >
                    DELETE
                </Button>
            </TableCell>
        </>
    )
}