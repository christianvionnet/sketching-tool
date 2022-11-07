import React, { useState } from "react";
import Button from "./Button";

const CreateJoinRoom = ({ setUser, setRoomJoined }) => {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    if (!name) return window.alert("Please enter your name!");
    if (!roomId) return window.alert("Please enter a room ID!");

    setUser({
      roomId,
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };

  const handleJoinSubmit = (event) => {
    event.preventDefault();
    if (!joinName) return window.alert("Please enter your name!");
    if (!joinRoomId) return window.alert("Please enter a room ID!");

    setUser({
      roomId: joinRoomId,
      userId: name,
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <div className="create-join-container">
      <div>
        <h3 className="form-title">Create room</h3>
        <form onSubmit={handleCreateSubmit} className="form-container">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <Button type={"submit"} label={"Create room"} />
        </form>
      </div>
      <span>or</span>
      <div>
        <h3 className="form-title">Join room</h3>
        <form onSubmit={handleJoinSubmit} className="form-container">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
            value={joinName}
            onChange={(e) => setJoinName(e.target.value)}
          />
          <input
            type="text"
            className="form-control outline-0"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            placeholder="Room ID"
            style={{
              boxShadow: "none",
            }}
          />
          <Button type={"submit"} label={"Join room"} />
        </form>
      </div>
    </div>
  );
};

export default CreateJoinRoom;
