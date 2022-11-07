// import Board from "../board/Board";
// import Header from "../header/Header";
// import Login from "../login/Login";
import Header from "./Header";
import Collapse from "./Collapse";
import Room from "./Room";

import { useEffect, useState } from "react";

import io from "socket.io-client";
import Sketches from "./Sketches";
import CreateJoinRoom from "./CreateJoinRoom";

const server = "http://localhost:5000";
const connectionOptions = {
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const Container = () => {
  const [userNo, setUserNo] = useState(0);
  const [roomJoined, setRoomJoined] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (roomJoined) {
      socket.emit("user-joined", user);
    }
  }, [roomJoined]);

  return (
    <div className="container">
      <Header />
      {roomJoined ? (
        <div className="board-container">
          <div className="card-container">
            <Sketches label={"SKECTHES"} />
            <Collapse label={"USERS"} />
          </div>
          <Room
            userNo={userNo}
            socket={socket}
            setUsers={setUsers}
            setUserNo={setUserNo}
          />
        </div>
      ) : (
        // <div className="create-join-container">
        <CreateJoinRoom setUser={setUser} setRoomJoined={setRoomJoined} />
        // </div>
      )}
    </div>
  );
};

export default Container;
