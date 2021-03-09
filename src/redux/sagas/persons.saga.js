import { put, takeEvery } from "redux-saga/effects";
import { axios } from 'axios';

//SAGA
//generator function to POST person details to database. Will be fired on ADD_PERSON


function* addPerson(action) {
    try {
        console.log('post new person');
        const newPerson = action.payload;
        const response = yield axios.post('/api/person', newPerson);
        console.log('NEW PERSON ADDED:', response);
    } catch (error) {
        console.error('ERROR in adding new person', error);
    }
}; // end addPerson

//generator functon to GET persons details from database. Will be fired on FETCH_PERSONS

function* fetchPersons() {
    try {
        const persons = yield axios.get('/api/person');
        console.log('GET ALL:', persons.data);
        yield put({ type: 'SET_PERSONS', payload: persons.data})
    } catch (error) {
        console.error('ERROR in getting persons', error)
    }
}; //end fetchPersons


function personsSaga() {
    yield takeEvery('ADD_PERSON', addPerson);
    yield takeEvery('FETCH_PERSONS', fetchPersons);
}

export default personsSaga;