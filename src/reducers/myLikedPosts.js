const myLikedPostsReducer = (state = "", action) => {
  switch (action.type) {
    case "setMyLikedPosts":
      return action.payload;
    default:
      return state;
  }
};

export default myLikedPostsReducer;
