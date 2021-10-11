import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/utils";
import SearchBar from "../../components/SearchBar";
import UsersPostContainer from "../../containers/UsersPostContainer";
import { useSelector } from "react-redux";

const UsersContainer = () => {
  let menuToggle = useSelector((state) => state.menuToggle);
  const [users, setUsers] = useState({});
  const [clickedUser, setClickedUser] = useState({ userId: "", fullName: "" });
  const [searchValue, setSearchValue] = useState("");
  const [usersLoader, setUsersLoader] = useState(false);

  const handleSearchBarChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleUserOnClick = (event) => {
    const { id, name } = event.target;
    setClickedUser({ userId: id, fullName: name });
  };

  const getUsers = () => {
    setUsersLoader(true);
    fetch(`${API_URL}/users`, {
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
            setUsers(data.users);
          }
        } catch (err) {}
        setUsersLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setUsersLoader(false);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container d-flex flex-column align-items-center my-3">
      {menuToggle && (
        <SearchBar
          placeholder="search user...  🔎"
          handleSearchBarChange={handleSearchBarChange}
        />
      )}
      <div className="d-flex my-3 gap-3 border border-white shadow p-4">
        {usersLoader && (
          <div className="d-flex align-items-center">
            <div className="spinner-border" role="status" />
          </div>
        )}
        {users.length > 0 &&
          users
            .filter(
              (user) =>
                searchValue.toLocaleLowerCase() ===
                  user.name
                    .toLocaleLowerCase()
                    .substring(0, searchValue.length) ||
                searchValue.toLocaleLowerCase() ===
                  user.last_name
                    .toLocaleLowerCase()
                    .substring(0, searchValue.length)
            )
            .map((user) => (
              <button
                className="btn btn-light"
                key={user.userId}
                id={user.userId}
                name={user.name + " " + user.last_name}
                onClick={handleUserOnClick}
              >
                {user.name + " " + user.last_name}
              </button>
            ))}
      </div>
      {clickedUser.userId && (
        <UsersPostContainer
          userId={clickedUser.userId}
          fullName={clickedUser.fullName}
        />
      )}
    </div>
  );
};

export default UsersContainer;
