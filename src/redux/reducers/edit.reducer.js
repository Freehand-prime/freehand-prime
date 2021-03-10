// reducer to hold single entry object being edited
const editEvent = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT_EVENT':
            return action.payload;
        case 'EDIT_NAME':
            return {...state, date: action.payload};
        case 'EDIT_OCCASION':
            return {...state, title: action.payload};
        case 'EDIT_DATE':
            return {...state, author: action.payload};
        case 'EDIT_CATEGORY':
            return {...state, year: action.payload};
        default:
            return state
    }
}; //end editEvent

export default editEvent;