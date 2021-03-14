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
    console.log(action.payload);
    yield axios.post('/api/categories', { category: action.payload });
    yield put({ type: 'FETCH_CATEGORIES' });
  } catch (error) {
    console.error('occasion post error', error);
  }
}

function* deleteCategory(action) {
  try {
    console.log('in delete category for id', action.payload);
    yield axios.delete(`/api/categories/${action.payload}`);
    yield put({ type: 'FETCH_CATEGORIES' });
  } catch (error) {
    console.error('delete category error', error);
  }
}

export default function* categoriesSaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery('ADD_CATEGORY', addCategory);
  yield takeEvery('DELETE_CATEGORY', deleteCategory);
}
