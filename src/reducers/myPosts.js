const myPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "setMyPosts":
      return [...action.payload];
    case "addNewPost":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default myPostsReducer;
