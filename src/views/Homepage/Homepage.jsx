import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import MyPostsContainer from "../../containers/MyPostsContainer";
import UsersContainer from "../../containers/UsersContainer";
import ModalsContainer from "../../containers/ModalsContainer";
import AuthScreen from "../../components/AuthScreen";
import "./Homepage.css";

const Homepage = () => {
  let isLoggedIn = useSelector((state) => state.isLoggedIn);
  let localStorageUser = useSelector((state) => state.localStorageUser);

  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <ModalsContainer />
        <Header />
        <Route
          exact
          path="/"
          render={() =>
            isLoggedIn ? (
              <MyPostsContainer
                userId={localStorageUser.userId}
                fullName={localStorageUser.fullName}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/login"
          render={() => (isLoggedIn ? <Redirect to="/" /> : <AuthScreen />)}
        />
        <Route
          exact
          path="/users"
          render={() =>
            isLoggedIn ? <UsersContainer /> : <Redirect to="/login" />
          }
        />
      </Router>
    </div>
  );
};

export default Homepage;
