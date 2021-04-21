// React, Redux, Router
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import {
  makeStyles,
  Grid,
  Grow,
  Button,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

// Custom components
import CardCard from "../CardCard/CardCard";

// MUI style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 10,
  },
  button: {
    margin: 8,
  },
  titlePaper: {
    margin: 15,
    padding: 10,
    marginTop: 5,
  },
  buttonDiv: {
    marginTop: 20,
  },
  searchPaper: {
    marginBottom: 20,
    alignItems: "center",
  },
}));

export default function CardBrowser() {

  // State for search
  const [search, setSearch] = useState(null);

  // Cards selector
  const unsortedCards = useSelector((store) => store?.cards);
  // User selector
  const user = useSelector((store) => store.user);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();


  // Handle back
  const handleBack = () => {
    if (user.id) {
      history.push(`/dashboard`)
    } else {
      history.push(`/home`);
    }
  };

  // UseEffect for GET cards
  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
  }, []);

  // SEARCH function
  const cards = unsortedCards.filter((card) => {
    if (search == null) return unsortedCards;
    else if (card?.artist?.toLowerCase().includes(search.toLowerCase()) || card?.details?.toLowerCase().includes(search.toLowerCase()))
      return card;
  });

  return (
    <>
      <div className={classes.gridDiv}>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography gutterBottom align="center" variant="h5" component="h2">
          Tap a card image to see the inside view
        </Typography>
      </Paper>
      </div>
      <div className={classes.gridDiv}>
      <Grow in={true}>
        <Paper component="form" className={classes.searchPaper}>
          <TextField
            id="search"
            placeholder="Search"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>
      </Grow>
      </div>
      <div className={classes.gridDiv}>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {cards?.map((card, i) => {
          return (
            <Grow in={true} key={i}>
              <Grid item key={i}>
                <CardCard card={card} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>
      <br />
      <div className={classes.buttonDiv}>
        <center>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleBack}
          >
            Exit Gallery
          </Button>
        </center>
      </div>
    </div>
    </>
  );
}
