const localStorageUserReducer = (
  state = JSON.parse(localStorage.getItem("localStorageUser")) || {},
  action
) => {
  switch (action.type) {
    case "setLocalStorageUser":
      return { ...action.payload };
    default:
      return state;
  }
};

export default localStorageUserReducer;
