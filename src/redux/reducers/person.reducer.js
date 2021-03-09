//reducer to POST new person
const personReducer = (state = {name: '', relationship: '', address: '',}, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload };
        case 'SET_RELATIONSHIP':
            return { ...state, relationship: action.payload };
        case 'SET_ADDRESS':
            return { ...state, address: action.payload };
        default:
            return state;
    }
}; //end personReducer

export default personReducer;