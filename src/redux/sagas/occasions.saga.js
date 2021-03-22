import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// cards worker saga gets occasions and sets occasions store
// fires on FETCH_OCCASIONS
function* fetchOccasions() {
  try {
    const occasions = yield axios.get("/api/occasions"); // fire
    yield put({ type: "SET_OCCASIONS", payload: occasions.data });
  } catch (error) {
    console.error(error);
  }
}

function* addOccasion(action) {
  try {
    yield axios.post("/api/occasions", { occasion: action.payload });
    yield put({ type: "FETCH_OCCASIONS" });
  } catch (error) {
    console.error("occasion post error", error);
  }
}

function* updateOccasion(action) {
  try {
    yield axios.put(`/api/occasions/${action.payload[0]}`, {
      occasion: action.payload[1],
    });
    yield put({ type: "FETCH_OCCASIONS" });
  } catch (error) {
    console.error("occasion update error in saga", error);
  }
}

function* deleteOccasion(action) {
  try {
    yield axios.delete(`/api/occasions/${action.payload}`);
    yield put({ type: "FETCH_OCCASIONS" });
  } catch (error) {
    console.error("delete occasion error", error);
  }
}

export default function* occasionsSaga() {
  yield takeEvery("FETCH_OCCASIONS", fetchOccasions);
  yield takeEvery("ADD_OCCASION", addOccasion);
  yield takeEvery("UPDATE_OCCASION", updateOccasion);
  yield takeEvery("DELETE_OCCASION", deleteOccasion);
}
