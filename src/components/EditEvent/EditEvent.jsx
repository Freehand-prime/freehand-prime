import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  MenuItem,
  TextField,
  makeStyles,
  InputLabel,
  FormControl,
  Select,
  Paper,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function EditEvent() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const page = useParams();

  const editInput = useSelector((store) => store.edit);
  const occasions = useSelector((store) => store.occasions);
  const categories = useSelector((store) => store.categories);

  useEffect(() => {
    dispatch({ type: 'GET_EVENT', payload: page.id });
    dispatch({ type: 'FETCH_OCCASIONS' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, []);

  //onClick function DELETE an event
  const handleDelete = (id) => {
    console.log('clicked handleDelete');
    dispatch({ type: 'DELETE_MEDIA', payload: id });
    // sends user to PersonsEvents page
    history.push('/events');
  }; //end handleBack

  //onClick function to UPDATE an event
  const handleUpdate = (id) => {
    // triggers SAGA that will save the local changes to database
    dispatch({
      type: 'SAVE_EDIT',
      payload: editInput,
    });

    // sends user to PersonsEvents page
    history.push('/events');
  }; //end handleBack

  //onClick function to CANCEL and go back to PersonsEvents
  const handleCancel = () => {
    // sends user to PersonsEvents page
    history.push('/events');
  }; //end handleContinue

  console.log(editInput?.date)

  return (
    <div className={classes.root}>
      {editInput.date && (
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}></Grid>
          <Grid item xs={12} sm={6}>
            <Paper align="center" elevation={4} className={classes.paper}>
              <Typography variant="h6">Edit Event</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}></Grid>
          <Grid item xs={6} sm={3}></Grid>
          <Grid align="center" item xs={12} sm={6}>
            <Paper elevation={4}>
              <FormControl>
                <TextField
                  id="edit-person-name"
                  label="name"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 250, margin: 8 }}
                  value={editInput?.name}
                  onChange={(event) =>
                    dispatch({ type: 'EDIT_NAME', payload: event.target.value })
                  }
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <Select
                  id="event-occasion"
                  label="selectssss occasion"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 250, margin: 8 }}
                  variant="outlined"
                  value={editInput?.occasion_id || ''}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_OCCASION',
                      payload: event.target.value,
                    })
                  }
                >
                  <option value="">Choose an Occasion:</option>
                  {occasions.map((occasion) => {
                    return (
                      <option value={occasion.id} key={occasion.id}>
                        {occasion.occasion}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl>
                <TextField
                  id="edit-event-date"
                  label="date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 250, margin: 8 }}
                  value={new Date(editInput?.date).toISOString().split('T')[0]}
                  onChange={(event) =>
                    dispatch({ type: 'EDIT_DATE', payload: event.target.value })
                  }
                  variant="outlined"
                />
              </FormControl>
              <FormControl>
                <Select
                  id="event-category"
                  label="select category"
                  type="text"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{ width: 250, margin: 8 }}
                  variant="outlined"
                  value={editInput?.category_id || ''}
                  onChange={(event) =>
                    dispatch({
                      type: 'SET_CATEGORY',
                      payload: event.target.value,
                    })
                  }
                >
                  <option value="">Choose a Category:</option>
                  {categories.map((category) => {
                    return (
                      <option value={category.id} key={category.id}>
                        {category.category}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              {/* conditionally rendered Select Card Button */}
              <div>
                <Button variant="outlined" onClick={handleDelete}>
                  SELECT NEW CARD
                </Button>

                <Button variant="outlined" onClick={handleUpdate}>
                  PICK A CARD
                </Button>
              </div>
              {/* Delete, Update, and Cancel Buttons */}
              <div>
                <Button variant="outlined" onClick={handleDelete}>
                  DELETE
                </Button>
                <Button variant="outlined" onClick={handleUpdate}>
                  UPDATE
                </Button>
                <Button variant="outlined" onClick={handleCancel}>
                  CANCEL
                </Button>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={3}></Grid>
        </Grid>
      )}
    </div>
  );
}
