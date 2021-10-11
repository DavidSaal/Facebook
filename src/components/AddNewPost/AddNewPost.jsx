import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";
import AddNewPostModal from "../AddNewPostModal";
import { addNewPost } from "../../actions";

const AddNewPost = () => {
  const dispatch = useDispatch();
  let localStorageUser = useSelector((state) => state.localStorageUser);
  const [post, setPost] = useState({ header: "", description: "" });
  const [loader, setLoader] = useState(false);

  const handleOnChangeValue = (event) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const handleAddNewPostClick = () => {
    setLoader(true);
    setPost({ header: "", description: "" });
    fetch(`${API_URL}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorageUser.userId,
        post: post,
      }),
    })
      .then(async (res) => {
        try {
          const resolve = await res.json();
          if (res.status !== 200) {
            toast.error(resolve.message);
          } else {
            dispatch(addNewPost(resolve.newPost));
            toast.success(resolve.message);
          }
        } catch (err) {
          console.log(err);
        }
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="d-flex gap-2">
      <AddNewPostModal
        post={post}
        handleOnChangeValue={handleOnChangeValue}
        handleAddNewPostClick={handleAddNewPostClick}
      />
      {loader && (
        <div className="d-flex align-items-center">
          <div className="spinner-border" role="status" />
        </div>
      )}
      <button
        className="btn btn-primary py-1 mt-1"
        data-bs-toggle="modal"
        data-bs-target="#AddNewPostModal"
      >
        Add Post
      </button>
    </div>
  );
};

export default AddNewPost;
