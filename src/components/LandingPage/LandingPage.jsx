import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Grid, Paper, Button, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

export default function LandingPage() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  
  const enterPersonRedirect = () => {
      //debug
    console.log(`Who do you Appreciate?' - Clicked.`);
      //redirect`'
    history.push('/person');
  };

  //clear the person and event redux stores whenever we return to landing page
  useEffect(() => {
    dispatch({ type: 'CLEAR_INPUT_STORE' });
  }, []);
  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={6} sm={3}></Grid>
      <Grid item xs={12} sm={6}>
        <Paper align="center" elevation={4} className={classes.paper}>
          <Typography variant="h5">Landing Page</Typography>
          <Button 
            align="center" 
            variant="contained" 
            color="primary" 
            onClick={enterPersonRedirect}
          >
            Who Do You Appreciate?
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={6} sm={3}></Grid>
    </Grid>
    </div>
  );
}