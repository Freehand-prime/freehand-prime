import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";

// cards worker saga gets categories and sets categories store 
// fires on FETCH_CATEGORIES
function* fetchCategories() {
  try {
    const categories = yield axios.get("/api/categories"); // fire
    yield put({ type: "SET_CATEGORIES", payload: categories.data });
  } catch (error) {
    console.error(error);
  }
}


export default function* categoriesSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
}
