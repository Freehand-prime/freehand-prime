// Reducer to hold single entry object being edited
const editEvent = (state = {}, action) => {
  switch (action.type) {
    case "SET_EDIT_EVENT":
      return action.payload;
    case "EDIT_NAME":
      return { ...state, name: action.payload };
    case "EDIT_OCCASION":
      return { ...state, occasion_id: action.payload };
    case "EDIT_DATE":
      return { ...state, date: action.payload };
    case "EDIT_CATEGORY":
      return { ...state, category_id: action.payload };
    case "PICK_CARD":
      return { ...state, card_id: action.payload };
    case "UNSET_EDIT_EVENT":
      return {};
    default:
      return state;
  }
}; //end editEvent

export default editEvent;
