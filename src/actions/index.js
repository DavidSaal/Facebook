const setMyPosts = (posts) => {
  return { type: "setMyPosts", payload: posts };
};

const addNewPost = (post) => {
  return { type: "addNewPost", payload: post };
};

const setMyLikedPosts = (likedPosts) => {
  return { type: "setMyLikedPosts", payload: likedPosts };
};

const setLocalStorageUser = (user) => {
  return { type: "setLocalStorageUser", payload: user };
};

const setIsLoggedIn = (value) => {
  return { type: "setIsLoggedIn", payload: value };
};

const setMenuToggle = () => {
  return { type: "setMenuToggle" };
};

export {
  setMyLikedPosts,
  setMyPosts,
  addNewPost,
  setLocalStorageUser,
  setIsLoggedIn,
  setMenuToggle,
};
