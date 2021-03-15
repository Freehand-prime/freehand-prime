//reducer to POST new event
const eventReducer = (state = {occasion: '', date: '', category: ''}, action) => {
    switch (action.type) {
        case 'SET_OCCASION':
            return { ...state, occasion: action.payload };
        case 'SET_DATE':
            return { ...state, date: action.payload };
        case 'SET_CATEGORY':
            return { ...state, category: action.payload };
        case 'SET_INSCRIPTION':
            return { ...state, category: action.payload };   
        default:
            return state;
    }
}; //end eventsReducer

export default eventReducer;