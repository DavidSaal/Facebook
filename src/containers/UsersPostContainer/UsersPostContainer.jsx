import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersPostsCard from "../../components/UsersPostsCard";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";
import { setMyLikedPosts } from "../../actions";

const UsersPostContainer = ({ userId, fullName }) => {
  const dispatch = useDispatch();
  let myLikedPosts = useSelector((state) => state.myLikedPosts);
  let localStorageUser = useSelector((state) => state.localStorageUser);
  const [userPosts, setUserPosts] = useState({});
  const [likeLoader, setLikeLoader] = useState({ on: false, postId: null });
  const [usersPostsLoader, setUsersPostsLoader] = useState(false);

  const handleLikeOnClick = (event) => {
    if (!likeLoader.on) {
      let postId = event.target.id;
      let isLike = myLikedPosts.includes(postId);
      setLikeLoader({ on: true, postId: postId });
      fetch(
        `${API_URL}/users/${localStorageUser.userId}/posts/${postId}/${
          isLike ? "unlike" : "like"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(async (res) => {
          try {
            const resolve = await res.json();
            if (res.status !== 200) {
              toast.error(resolve.message);
              setLikeLoader({ on: false });
            } else {
              let index = userPosts.findIndex(
                (post) => post.postId.toString() === event.target.id
              );
              if (isLike) {
                myLikedPosts = myLikedPosts
                  .replace(postId, "")
                  .replace(/,+/g, ",")
                  .replace(/^,|,$/g, "");
                userPosts[index].likes_count = userPosts[index].likes_count - 1;
              } else {
                myLikedPosts = myLikedPosts
                  ? myLikedPosts + "," + postId
                  : postId;
                userPosts[index].likes_count = userPosts[index].likes_count + 1;
              }
              setUserPosts(userPosts);
              dispatch(setMyLikedPosts(myLikedPosts));
              setLikeLoader({ on: false });
            }
          } catch (err) {
            console.log(err);
            setLikeLoader({ on: false });
          }
        })
        .catch((err) => {
          console.log(err);
          setLikeLoader({ on: false });
        });
    }
  };

  const getLikedPosts = () => {
    fetch(`${API_URL}/users/${localStorageUser.userId}/posts/likes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status !== 200) {
            toast.error(data.message);
          } else {
            dispatch(setMyLikedPosts(data.liked_posts));
          }
        } catch (err) {}
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserPosts = () => {
    setUsersPostsLoader(true);
    fetch(`${API_URL}/users/${userId}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status !== 200) {
            toast.error(data.message);
          } else {
            setUserPosts(data.posts);
          }
          setUsersPostsLoader(false);
        } catch (err) {}
        setUsersPostsLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setUsersPostsLoader(false);
      });
  };

  useEffect(() => {
    getUserPosts();
    getLikedPosts();
  }, [userId]);

  return (
    <div className="container mb-4">
      <div className="row d-flex justify-content-center">
        <h4 className="border border-white bg-dark text-white shadow text-center display-6 py-2 mt-3">
          {fullName} Posts
        </h4>
        {usersPostsLoader ? (
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status" />
          </div>
        ) : userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div
              className="col-7 col-sm-6 col-md-4 col-xl-3 pt-3"
              key={post.postId}
            >
              <UsersPostsCard
                post={post}
                myLikedPosts={myLikedPosts}
                likeLoader={likeLoader}
                handleLikeOnClick={handleLikeOnClick}
              />
            </div>
          ))
        ) : (
          <h1 className="text-danger text-center mt-2">No posts</h1>
        )}
      </div>
    </div>
  );
};

export default UsersPostContainer;
