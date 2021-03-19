import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AdminCardTableRow from './AdminCardTableRow/AdminCardTableRow';
import AdminAddForm from './AdminAddForm/AdminAddForm';

  //MUI
import { 
  makeStyles,
  Paper,
  Container,
  Grid,
  Typography,
  Box,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@material-ui/core';

  //MUI Styling
const useStyles = makeStyles((theme) => ({
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
    const [isLoaded, setIsLoaded] = useState(false);

        //hooks
    const allCards = useSelector((store) => store?.cards);
    const allCategories = useSelector((store) => store?.categories);
    const allOccasions = useSelector((store) => store?.occasions);
    const dispatch = useDispatch();
    const classes = useStyles();

        //functions
    const fetchData = () => {
        dispatch({type: 'FETCH_ADMIN_CARDS'});
        setIsLoaded(true);
    }
        //onRender (need to call on every dispatch so we can continouously fetch changes to the cards database)
    useEffect(() => {
            //GET to fill cards, categories, and occasions
        fetchData();
            //rerender on every dispatch
    }, [dispatch]);
    return (
        <div>
            { isLoaded ? 
            <>
                <br></br>
                <Typography align="center" variant="h5">
                Manage Cards
                </Typography>
                <br></br>

                    <Container item xs={12} sm={6}>
                        <Paper>
                            <AdminAddForm categories={allCategories} occasions={allOccasions}/>
                        </Paper>
                    </Container>
                    <Container>
                        <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Front Image</TableCell>
                                <TableCell>Inside Image</TableCell>
                                <TableCell>Occasion</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Artist</TableCell>
                                <TableCell>Details</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allCards.map((card) => (
            
                                    <TableRow key={ card.id }>
                                        <AdminCardTableRow card={card} categories={allCategories} occasions={allOccasions}/>
                                    </TableRow> 
                                )
                            )}
                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Container>
            </> 
            :
            <h1>Loading {console.log(isLoaded)}</h1>
            }
        </div>
    )
}