import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// MUI
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from "@material-ui/core/Button";

    // Transition on mount
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ openConfirm, setOpenConfirm }) {
        //hooks
    const dispatch = useDispatch();
    const history = useHistory();

        //click handlers
    const handleConfirm = () => {
        //close dialog
    setOpenConfirm(false);

        //TODO: dispatch for an order (If we want one to show on admin page)

        //redirect to dashboard after order submitted
    history.push("/dashboard");
    };

    const handleCancel = () => {
            //close dialog
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
            {"Confirm Order?"}
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            Placeholder for passed summary of order.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCancel} color="inherit">
            Cancel
            </Button>
            <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm
            </Button>
        </DialogActions>
        </Dialog>
    </>
    );
}