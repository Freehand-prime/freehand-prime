import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

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
}));

const allCards = [
  {
    id: 0,
    occasion_id: 0,
    category_id: 0,
    image_front: "./front.jpeg",
    image_inside: "./inside.jpeg",
    likes: 27,
    artist: "Bean",
    details: "A card by a bean, with a fox, and some words. So artisan.",
  },
  {
    id: 1,
    occasion_id: 1,
    category_id: 1,
    image_front: "./front.jpeg",
    image_inside: "./inside.jpeg",
    likes: 0,
    artist: "Bean",
    details: "A card by a bean, with a fox, and some words. So artisan.",
  },
  {
    id: 2,
    occasion_id: 2,
    category_id: 2,
    image_front: "./front.jpeg",
    image_inside: "./inside.jpeg",
    likes: 12,
    artist: "Bean",
    details: "A card by a bean, with a fox, and some words. So artisan.",
  },
  {
    id: 3,
    occasion_id: 3,
    category_id: 3,
    image_front: "./front.jpeg",
    image_inside: "./inside.jpeg",
    likes: 4,
    artist: "Bean",
    details: "A card by a bean, with a fox, and some words. So artisan.",
  },
  {
    id: 4,
    occasion_id: 4,
    category_id: 4,
    image_front: "./front.jpeg",
    image_inside: "./inside.jpeg",
    likes: 9,
    artist: "Bean",
    details: "A card by a bean, with a fox, and some words. So artisan.",
  },
  {
    id: 5,
    occasion_id: 5,
    category_id: 5,
    image_front: "./front.jpeg",
    image_inside: "./inside.jpeg",
    likes: 42,
    artist: "Bean",
    details: "A card by a bean, with a fox, and some words. So artisan.",
  },
];

export default function PickACard() {
  // Cards selector
  // const allCards = useSelector((store) => store?.cards);

  // Hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  // Card button title
  const buttonTitle = "Select";

  // UseEffect for GET cards
  // useEffect(() => {
  //   dispatch({
  //     type: "FETCH_CARDS",
  //   });
  // }, []);


  // Durstenfeld shuffle, optimized Fisher Yates
  const shuffleCards = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const cards = shuffleCards(allCards);

  return (
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
                <p>{card.id}</p>
              </Grid>
            </Grow>
          );
        })}
      </Grid>
    </div>
  );
}
