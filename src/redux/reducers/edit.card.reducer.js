// reducer to hold single card object being edited
const editCard = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDIT_CARD':
            return action.payload;
        case 'EDIT_NAME':
            return {...state, name: action.payload};
        case 'EDIT_OCCASION_ID':
            return {...state, occasion_id: action.payload};
        case 'EDIT_CATEGORY_ID':
            return {...state, category_id: action.payload};
        case 'EDIT_ARTIST':
            return {...state, artist: action.payload};
        case 'EDIT_DETAILS':
            return {...state, details: action.payload};            
        default:
            return state
    }
}; //end editEvent

export default editCard;