import React from "react";

const ForgotPasswordModal = ({
  handleForgotPassword,
  handleForgotPasswordChange,
  forgotPassUser,
}) => {
  return (
    <div
      className="modal fade"
      id="ForgotPasswordModal"
      tabIndex="-1"
      aria-labelledby="ForgotPasswordLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="AddNewLinkModalLabel">
              Change password form
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
                <h4>Email</h4>
                <input
                  type="text"
                  className="form-control border"
                  name="email"
                  value={forgotPassUser.email}
                  onChange={handleForgotPasswordChange}
                />
                <h4>New Password</h4>
                <input
                  type="text"
                  className="form-control border"
                  name="password"
                  value={forgotPassUser.password}
                  onChange={handleForgotPasswordChange}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-dark mt-4 col-2"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleForgotPassword}
                >
                  Change
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
