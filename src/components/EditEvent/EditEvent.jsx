// React, Router, Redux
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// MUI
import {
  InputLabel,
  Typography,
  MenuItem,
  TextField,
  makeStyles,
  Container,
  FormControl,
  Select,
  Paper,
  Button,
} from "@material-ui/core";

// Custom components
import CardCard from "../CardCard/CardCard";

// MUI style
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(3),
      width: 250,
    },
    "& .MuiSelect-outlined": {
      width: 250,
    },
  },
  titlePaper: {
    margin: 10,
    padding: 10,
    marginTop: 20,
  },
  formPaper: {
    margin: 8,
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  bigButton: {
    margin: 20,
  },
  buttons: {
    margin: 6,
  },
}));

export default function EditEvent() {
  // Redux
  const editInput = useSelector((store) => store.edit);
  const occasions = useSelector((store) => store.occasions);
  const categories = useSelector((store) => store.categories);
  const cards = useSelector((store) => store.cards);

  // Hooks
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const page = useParams();

  // UseEffect for all the things
  useEffect(() => {
    dispatch({ type: "FETCH_CARDS" });
    dispatch({ type: "GET_EVENT", payload: page.id });
    dispatch({ type: "FETCH_OCCASIONS" });
    dispatch({ type: "FETCH_CATEGORIES" });
  }, []);

  // filter for event card
  const card = cards.filter((card) => {
    if (card.id == editInput.card_id) return card;
  });

  //onClick function DELETE an event
  const handleDelete = (id) => {
    dispatch({ type: "DELETE_EVENT", payload: page.id });
    // sends user to PersonsEvents page
    history.push("/dashboard");
  }; //end handleBack

  //onClick function to UPDATE an event
  const handleUpdate = (id) => {
    // triggers SAGA that will save the local changes to database
    dispatch({
      type: "SAVE_EDIT",
      payload: editInput,
    });

    // sends user to PersonsEvents page
    history.push("/dashboard");
  }; //end handleBack

  //onClick function to CANCEL and go back to PersonsEvents
  const handleCancel = () => {
    // sends user to PersonsEvents page
    history.push(`/events/${editInput.person_id}`);
  }; //end handleContinue

  const buttonTitle = "Pick a New Card";

  return (
    <Container>
      {editInput.date && (
        <>
          <Paper align="center" elevation={4} className={classes.titlePaper}>
            <Typography variant="h6">Edit Event</Typography>
          </Paper>
          {card[0] && (
            <center>
              <CardCard
                card={card[0]}
                buttonTitle={buttonTitle}
                eventId={editInput.id}
              />
            </center>
          )}
          <Paper align="center" elevation={4} className={classes.formPaper}>
            <FormControl color="secondary" className={classes.root}>
              <TextField
                id="edit-person-name"
                label="name"
                type="text"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editInput?.name}
                onChange={(event) =>
                  dispatch({
                    type: "EDIT_NAME",
                    payload: event.target.value,
                  })
                }
                variant="outlined"
              />
            </FormControl>
            <br />
            <FormControl
              color="secondary"
              variant="outlined"
              className={classes.root}
            >
              <InputLabel id="select-occasion-label">
                Select Occasion
              </InputLabel>
              <Select
                labelId="select-occasion-label"
                id="event-occasion"
                label="Select Occasion"
                type="text"
                value={editInput?.occasion_id || ""}
                onChange={(event) =>
                  dispatch({
                    type: "EDIT_OCCASION",
                    payload: event.target.value,
                  })
                }
              >
                {occasions.slice(1).map((occasion) => {
                  return (
                    <MenuItem value={occasion.id} key={occasion.id}>
                      {occasion.occasion}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br />
            <FormControl color="secondary" className={classes.root}>
              <TextField
                id="edit-event-date"
                label="date"
                type="date"
                color="secondary"
                InputLabelProps={{
                  shrink: true,
                }}
                value={new Date(editInput?.date).toISOString().split("T")[0]}
                onChange={(event) =>
                  dispatch({
                    type: "EDIT_DATE",
                    payload: event.target.value,
                  })
                }
                variant="outlined"
              />
            </FormControl>
            <br />
            <FormControl variant="outlined" className={classes.root}>
              <InputLabel color="secondary" id="select-category-label">
                Select Category
              </InputLabel>
              <Select
                labelId="select-category-label"
                id="event-category"
                label="Select Category"
                type="text"
                color="secondary"
                value={editInput?.category_id || ""}
                onChange={(event) =>
                  dispatch({
                    type: "EDIT_CATEGORY",
                    payload: event.target.value,
                  })
                }
              >
                {categories.slice(1).map((category) => {
                  return (
                    <MenuItem value={category.id} key={category.id}>
                      {category.category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <br />
            {/* conditionally rendered Select Card Button */}
            <div>
              {card[0] ? (
                <Button
                  className={classes.bigButton}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/shipping/${editInput.id}`)}
                >
                  SHIPPING
                </Button>
              ) : (
                <Button
                  className={classes.bigButton}
                  variant="contained"
                  color="primary"
                  onClick={() => history.push(`/card/${editInput.id}`)}
                >
                  PICK A CARD
                </Button>
              )}
            </div>
            {/* Delete, Update, and Cancel Buttons */}
            <div>
              <Button
                className={classes.buttons}
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                DELETE
              </Button>
              <Button
                className={classes.buttons}
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                UPDATE
              </Button>
              <Button
                className={classes.buttons}
                variant="contained"
                color="secondary"
                onClick={handleCancel}
              >
                CANCEL
              </Button>
            </div>
          </Paper>
        </>
      )}
    </Container>
  );
}
