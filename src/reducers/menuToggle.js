const menuToggleReducer = (state = true, action) => {
  switch (action.type) {
    case "setMenuToggle":
      return !state;
    default:
      return state;
  }
};

export default menuToggleReducer;
