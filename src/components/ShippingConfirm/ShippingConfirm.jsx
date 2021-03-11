import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

  //MUI
import { 
  Grid,
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
  RadioGroup
} from '@material-ui/core';

  // Component
import ShipSubmitDialog from './ShipSubmitDialog/ShipSubmitDialog';

  //MUI Styling
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

export default function ShippingConfirm() {
      //state
    const [openSubmit, setOpenSubmit] = useState(false);

      //hooks
    const classes = useStyles(); 
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedEvent = useSelector((store) => store);

      //click handlers
    const handleChange = () => {
      console.log('In handleChange');
    }
    const handleBack = () => {
      console.log('In handleBack');
        //return to pick a card view on back
      history.push("/card")
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={3}></Grid>
            <Grid item xs={12} sm={6}>
              <Paper align="center" elevation={4} className={classes.paper}>
                <Typography variant="h5">Does Everything Look Correct?</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}></Grid>
            <Grid item xs={6} sm={3}></Grid>
            <Grid align="center" item xs={12} sm={6}>
              <Paper elevation={4}>
              <FormControl>
                <FormLabel component="legend">Ship To:</FormLabel>
                <RadioGroup aria-label="shipping" name="shipping1" value={"changeMe"} onChange={handleChange}>
                  <FormControlLabel value="changeMe" control={<Radio />} label="Ship to Them" />
                  <FormControlLabel value="changeMe" control={<Radio />} label="Ship to Another Address" />
                    <TextField
                      id="address_field"
                      label= "address"
                      placeholder="enter address"
                      type="text"
                      value={"changeMe"}
                      onChange={(event) => dispatch({ type: 'SET_ADDRESS', payload: event.target.value })}
                      variant="outlined"
                    />
                </RadioGroup>
              </FormControl>
                  <div>
                      <Button variant="outlined" onClick={handleBack}>
                          Back
                      </Button>
                      <Button variant="outlined" onClick={() => setOpenSubmit(!openSubmit)}>
                          Submit
                      </Button>
                  </div>
              </Paper>
            </Grid>
          <Grid item xs={6} sm={3}></Grid>
        </Grid>
        <ShipSubmitDialog openSubmit={openSubmit} setOpenSubmit={setOpenSubmit} />
      </div>
    )
}