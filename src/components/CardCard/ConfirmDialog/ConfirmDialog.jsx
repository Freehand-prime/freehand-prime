// React, Redux, Router
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

// Transition on mount
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({
  openConfirm,
  setOpenConfirm,
  eventId,
}) {
  // Hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const selectedEvent = useSelector((store) => store.edit);

  // Confirm card handler
  const handleConfirm = () => {
    setOpenConfirm(false);
    dispatch({ type: "SAVE_EDIT", payload: selectedEvent });
    history.push(`/shipping/${eventId}`);
  };

  // Cancel handler
  const handleCancel = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <Dialog
        open={openConfirm}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCancel}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Select this card?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure this is the card you want to select?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Go Back
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Select this card
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
