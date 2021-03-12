import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminImageUploadDialog from './AdminImageUploadDialog/AdminImageUploadDialog';
import AdminCardTableRow from './AdminCardTableRow/AdminCardTableRow';
import classes from '*.module.css';

  //MUI
import { 
  Grid,
  Typography,
  TextField, 
  makeStyles,
  InputLabel,
  FormControl,
  FormLabel,
  FormControlLabel,
  Select,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';



  //MUI Styling
const useStyles = makeStyles((theme) => ({
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
    displayCardTable: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        padding: 20,
    },
    tableRow: {
        justifyContent: "center"
    }
}));

/*
Two image upload buttons, one for the front of the card and one for the inside of the card, 
drop downs to select an occasion and category for the card, and text fields for the artist 
name and a brief description. The submit button adds the new card to the database. 

The table below shows all available cards, with buttons to edit and delete each card. 
Clicking the Delete button deletes the card from the database. Clicking the Edit button 
populates the input fields with the card information. The Submit button saves changes.
*/
export default function AdminCards() {
        //state
        //hooks
    const allCards = useSelector((store) => store?.cards);
        //functions
    const handleImageUploadFront = () => {
        console.log('handleImageUploadFront Clicked');
    }
    const handleImageUploadInside = () => {
        console.log('handleImageUploadInside Clicked');
    }
    const handleSubmit = () => {
        console.log('handleSubmit Clicked');
    }
        //onRender (need to call on every dispatch so we can continouously fetch changes to the cards database)
    useEffect(() => {
        dispatch({type: 'FETCH_CARDS'});
    }, [dispatch]);
    return (
    <>
        <form className={classes.addCardForm}>   
            <Button 
                variant="outlined" 
                onClick={handleImageUploadFront}
            >
                Upload Front Image
            </Button>
            <Button 
                variant="outlined" 
                onClick={handleImageUploadInside}
            >
                Upload Inside Image
            </Button>
            <Button 
                variant="outlined" 
                onClick={handleSubmit}
            >
                SUBMIT
            </Button>
        </form>
        <div className={classes.displayCardTable}>
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Front Image</TableCell>
                    <TableCell>Inside Image</TableCell>
                    <TableCell>Occasion</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Artist</TableCell>
                    {/*If we really want to give the edit and delete rows titles add them here*/}
                </TableRow>
                </TableHead>
                <TableBody >
                {allCards.map((card) => (
                    <>
                        <TableRow key={ card.id } className={classes.tableRow}>
                            <AdminCardTableRow card={card}/>
                        </TableRow> 
                    </>
                    )
                )}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
    </>
    )
}