import React from 'react';
import { useDispatch } from 'react-redux';

  //MUI
import { 
  Button,
  TableCell
} from '@material-ui/core';

export default function AdminCardTableRow({card}) {
        //state
        //hooks
    const dispatch = useDispatch();
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
            <TableCell>Front Image</TableCell>
            <TableCell>Inside Image</TableCell>
            <TableCell>Occasion</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Artist</TableCell>
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