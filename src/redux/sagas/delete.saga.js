import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//SAGA
//generator function to DELETE item: will be fired on 'DELETE_EVENT'
function* deleteEVENT(action) {
    try {
        const mediaId = action.payload;
        yield axios.delete(`/api/event/all/${mediaId}`);
        yield put({ type: 'FETCH_EVENTS' });
    } catch (error) {
        console.log('error in deleting media', error)
    }
}


function* deleteSaga() {
    yield takeEvery('FETCH_EVENTS', fetchEvents);
  }

export default deleteSaga;