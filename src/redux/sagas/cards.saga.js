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


export default function* cardsSaga() {
  yield takeEvery("FETCH_CARDS", fetchCards);
}
