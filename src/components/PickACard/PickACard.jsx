// React, Redux, Router
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

// MUI
import {
  makeStyles,
  Grid,
  Grow,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";

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
  // Shuffled Cards state
  const [cards, setCards] = useState([]);

  // Cards selector
  const unsortedCards = useSelector((store) => store?.cards);
  // Event selector
  const event = useSelector((store) => store?.edit);

  // Card button title
  const buttonTitle = "Choose this card";

  // Sort cards by category and occasion for event
  const sortedCards = unsortedCards?.filter((card) => {
    if (
      card?.occasion_id == event?.occasion_id &&
      card?.category_id === event?.category_id
    )
      return card;
  });

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  // Shuffle function call
  const handleShuffle = () => {
    setCards(shuffleCards(sortedCards));
  };

  // Handle back
  const handleBack = () => {
    history.push(`/edit/${id}`);
  };

  // UseEffect for GET cards and GET event
  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: "GET_EVENT", payload: id });
  }, []);

  // UseEffect for truffle shuffle
  useEffect(() => {
    handleShuffle();
  }, [event]);

  return (
    <div className={classes.gridDiv}>
      <Paper align="center" elevation={4} className={classes.titlePaper}>
        <Typography gutterBottom align="center" variant="h5" component="h2">
          Tap a card image to see the inside view
        </Typography>
      </Paper>
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
                <CardCard card={card} buttonTitle={buttonTitle} eventId={id} />
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
            color="primary"
            onClick={handleShuffle}
          >
            Show me new cards
          </Button>
          <br />
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleBack}
          >
            Edit Event Details
          </Button>
        </center>
      </div>
    </div>
  );
}
