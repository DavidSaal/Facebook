import React from "react";
import "./UsersPostsCard.css";
import like from "../../assets/images/like.png";
import unlike from "../../assets/images/unlike.png";

const UsersPostsCard = ({
  post,
  myLikedPosts,
  likeLoader,
  handleLikeOnClick,
}) => {
  return (
    <div className="card h-100">
      <div className="d-flex">
        <img
          id={post.postId}
          className="pb-1 ms-2 mt-2"
          src={myLikedPosts.includes(post.postId) ? like : unlike}
          alt="like"
          onClick={handleLikeOnClick}
        />
        {likeLoader.on && likeLoader.postId === post.postId.toString() && (
          <div className="d-flex align-items-center">
            <div
              className="spinner-border spinner-border-sm ms-2"
              role="status"
            />
          </div>
        )}
      </div>
      <div className="card-body text-center pb-1 py-0">
        <h4 className="text-center mt-2 pb-2 border-bottom mb-3">
          {post.header}
        </h4>
        {post.description && (
          <h6 className="text-center pb-1">{post.description}</h6>
        )}
      </div>
      <h6 className="text-center mb-3">{post.likes_count} ❤️</h6>
    </div>
  );
};

export default UsersPostsCard;
