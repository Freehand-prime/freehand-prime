// Reducer for all cards
const cardsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_CARDS":
      return action.payload;
    default:
      return state;
  }
};

export default cardsReducer;
