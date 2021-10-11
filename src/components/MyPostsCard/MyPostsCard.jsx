import React from "react";
import "./MyPostsCard.css";

const MyPostsCard = ({ header, description, likes_count }) => {
  return (
    <div className="card h-100">
      <div className="card-body text-center pb-1 py-0">
        <h4 className="text-center mt-2 pb-2 border-bottom mb-3">{header}</h4>
        {description && <h6 className="text-center pb-4">{description}</h6>}
      </div>
      <h6 className="text-center mb-3">{likes_count} ❤️</h6>
    </div>
  );
};

export default MyPostsCard;
