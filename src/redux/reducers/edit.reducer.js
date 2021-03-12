// reducer to hold single entry object being edited
const editEvent = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT_EVENT':
            return action.payload;
        case 'EDIT_NAME':
            return {...state, name: action.payload};
        case 'EDIT_OCCASION':
            return {...state, occasion: action.payload};
        case 'EDIT_DATE':
            return {...state, date: action.payload};
        case 'EDIT_CATEGORY':
            return {...state, category: action.payload};
        case 'PICK_CARD':
            return {...state[0], card_id: action.payload}; // need to sort out this array business
        default:
            return state
    }
}; //end editEvent

export default editEvent;