import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// cards worker saga gets occasions and sets occasions store
// fires on FETCH_OCCASIONS
function* fetchOccasions() {
  try {
    const occasions = yield axios.get('/api/occasions'); // fire
    yield put({ type: 'SET_OCCASIONS', payload: occasions.data });
  } catch (error) {
    console.error(error);
  }
}

function* addOccasion(action) {
  try {
    console.log(action.payload);
    yield axios.post('/api/occasions', { occasion: action.payload });
    yield put({ type: 'FETCH_OCCASIONS' });
  } catch (error) {
    console.error('occasion post error', error);
  }
}

export default function* occasionsSaga() {
  yield takeEvery('FETCH_OCCASIONS', fetchOccasions);
  yield takeEvery('ADD_OCCASION', addOccasion);
}
