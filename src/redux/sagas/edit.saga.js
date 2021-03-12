import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//How are we doing GET and PUT from two different tables through these generator functions to UPDATE?

//SAGA
//generator function to GET entry for EDIT: will be fired on GET_EVENT
function* getEvent(action) {
    try {
        const idToGet = action.payload
        const response = yield axios.get(`/api/event/${idToGet}`)
        console.log(response.data);
        yield put({ type: 'SET_EDIT_EVENT', payload: response.data})
    } catch (error) {
        console.error('ERROR in get EVENT', error)
    }
}; //end getEvent

//generator PUT function to save changes from EDIT: will be fired on SAVE_EDIT
function* saveEdit(action) {
    console.log(action);
    yield axios.put(`/api/persons/${action.payload.id}`, action.payload)
    yield axios.put(`/api/event/${action.payload.id}`, action.payload)
}; //end saveEdit

function* editSaga() {
    yield takeEvery('GET_EVENT', getEvent);
    yield takeEvery('SAVE_EDIT', saveEdit);
  }

export default editSaga;