import { put, takeEvery } from "redux-saga/effects";
import axios from 'axios';

//SAGA
//generator function to POST person details to database. Will be fired on ADD_PERSON


function* addPersonAndEvent(action) {
    try {
        console.log('post new person and event');
        console.log(action.payload);
        const newPersonAndEvent = action.payload;
        const response = yield axios.post('/api/persons', newPersonAndEvent);
        console.log('NEW PERSON AND EVENT ADDED:', response);
    } catch (error) {
        console.error('ERROR in adding new person and event', error);
    }
}; // end addPerson

//generator function to GET persons details from database. Will be fired on FETCH_PERSONS

function* fetchPersons() {
    try {
        const persons = yield axios.get('/api/persons');
        console.log('GET ALL PERSONS:', persons.data);
        yield put({ type: 'SET_PERSONS', payload: persons.data})
    } catch (error) {
        console.error('ERROR in getting persons', error)
    }
}; //end fetchPersons


function* personsSaga() {
    yield takeEvery('ADD_PERSON_AND_EVENT', addPersonAndEvent);
    yield takeEvery('FETCH_PERSONS', fetchPersons);
}

export default personsSaga;