import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// cards worker saga gets cards and sets cards store 
// fires on FETCH_CARDS
function* fetchCards() {
  try {
    const cards = yield axios.get("/api/cards"); // fire
    yield put({ type: "SET_CARDS", payload: cards.data });
  } catch (error) {
    console.error(error);
  }
}

function* addCard(action) {
      //debug log to user console
    console.log(`
    Front: ${action.payload.image_front}
    Inside: ${action.payload.image_inside}
    Occasion: ${action.payload.occasion_id}
    Category: ${action.payload.category_id}
    Artist: ${action.payload.artist}
    Description: ${action.payload.details}
    `);
      //store data of card to create
    const newCardInfo = action.payload;
  try{
      //POST request to admin API
    yield axios.post(`/api/admin/card`, newCardInfo);
      //GET updated cards data.
    yield put({type: 'FETCH_CARDS'});
  } catch(error) {
    console.error(`ERROR in addCard: ${error}`);
  }
}

function* editCard(action) {
      //debug log to user console
    console.log(`
    ID: ${action.payload.id}
    Front: ${action.payload.image_front}
    Inside: ${action.payload.image_inside}
    Occasion: ${action.payload.occasion_id}
    Category: ${action.payload.category_id}
    Artist: ${action.payload.artist}
    Description: ${action.payload.details}
    `);
      //store data of card to edit
    const editCardInfo = action.payload;
  try{
      //PUT request to admin API
    yield axios.put(`/api/admin/card`, editCardInfo);
      //GET updated cards data.
    yield put({type: 'FETCH_CARDS'});
  } catch(error) {
    console.error(`ERROR in editCard: ${error}`);
  }
}

function* deleteCard(action) {
    //store ID of card to delete
  const deleteID = action.payload;
    //debug log to user console
  console.log(`In deleteCard: ${deleteID}`);
  try{
      //DELETE request to admin API
    yield axios.delete(`/api/admin/card/${deleteID}`);
      //GET updated cards data.
    yield put({type: 'FETCH_CARDS'});
  } catch(error) {
    console.error(`ERROR in deleteCard: ${error}`);
  }
}

function* fetchAdminCards() {
    //debug log to user console
  console.log(`In fetchAdminCards`);
    //triple-threat GET for admin-cards
  try {
      //GET cards and set cards reducer
    const cards = yield axios.get("/api/cards");
    yield put({ type: "SET_CARDS", payload: cards.data });
      //GET occasions and set occasions reducer
    const occasions = yield axios.get("/api/occasions");
    yield put({ type: "SET_OCCASIONS", payload: occasions.data });
      //GET categories and set categories reducer
    const categories = yield axios.get("/api/categories");
    yield put({ type: "SET_CATEGORIES", payload: categories.data });   
  } catch (error) {
    console.error(`ERROR in fetchAdminCards: ${error}`);
  }
}

export default function* cardsSaga() {
  yield takeEvery("FETCH_CARDS", fetchCards);
  yield takeEvery("ADD_CARD", addCard);
  yield takeEvery("EDIT_CARD", editCard);
  yield takeEvery("DELETE_CARD", deleteCard);
  yield takeEvery("FETCH_ADMIN_CARDS", fetchAdminCards);
}
