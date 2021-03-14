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
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

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
  const [addOccasion, setAddOccasion] = useState('');
  const [addCategory, setAddCategory] = useState('');
  const [editOccasion, setEditOccasion] = [0, ''];
  const [editCategory, setEditCategory] = [0, ''];

  // do we not need a useEffect bc we are setting state after registration / login?
  useEffect(() => {
    dispatch({ type: 'FETCH_OCCASIONS' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, []);

  const handleAddOccasion = () => {
    console.log('clicked add occasion, addOccasion is', addOccasion);
    dispatch({ type: 'ADD_OCCASION', payload: addOccasion });
    // post add occasion
    setAddOccasion('');
  };

  const handleAddCategory = () => {
    console.log('clicked add category, addCategory is', addCategory);
    dispatch({ type: 'ADD_CATEGORY', payload: addCategory });
    // post add category
    setAddCategory('');
  };

  const handleDeleteOccasion = (id) => {
    console.log('clicked delette occasion, occasionID is', id);

  }

  const handleDeleteCategory = (id) => {
    console.log('clicked delete category, categoryID is', id);
  }

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
              <TextField
                variant="outlined"
                size="small"
                value={addOccasion}
                onChange={(event) => {
                  setAddOccasion(event.target.value);
                }}
                fullWidth
              />
              <IconButton onClick={handleAddOccasion}>
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {occasions &&
                occasions.map((occasion) => (
                  <ListItem key={occasion.id}>
                    <ListItemText>{occasion.occasion}</ListItemText>
                    <ListItemIcon>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                      <IconButton onClick={() => {handleDeleteOccasion(occasion.id)}}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid xs={12} sm={6}>
            <Box display="flex" alignItems="center">
              <Typography variant="h6">Categories</Typography>
              <TextField
                variant="outlined"
                size="small"
                value={addCategory}
                onChange={(event) => {
                  setAddCategory(event.target.value);
                }}
                fullWidth
              />
              <IconButton onClick={handleAddCategory}>
                <AddIcon />
              </IconButton>
            </Box>
            <List>
              {categories &&
                categories.map((category) => (
                  <ListItem key={category.id}>
                    <ListItemText>{category.category}</ListItemText>
                    <ListItemIcon>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                    <IconButton onClick={() => {handleDeleteCategory(category.id)}}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemIcon>
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
