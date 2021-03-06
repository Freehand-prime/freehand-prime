// React, Redux
import React, { useState } from "react";
import { useDispatch } from "react-redux";

//MUI
import {
  makeStyles,
  Button,
  FormControl,
  TextField,
  Select,
  InputLabel,
  FormHelperText,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import MuiAlert from "@material-ui/lab/Alert";
import AddIcon from "@material-ui/icons/Add";

// Custom components
import S3Uploader from "../../S3Uploader/S3Uploader";

// Alert for confirmation snackbar
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// MUI style
const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 140,
    marginTop: 20,
    marginLeft: 15,
  },
  button: {
    margin: 15,
    marginTop: 25,
  },
}));

export default function AdminAddForm({ occasions, categories }) {
  //default state object to hold add form data
  const defaultAddCard = {
    image_front: "",
    image_inside: "",
    category_id: "",
    occasion_id: "",
    artist: "",
    details: "",
  };
  //state
  const [addCardData, setAddCardData] = useState(defaultAddCard);
  const [alert, setAlert] = useState(false);

  //hooks
  const dispatch = useDispatch();
  const classes = useStyles();
  //functions
  const handleSubmit = (event) => {
    event.preventDefault();
    setAlert(true);
    //dispatch POST to cards.saga with form data
    dispatch({ type: "ADD_CARD", payload: addCardData });
    //reset the default add card data after submit
    setAddCardData(defaultAddCard);
  };

  // Handle alert close
  const handleAlertClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*Form Fields go Here*/}
        {categories ? (
          <>
            <FormControl className={classes.formControl}>
              <S3Uploader
                addCardData={addCardData}
                setAddCardData={setAddCardData}
                image={"Front"}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <S3Uploader
                addCardData={addCardData}
                setAddCardData={setAddCardData}
                image={"Inside"}
              />
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel color="secondary" id="select-occasion-label">
                Occasion
              </InputLabel>
              <Select
                labelId="select-occasion-label"
                label="Occasion"
                required
                type="text"
                color="secondary"
                value={addCardData.occasion_id}
                onChange={(event) =>
                  setAddCardData({
                    ...addCardData,
                    occasion_id: event.target.value,
                  })
                }
              >
                {occasions?.map((occasion) => (
                  <MenuItem key={occasion.id} value={occasion.id}>
                    {occasion.occasion}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select</FormHelperText>
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel color="secondary" id="select-category-label">
                Category
              </InputLabel>
              <Select
                labelId="select-category-label"
                label="Category"
                required
                type="text"
                color="secondary"
                value={addCardData.category_id}
                onChange={(event) =>
                  setAddCardData({
                    ...addCardData,
                    category_id: event.target.value,
                  })
                }
              >
                {categories?.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.category}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="Artist Name"
                variant="outlined"
                value={addCardData.artist}
                onChange={(event) =>
                  setAddCardData({ ...addCardData, artist: event.target.value })
                }
              />
              <FormHelperText>Enter Artist Name</FormHelperText>
            </FormControl>
            <FormControl className={classes.formControl}>
              <TextField
                label="Details"
                variant="outlined"
                value={addCardData.details}
                onChange={(event) =>
                  setAddCardData({
                    ...addCardData,
                    details: event.target.value,
                  })
                }
              />
              <FormHelperText>Enter Card Description</FormHelperText>
            </FormControl>
          </>
        ) : (
          <></>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
        >
          <AddIcon />
          ADD CARD
        </Button>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        autoHideDuration={8000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} variant="filled" severity="success">
          <AlertTitle>Success</AlertTitle>
          New card has been added successfully
        </Alert>
      </Snackbar>
    </>
  );
}
