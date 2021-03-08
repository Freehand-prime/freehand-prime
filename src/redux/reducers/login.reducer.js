const loginReducer = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_OPEN':
      return true;
    case 'LOGIN_CLOSE':
      return false;
    default:
      return state;
  }
};

export default loginReducer;