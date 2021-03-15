// reducer to hold single card object being added
const addCard = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ADD_CARD_OCCASION_ID':
            return {...state, occasion_id: action.payload};
        case 'SET_ADD_CARD_CATEGORY_ID':
            return {...state, category_id: action.payload};
        case 'SET_ADD_CARD_ARTIST':
            return {...state, artist: action.payload};
        case 'SET_ADD_CARD_DETAILS':
            return {...state, details: action.payload};            
        default:
            return state
    }
}; //end addCard

export default addCard;