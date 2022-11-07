const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

app.use(cors());

io.on("connection", (socket) => {
  console.log("User online");

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });
});

const serverPort = process.env.MY_PORT || process.env.PORT || 5000;
http.listen(serverPort, () => {
  console.log(`Server running on port ${serverPort}`);
});
