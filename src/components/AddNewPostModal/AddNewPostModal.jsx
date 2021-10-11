import React from "react";

const AddNewPostModal = ({
  post,
  handleOnChangeValue,
  handleAddNewPostClick,
}) => {
  return (
    <div
      className="modal fade"
      id="AddNewPostModal"
      tabIndex="-1"
      aria-labelledby="AddNewPostModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddNewPostModalLabel">
              New Post
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <div className="container">
                <h4>Header</h4>
                <input
                  type="text"
                  className="form-control border"
                  name="header"
                  value={post.header}
                  onChange={handleOnChangeValue}
                />
                <h4>Description</h4>
                <input
                  type="text"
                  className="form-control border"
                  name="description"
                  value={post.description}
                  onChange={handleOnChangeValue}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-dark mt-4 col-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleAddNewPostClick}
                >
                  Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewPostModal;
