// React, Redux, Router
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import {
  makeStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";

// Custom components
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

// MUI style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 300,
  },
}));

export default function CardCard({ card, buttonTitle, eventId }) {
  // Confirm dialog state
  const [openConfirm, setOpenConfirm] = useState(false);
  // Existing card for event state
  const [cardPicked, setCardPicked] = useState(false);
  // Swap image state
  const [showInside, setShowInside] = useState(false);

  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  // Check card button for additional conditional
  const checkCard = () => {
    if (buttonTitle === "Pick a New Card") {
      setCardPicked(true);
    }
  };

  // Check card button on component mount
  useEffect(() => {
    checkCard();
  }, []);

  // Handle confirmation
  const handleConfirm = () => {
    dispatch({ type: "PICK_CARD", payload: card?.id });
    setOpenConfirm(!openConfirm);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={() => setShowInside(!showInside)}>
          {showInside ? (
            <CardMedia
              component="img"
              alt={card?.details}
              height="100%"
              width="100%"
              image={card?.image_inside}
              title="Card Inside"
            />
          ) : (
            <CardMedia
              component="img"
              alt={card?.details}
              height="100%"
              width="100%"
              image={card?.image_front}
              title="Card Front"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Card by {card?.artist}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {card?.details}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {buttonTitle && (
            <>
              {cardPicked ? (
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => history.push(`/card/${eventId}`)}
                >
                  {buttonTitle}
                </Button>
              ) : (
                <Button size="small" color="secondary" onClick={handleConfirm}>
                  {buttonTitle}
                </Button>
              )}
            </>
          )}
        </CardActions>
      </Card>
      <ConfirmDialog
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        eventId={eventId}
      />
    </>
  );
}
