const isLoggedInReducer = (
  state = localStorage.getItem("localStorageUser") ? true : false,
  action
) => {
  switch (action.type) {
    case "setIsLoggedIn":
      return action.payload;
    default:
      return state;
  }
};

export default isLoggedInReducer;
