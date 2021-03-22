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

function* addCategory(action) {
  try {
    yield axios.post("/api/categories", { category: action.payload });
    yield put({ type: "FETCH_CATEGORIES" });
  } catch (error) {
    console.error("occasion post error", error);
  }
}

function* updateCategory(action) {
  try {
    yield axios.put(`/api/categories/${action.payload[0]}`, {
      category: action.payload[1],
    });
    yield put({ type: "FETCH_CATEGORIES" });
  } catch (error) {
    console.error("category update error in saga", error);
  }
}

function* deleteCategory(action) {
  try {
    yield axios.delete(`/api/categories/${action.payload}`);
    yield put({ type: "FETCH_CATEGORIES" });
  } catch (error) {
    console.error("delete category error", error);
  }
}

export default function* categoriesSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("ADD_CATEGORY", addCategory);
  yield takeEvery("UPDATE_CATEGORY", updateCategory);
  yield takeEvery("DELETE_CATEGORY", deleteCategory);
}
