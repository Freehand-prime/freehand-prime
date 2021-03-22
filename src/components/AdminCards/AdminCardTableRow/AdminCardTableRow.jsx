import React, {useState}  from 'react';
import { useDispatch } from 'react-redux';
import AdminCardTableRowCard from './AdminCardTableRowCard/AdminCardTableRowCard';
import AdminCardTableRowEdit from './AdminCardTableRowEdit/AdminCardTableRowEdit';

  //MUI
import {
    makeStyles,
    Button,
    TableCell,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
}));

export default function AdminCardTableRow({card, categories, occasions}) {
        //state
    const [editFlag, setEditFlag] = useState(false);
        //hooks
    const dispatch = useDispatch();
    const classes = useStyles();
        //functions
    const handleEdit = () => {
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
        {/*This component will render each row of cards and handle edit and delete*/}
            { editFlag ?
            <AdminCardTableRowEdit card={card} categories={categories} occasions={occasions} editFlag={editFlag} setEditFlag={setEditFlag} />
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
            <TableCell>{card.occasion}</TableCell>
            <TableCell>{card.category}</TableCell>
            <TableCell>{card.artist}</TableCell>
            <TableCell>{card.details}</TableCell>
            <TableCell>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={handleEdit}
                >
                    <EditIcon/>
                    EDIT
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
            }
        </>        
    )
}