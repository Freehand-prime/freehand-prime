import { useState, useEffect } from 'react';
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
  List,
  ListItem,
  Paper,
  TextField,
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
  const occasions = useSelector((store) => store.occasions);
  const categories = useSelector((store) => store.categories);

  // do we not need a useEffect bc we are setting state after registration / login?
  useEffect(() => {
    dispatch({ type: 'FETCH_OCCASIONS' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, []);

  return (
    <>
      <Container>
        <br></br>
        <Typography variant="h5">
          Admin - Manage Occasions and Categories
        </Typography>
        <br></br>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Occasions</Typography>
              <TextField variant="outlined" size="small" fullWidth />
              <Button variant="contained">+</Button>
            </Box>
            <List>
              {occasions &&
                occasions.map((occasion) => (
                  <ListItem key={occasion.id}>{occasion.occasion}</ListItem>
                ))}
            </List>
          </Grid>
          <Grid xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Categories</Typography>
              <TextField variant="outlined" size="small" fullWidth />
              <Button variant="contained">+</Button>
            </Box>
            <List>
              {categories &&
                categories.map((category) => (
                  <ListItem key={category.id}>{category.category}</ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
