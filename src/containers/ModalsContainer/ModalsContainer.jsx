import React, { useState } from "react";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";

const ModalsContainer = () => {
  const [forgotPassUser, setForgotPassUser] = useState({
    email: "",
    password: "",
  });

  const handleForgotPasswordChange = (event) => {
    const { name, value } = event.target;
    setForgotPassUser({ ...forgotPassUser, [name]: value });
  };

  const handleForgotPassword = (e) => {
    fetch(`${API_URL}/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(forgotPassUser),
    })
      .then(async (res) => {
        try {
          const data = await res.json();
          if (res.status !== 200) {
            toast.error(data.message);
          } else {
            toast.success(data.message);
            setForgotPassUser({
              email: "",
              password: "",
            });
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    e.preventDefault();
  };

  return (
    <div>
      <ForgotPasswordModal
        handleForgotPassword={handleForgotPassword}
        handleForgotPasswordChange={handleForgotPasswordChange}
        forgotPassUser={forgotPassUser}
      />
    </div>
  );
};

export default ModalsContainer;
