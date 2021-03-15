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
  console.log(`In addCard: ${action.payload}`);
  try{

  } catch(error) {
    console.log(`ERROR in addCard: ${error}`);
  }
}

function* editCard(action) {
  console.log(`In editCard: ${action.payload}`);
  try{

  } catch(error) {
    console.log(`ERROR in editCard: ${error}`);
  }
}

function* deleteCard(action) {
  console.log(`In deleteCard: ${action.payload}`);
  try{
      //store ID of card to delete
    const cardId = action.payload;
      //DELETE request to admin API
    yield axios.delete(`/api/admin/${cardId}`);
      //GET updated cards data.
    yield put({type: 'FETCH_CARDS'});
  } catch(error) {
    console.log(`ERROR in deleteCard: ${error}`);
  }
}

export default function* cardsSaga() {
  yield takeEvery("FETCH_CARDS", fetchCards);
  yield takeEvery("ADD_CARD", addCard);
  yield takeEvery("EDIT_CARD", editCard);
  yield takeEvery("DELETE_CARD", deleteCard);
}
