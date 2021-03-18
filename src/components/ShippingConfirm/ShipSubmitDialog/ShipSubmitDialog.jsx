import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@material-ui/core";

// Transition on mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShipSubmitDialog({
  openSubmit,
  setOpenSubmit,
  personId,
  event,
  eventId,
}) {
  //hooks
  const dispatch = useDispatch();
  const history = useHistory();
  // const event = useSelector((store) => store.event);
  const person = useSelector((store) => store.person);

  //click handlers
  const handleSubmit = () => {
    //close dialog
    setOpenSubmit(false);
    dispatch({
      type: "UPDATE_SHIPPING",
      payload: { event, person, personId, eventId },
    });
    //TODO: dispatch for an order (If we want one to show on admin page)

    //redirect to dashboard after order submitted
    history.push("/dashboard");
  };

  const handleBack = () => {
    //close dialog
    setOpenSubmit(false);
  };

  return (
    <>
      <Dialog
        open={openSubmit}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleBack}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Confirm Order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your card will be shipped to{" "}
            {event.ship_to_me ? <>YOU</> : <>{event?.name} at {person?.address}</>}
          </DialogContentText>
          <DialogContentText>
            We will make sure it gets delivered on {new Date(event?.date).toLocaleDateString('en-US')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBack} color="secondary">
            Back
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
