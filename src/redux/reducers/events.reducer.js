//reducer to GET all persons
const eventsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            return action.payload
        default:
            return state;
    }
} // end personsReducer

export default eventsReducer;