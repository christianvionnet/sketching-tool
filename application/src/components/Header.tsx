import { useState, useEffect } from "react";
import logo from "../../assets/images/logo.svg";
import { getCurrentUser, getUsers } from "../services";

const Header = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => setUsers(users))
      .catch((error) => console.log(error));

    getCurrentUser()
      .then((users) => setCurrentUser(users))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="header-container">
      <div className="image-container">
        <a href="https://naya.studio/">
          <svg
            width="31"
            height="23"
            viewBox="0 0 31 23"
            fill="none"
            className="path-stroke"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 22V1C5.08974 10.3947 13.641 22 18.1026 22C22.5641 22 27.9551 10.2105 30 1"
              stroke="none"
              strokeWidth="1.72401"
            ></path>
          </svg>
        </a>
      </div>
      <div className="user-container">
        <span>{currentUser}</span>
        <span>avatar</span>
      </div>
    </div>
  );
};

export default Header;
