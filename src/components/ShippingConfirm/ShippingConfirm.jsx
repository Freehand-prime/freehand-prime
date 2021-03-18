import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//MUI
import {
  Container,
  Card,
  CardContent,
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
  Radio,
  RadioGroup,
} from "@material-ui/core";

// Component
import ShipSubmitDialog from "./ShipSubmitDialog/ShipSubmitDialog";
import CardCard from "../CardCard/CardCard";

//MUI Styling
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    margin: 10,
    padding: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  buttons: {
    margin: 8,
  },
}));

export default function ShippingConfirm() {
  //state
  const [openSubmit, setOpenSubmit] = useState(false);
  const [shipToMe, setShipToMe] = useState("false");

  const page = useParams();

  //hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedEvent = useSelector((store) => store.edit);
  const cards = useSelector((store) => store.cards);
  const occasions = useSelector((store) => store.occasions);
  const categories = useSelector((store) => store.categories);

  const card = cards.filter((card) => {
    if (card.id === selectedEvent.card_id) return card;
  });

  const occasion = occasions.filter((occasion) => {
    if (occasion.id === selectedEvent.occasion_id) return occasion;
  });

  const category = categories.filter((category) => {
    if (category.id === selectedEvent.category_id) return category;
  });

  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: "GET_EVENT", payload: page.id });
    dispatch({ type: "FETCH_OCCASIONS" });
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);

  //click handlers

  const handleConfirm = () => {
    // comment explaining why this is not why it should be
    if (shipToMe === "false") {
      dispatch({ type: "SET_SHIP_TO_ME", payload: true });
    } else if (shipToMe === "true") {
      dispatch({ type: "SET_SHIP_TO_ME", payload: false });
    }
    setOpenSubmit(!openSubmit);
  };

  const handleChange = (event) => {
    setShipToMe(event.target.value);
    console.log(shipToMe);
  }; // end handleChange

  const handleBack = () => {
    console.log("In handleBack");
    //return to pick a card view on back
    history.push(`/card/${page.id}`);
  }; // end handleBack

  return (
    <div className={classes.root}>
      <Container>
        <Paper align="center" elevation={4} className={classes.paper}>
          <Typography variant="h5">Does Everything Look Correct?</Typography>
        </Paper>
        <Card align="center" className={classes.paper}>
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Event Date -{" "}
              {new Date(selectedEvent?.date).toLocaleDateString("en-US")}
            </Typography>
            <Typography variant="h5" component="h2">
              {selectedEvent?.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {occasion[0]?.occasion} | {category[0]?.category}
            </Typography>
          </CardContent>
        </Card>
        <Paper align="center" elevation={4} className={classes.paper}>
          <CardCard card={card[0]} />
        </Paper>
        <Paper align="center" elevation={4} className={classes.paper}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Ship To:</FormLabel>
            <RadioGroup
              aria-label="shipping"
              name="shipping1"
              value={shipToMe}
              onChange={handleChange}
            >
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Ship to Me"
              />
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Ship to Them"
              />
            </RadioGroup>
          </FormControl>
          {shipToMe === "true" ? (
            <FormControl color="secondary">
              <TextField
                id="address_field"
                label="Address"
                color="secondary"
                placeholder="enter address"
                type="text"
                onChange={(event) =>
                  dispatch({
                    type: "SET_ADDRESS",
                    payload: event.target.value,
                  })
                }
                variant="outlined"
              />
            </FormControl>
          ) : (
            <div></div>
          )}
          <FormControl color="secondary">
            <TextField
              id="inscription_field"
              label="Inscription"
              color="secondary"
              placeholder="enter inscription"
              type="text"
              onChange={(event) =>
                dispatch({
                  type: "SET_INSCRIPTION",
                  payload: event.target.value,
                })
              }
              variant="outlined"
            />
          </FormControl>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              className={classes.buttons}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirm}
              className={classes.buttons}
            >
              Submit
            </Button>
          </div>
        </Paper>
      </Container>
      <ShipSubmitDialog
        openSubmit={openSubmit}
        event={selectedEvent}
        personId={selectedEvent?.person_id}
        setOpenSubmit={setOpenSubmit}
        eventId={page.id}
      />
    </div>
  );
}
