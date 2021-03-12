// Reducer for all occasions
const occasionsReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_OCCASIONS":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default occasionsReducer;