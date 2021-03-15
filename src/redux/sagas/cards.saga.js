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
    //store data of card to create
    const newCardInfo = action.payload;
    //debug log to user console
  console.log(`In addCard: ${newCardInfo}`);
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
    //store data of card to edit
  const editCardInfo = action.payload;
    //debug log to user console
  console.log(`In editCard: ${editCardInfo}`);
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

export default function* cardsSaga() {
  yield takeEvery("FETCH_CARDS", fetchCards);
  yield takeEvery("ADD_CARD", addCard);
  yield takeEvery("EDIT_CARD", editCard);
  yield takeEvery("DELETE_CARD", deleteCard);
}
