import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//SAGA
//generator function to GET entry for EDIT: will be fired on GET_EVENT
function* getEvent(action) {
  try {
    const idToGet = action.payload;
    const response = yield axios.get(`/api/event/${idToGet}`);
    yield put({ type: "SET_EDIT_EVENT", payload: response.data });
  } catch (error) {
    console.error("ERROR in get EVENT", error);
  }
} //end getEvent

//generator PUT function to save changes from EDIT: will be fired on SAVE_EDIT
function* saveEdit(action) {
  yield axios.put(`/api/persons`, action.payload);
} //end saveEdit

//generator to clear the edit store when returning to the events address
function* clearEdit() {
  yield put({ type: "UNSET_EDIT_EVENT" });
} //end clearEdit

function* editSaga() {
  yield takeEvery("GET_EVENT", getEvent);
  yield takeEvery("SAVE_EDIT", saveEdit);
  yield takeEvery("CLEAR_EDIT_STORE", clearEdit);
}

export default editSaga;
