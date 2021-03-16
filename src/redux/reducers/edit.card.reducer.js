// reducer to hold single card object being edited
const editCard = (state = {}, action) => {
    switch (action.type) {
            //need a case to set all the initial data in the editCard reducer on click of edit button.
        case 'SET_EDIT_CARD':
            return action.payload;
        case 'SET_EDIT_CARD_OCCASION_ID':
            return {...state, occasion_id: action.payload};
        case 'SET_EDIT_CARD_CATEGORY_ID':
            return {...state, category_id: action.payload};
        case 'SET_EDIT_CARD_ARTIST':
            return {...state, artist: action.payload};
        case 'SET_EDIT_CARD_DETAILS':
            return {...state, details: action.payload};            
        default:
            return state
    }
}; //end editCard

export default editCard;