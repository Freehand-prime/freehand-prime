// Reducer for all categories
const categoriesReducer = (state = [], action) => {
    switch (action.type) {
      case "SET_CATEGORIES":
        return action.payload;
      default:
        return state;
    }
  };
  
  export default categoriesReducer;