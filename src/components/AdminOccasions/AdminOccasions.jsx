// react, redux, routing
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

// MUI styling and components
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Container,
  Fab,
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

// this component allows admin users to manage the categories and occasions available for cards in the database
// they can add new entries, edit existing entries, or delete entries
export default function AdminOccasions() {
  // hooks
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  // state
  const occasions = useSelector((store) => store.occasions);
  const categories = useSelector((store) => store.categories);

  // state for new entries, which entry is being edited, and edited occasion's new value
  const [addOccasion, setAddOccasion] = useState('');
  const [addCategory, setAddCategory] = useState('');
  const [editOccasion, setEditOccasion] = useState(0);
  const [editCategory, setEditCategory] = useState(0);
  const [editOccasionString, setEditOccasionString] = useState('');
  const [editCategoryString, setEditCategoryString] = useState('');

  // fetches most recent occasions and categories from database
  useEffect(() => {
    dispatch({ type: 'FETCH_OCCASIONS' });
    dispatch({ type: 'FETCH_CATEGORIES' });
  }, []);

  // click listener handles adding new occasion
  const handleAddOccasion = () => {
    dispatch({ type: 'ADD_OCCASION', payload: addOccasion });
    setAddOccasion('');
  };

  // click listener handles adding new category
  const handleAddCategory = () => {
    dispatch({ type: 'ADD_CATEGORY', payload: addCategory });
    setAddCategory('');
  };

  // click listener deletes occasion
  const handleDeleteOccasion = (id) => {
    dispatch({ type: 'DELETE_OCCASION', payload: id });
  };

  // click listener deletes occasion
  const handleDeleteCategory = (id) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  // click listener handles sending updated state of edited occasion to db
  const handleOccasionEdit = (occasionToUpdate) => {
    dispatch({ type: 'UPDATE_OCCASION', payload: occasionToUpdate });
    setEditOccasionString('');
  };

  // click listener handles sending updated state of edited category to db
  const handleCategoryEdit = (categoryToUpdate) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: categoryToUpdate });
    setEditCategoryString('');
  };

  const handleAdminSwap = () => {
    history.push('/adminCards');    
  };

  return (
    <>
      <Button onClick={handleAdminSwap}></Button>
      <Container>
        <br></br>
        <Typography align="center" variant="h5">
          Admin - Manage Occasions and Categories
        </Typography>
        <br></br>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box display="flex" alignItems="center" p={2}>
                <Box pr={2}>
                  <Typography variant="h6">Occasions</Typography>
                </Box>
                <TextField
                  variant="outlined"
                  size="small"
                  value={addOccasion}
                  onChange={(event) => {
                    setAddOccasion(event.target.value);
                  }}
                  fullWidth
                />
                <Box pl={2}>
                  <Fab
                    color="primary"
                    size="small"
                    aria-label="add"
                    onClick={handleAddOccasion}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Box>
              {/* maps over occasions to render list items for each */}
              <List>
                {occasions &&
                  occasions.slice(1).map((occasion) => (
                    <ListItem key={occasion.id}>
                      {/* renders a textfield if editOccasion matches the occasion.id, else renders a listitem */}
                      {editOccasion == occasion.id ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={editOccasionString}
                          onChange={(event) => {
                            setEditOccasionString(event.target.value);
                          }}
                          fullWidth
                        />
                      ) : (
                        <ListItemText>{occasion.occasion}</ListItemText>
                      )}
                      <ListItemIcon>
                        {/* sets editOccasion to the id of this list entry if clicked, otherwise sets it to 0 */}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() =>
                            setEditOccasion(editOccasion > 0 ? 0 : occasion.id)
                          }
                        >
                          {/* sends the edit occasion ID and the edited occasion new value to the update click handler */}
                          {editOccasion == occasion.id ? (
                            <SaveIcon
                              onClick={() =>
                                handleOccasionEdit([
                                  editOccasion,
                                  editOccasionString,
                                ])
                              }
                            />
                          ) : (
                            <EditIcon />
                          )}
                        </Fab>
                      </ListItemIcon>
                      <ListItemIcon>
                        {/* deletes occasion */}
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteOccasion(occasion.id);
                          }}
                        >
                          <DeleteIcon />
                        </Fab>
                      </ListItemIcon>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper>
              <Box display="flex" alignItems="center" p={2}>
                <Box pr={2}>
                  <Typography variant="h6">Categories</Typography>
                </Box>
                <TextField
                  variant="outlined"
                  size="small"
                  value={addCategory}
                  onChange={(event) => {
                    setAddCategory(event.target.value);
                  }}
                  fullWidth
                />
                <Box pl={2}>
                  <Fab
                    color="primary"
                    size="small"
                    aria-label="add"
                    onClick={handleAddCategory}
                  >
                    <AddIcon />
                  </Fab>
                </Box>
              </Box>
              {/* maps over categories to render list items for each */}
              <List>
                {categories &&
                  categories.slice(1).map((category) => (
                    <ListItem key={category.id}>
                      {/* renders a textfield if editCategory matches the category.id, else renders a listitem */}
                      {editCategory == category.id ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={editCategoryString}
                          onChange={(event) => {
                            setEditCategoryString(event.target.value);
                          }}
                          fullWidth
                        />
                      ) : (
                        <ListItemText>{category.category}</ListItemText>
                      )}
                      <ListItemIcon>
                        {/* sets editCategory to the id of this list entry if clicked, otherwise sets it to 0 */}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() =>
                            setEditCategory(editCategory > 0 ? 0 : category.id)
                          }
                        >
                          {/* sends the edit category ID and the edited category new value to the update click handler */}
                          {editCategory == category.id ? (
                            <SaveIcon
                              onClick={() =>
                                handleCategoryEdit([
                                  editCategory,
                                  editCategoryString,
                                ])
                              }
                            />
                          ) : (
                            <EditIcon />
                          )}
                        </Fab>
                      </ListItemIcon>
                      <ListItemIcon>
                        {/* deletes category */}
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="delete"
                          onClick={() => {
                            handleDeleteCategory(category.id);
                          }}
                        >
                          <DeleteIcon />
                        </Fab>
                      </ListItemIcon>
                    </ListItem>
                  ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
