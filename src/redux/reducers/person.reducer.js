// Reducer to POST new person
const personReducer = (
  state = { name: "", relationship: "", address: "" },
  action
) => {
  switch (action.type) {
    case "SET_EDIT_PERSON":
      return action.payload;
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_RELATIONSHIP":
      return { ...state, relationship: action.payload };
    case "SET_ADDRESS":
      return { ...state, address: action.payload };
    case "UNSET_PERSON":
      return {};
    default:
      return state;
  }
}; //end personReducer

export default personReducer;
