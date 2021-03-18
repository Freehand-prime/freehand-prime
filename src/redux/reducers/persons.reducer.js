//reducer to GET all persons
const personsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PERSONS':
            return action.payload;
        case 'UNSET_PERSONS':
            return [];
        default:
            return state;
    }
} // end personsReducer

export default personsReducer;