import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Component
import CardCard from "../CardCard/CardCard";

// MUI styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridDiv: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    margin: 10,
  },
}));

// Durstenfeld shuffle, optimized Fisher Yates
function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return [...array];
}

export default function PickACard() {
  // Cards selector
  const unsortedCards = useSelector((store) => store?.cards);
  const event = useSelector((store) => store?.edit[0]);

  // Sort cards by category and occasion for event
  const sortedCards = unsortedCards?.filter((card) => {
    if (
      card?.occasion_id == event?.occasion_id &&
      card?.category_id === event?.category_id
    )
      return card;
  });

  // Shuffled Cards state
  const [cards, setCards] = useState([]);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();

  // Card button title
  const buttonTitle = "Choose this card";

  // Shuffle function call
  const handleShuffle = () => {
    setCards(shuffleCards(sortedCards));
  };

  // UseEffect for GET cards and GET event
  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: "GET_EVENT", payload: id });
  }, []);

  // useEffect for truffle shuffle
  useEffect(() => {
    handleShuffle();
  }, [event]);

    

  return (
    <div className={classes.gridDiv}>
      <Typography gutterBottom align="center" variant="h5" component="h2">
        Tap a card Image to see the inside view
      </Typography>
      <Grid
        container
        spacing={3}
        justify="center"
        alignItems="center"
        className={classes.root}
      >
        {cards?.slice(0, 3).map((card, i) => {
          return (
            <Grow in={true} key={i}>
              <Grid item key={i}>
                <CardCard card={card} buttonTitle={buttonTitle} />
              </Grid>
            </Grow>
          );
        })}
      </Grid>
      <br />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleShuffle}
      >
        Show me new cards
      </Button>
    </div>
  );
}
