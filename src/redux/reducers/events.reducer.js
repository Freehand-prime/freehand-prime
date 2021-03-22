// Reducer to GET all persons
const eventsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return action.payload;
    case "UNSET_EVENTS":
      return [];
    default:
      return state;
  }
}; // end personsReducer

export default eventsReducer;
