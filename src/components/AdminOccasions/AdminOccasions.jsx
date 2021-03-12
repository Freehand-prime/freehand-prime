import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export default function AdminOccasions() {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const categories = useSelector((store) => store.events);
  
    // do we not need a useEffect bc we are setting state after registration / login?
    useEffect(() => {
      dispatch({ type: 'FETCH_OCCASIONS' });
      dispatch({ type: 'FETCH_CATEGORIES' });
    }, []);



    return (
        <h1>AdminOccasions</h1>
    )
}