import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

//SAGA
//generator function to DELETE item: will be fired on 'DELETE_EVENT'
function* deleteEvent(action) {
  try {
    const eventId = action.payload;
    yield axios.delete(`/api/event/${eventId}`);
    yield put({ type: "FETCH_EVENTS" });
  } catch (error) {
    console.log("Error in DELETE event", error);
  }
}

function* deleteSaga() {
  yield takeEvery("DELETE_EVENT", deleteEvent);
}

export default deleteSaga;
