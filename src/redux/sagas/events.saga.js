import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//SAGA
//generator function to POST event details to database. Will be fired on ADD_EVENT
function* updateShipping(action) {
  try {
    console.log('updating shipping with', action.payload);
    yield axios.put('/api/event', action.payload);
    
  } catch (error) {
    console.error('ERROR in updating shipping', error);
  }
} // end addEvent

//generator function to GET events details from database. Will be fired on FETCH_EVENTS
function* fetchEvents() {
  try {
    console.log('in get all events');
    const events = yield axios.get('/api/event');
    console.log('GET ALL EVENTS:', events.data);
    yield put({ type: 'SET_EVENTS', payload: events.data });
  } catch (error) {
    console.error('ERROR in getting events', error);
  }
} // end fetchEvents

function* clearInputs() {
  try {
    yield put({type: 'UNSET_EVENT', undefined});
    yield put({type: 'UNSET_PERSON', undefined});
  } catch (error) {
    console.error('ERROR in clearing inputs', error);
  }
} // end fetchEvents

function* eventsSaga() {
  yield takeEvery('UPDATE_SHIPPING', updateShipping);
  yield takeEvery('FETCH_EVENTS', fetchEvents);
  yield takeEvery('CLEAR_INPUT_STORE', clearInputs);
}

export default eventsSaga;