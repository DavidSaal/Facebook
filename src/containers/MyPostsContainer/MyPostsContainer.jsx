import React, { useEffect, useState } from "react";
import MyPostsCard from "../../components/MyPostsCard";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";
import { setMyPosts } from "../../actions";
import { useDispatch, useSelector } from "react-redux";

const MyPostsContainer = ({ userId, fullName }) => {
  const dispatch = useDispatch();
  let myPosts = useSelector((state) => state.myPosts);
  const [usersPostsLoader, setUsersPostsLoader] = useState(false);

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
            dispatch(setMyPosts(data.posts));
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
  }, [userId]);

  return (
    <div className="container mb-4">
      <div className="row d-flex justify-content-center">
        <h4 className="border border-white bg-dark text-white shadow text-center display-6 py-2 mt-4">
          My Posts
        </h4>
        {usersPostsLoader ? (
          <div className="d-flex justify-content-center mt-3">
            <div className="spinner-border" role="status" />
          </div>
        ) : myPosts.length > 0 ? (
          myPosts.map((post) => (
            <div
              className="col-7 col-sm-6 col-md-4 col-xl-3 pt-3"
              key={post.postId}
            >
              <MyPostsCard
                id={post.postId}
                header={post.header}
                description={post.description}
                likes_count={post.likes_count}
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

export default MyPostsContainer;
