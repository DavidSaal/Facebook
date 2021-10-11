import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoggedIn, setLocalStorageUser } from "../../actions";
import { toast } from "react-toastify";
import "./AuthScreen.css";
import User from "../../assets/images/user.png";
import { API_URL } from "../../utils/utils";

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const onChangeHandler = () => {
    setIsLogin(!isLogin);
    setUser({
      name: "",
      lastName: "",
      email: "",
      password: "",
    });
    setMessage("");
  };

  const onLoggedIn = (authUser) => {
    setLoader(true);
    fetch(`${API_URL}/private`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUser.token}`,
      },
    })
      .then(async (res) => {
        try {
          if (res.status === 200) {
            toast.success("Welcome, " + authUser.fullName);
            setLoader(false);
          }
        } catch (err) {
          console.log(err);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const onSubmitHandler = (e) => {
    setLoader(true);
    e.preventDefault();
    fetch(`${API_URL}/${isLogin ? "login" : "signup"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status !== 200) {
            setIsError(true);
            setMessage(jsonRes.message);
            setLoader(false);
          } else {
            let authUser = {
              userId: jsonRes.user.userId,
              fullName: jsonRes.user.name + " " + jsonRes.user.last_name,
              email: jsonRes.user.email,
              token: jsonRes.token,
            };
            localStorage.setItem("localStorageUser", JSON.stringify(authUser));
            dispatch(setIsLoggedIn(true));
            dispatch(setLocalStorageUser(authUser));
            setLoader(false);
            onLoggedIn(authUser);
            setIsError(false);
          }
        } catch (err) {
          console.log(err);
          setLoader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <div className="wrapper fadeInDown mt-3">
      <div id="formContent">
        <div className="fadeIn first">
          <img className="mt-3 mb-2" src={User} alt="User" />
        </div>
        <form onSubmit={onSubmitHandler}>
          {!isLogin && (
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={user.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="last_name"
                name="lastName"
                placeholder="Last Name"
                value={user.lastName}
                onChange={handleInputChange}
              />
            </div>
          )}
          <input
            type="text"
            id="email"
            className="fadeIn first"
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            value={user.email}
            onChange={handleInputChange}
          />
          <input
            securetextentry="true"
            type="text"
            id="password"
            className="fadeIn second"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInputChange}
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value={isLogin ? "Login" : "Register"}
          />
          {loader && (
            <div className="spinner-border spinner-border-sm" role="status" />
          )}
          {isError && <p>{"Error: " + message}</p>}
        </form>
        <div id="formFooter">
          <a className="underlineHover" href="#" onClick={onChangeHandler}>
            {isLogin ? "New User?" : "Already Registered?"}
          </a>
          {isLogin && (
            <a
              className="underlineHover fs-7 mt-2"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#ForgotPasswordModal"
            >
              Forgot Password?
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
