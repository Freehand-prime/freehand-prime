// React
import React, { useState } from "react";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Component
import ConfirmDialog from "./ConfirmDialog/ConfirmDialog";

// MUI styling
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 300,
  },
}));

export default function CardCard({ card, buttonTitle, eventId }) {
  // Confirm dialog state
  const [openConfirm, setOpenConfirm] = useState(false);

  // Swap image state
  const [showInside, setShowInside] = useState(false);

  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea onClick={() => setShowInside(!showInside)}>
          {showInside ? (
            <CardMedia
              component="img"
              alt={card.details}
              height="100%"
              width="100%"
              image={card.image_inside}
              title="Card Inside"
            />
          ) : (
            <CardMedia
              component="img"
              alt={card.details}
              height="100%"
              width="100%"
              image={card.image_front}
              title="Card Front"
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Card by {card.artist}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.details}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {buttonTitle && (
            <Button
              size="small"
              color="primary"
              onClick={() => setOpenConfirm(!openConfirm)}
            >
              {buttonTitle}
            </Button>
          )}
        </CardActions>
      </Card>
      <ConfirmDialog
        openConfirm={openConfirm}
        setOpenConfirm={setOpenConfirm}
        cardId={card.id}
        eventId={eventId}
      />
    </>
  );
}
