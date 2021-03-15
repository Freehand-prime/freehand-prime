import React, {useState}  from 'react';
import { useDispatch } from 'react-redux';
import AdminCardTableRowCard from './AdminCardTableRowCard/AdminCardTableRowCard';
import AdminCardTableRowEdit from './AdminCardTableRowEdit/AdminCardTableRowEdit';

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

export default function AdminCardTableRow({card, categories, occasions}) {
        //state
    const [editFlag, setEditFlag] = useState(false);
        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
    const handleEdit = () => {
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
        {/*This component will render each row of cards and handle edit and delete*/}
            { editFlag ?
            <AdminCardTableRowEdit card={card} categories={categories} occasions={occasions} editFlag={editFlag} />
            :
            //will a frag work here?
            <>
            <TableCell className={classes.root}>
                <AdminCardTableRowCard image={card.image_front}/>
            </TableCell>
            <TableCell>
                <AdminCardTableRowCard image={card.image_inside}/>
            </TableCell>
            {/*-1 required below since we're mapping a serial to an array id*/}
            <TableCell>{occasions[card.occasion_id-1]?.occasion}</TableCell>
            <TableCell>{categories[card.category_id-1]?.category}</TableCell>
            <TableCell>{card.likes}</TableCell>
            <TableCell>{card.artist}</TableCell>
            <TableCell>{card.details}</TableCell>
            <TableCell>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                >
                    EDIT
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
            }
        </>        
    )
}