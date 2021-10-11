import { combineReducers } from "redux";

import myPostsReducer from "./myPosts";
import myLikedPostsReducer from "./myLikedPosts";
import localStorageUserReducer from "./localStorageUser";
import isLoggedInReducer from "./isLoggedIn";
import menuToggleReducer from "./menuToggle";

const allReducers = combineReducers({
  myPosts: myPostsReducer,
  myLikedPosts: myLikedPostsReducer,
  localStorageUser: localStorageUserReducer,
  isLoggedIn: isLoggedInReducer,
  menuToggle: menuToggleReducer,
});

export default allReducers;
