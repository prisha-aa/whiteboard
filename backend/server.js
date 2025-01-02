
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const rooms = {}; // Object to track users in rooms

app.get("/", (req, res) => {
  res.send("This is MERN realtime board sharing app official server");
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    socket.emit("userIsJoined", { success: true });
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });

  socket.on("whiteboardData", (data) => {
    console.log(data);
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imgURL: data,
    });
  });

  // socket.on("disconnect", () => {
  //   console.log("A user disconnected");

  //   // Remove user from all rooms
  //   for (const roomId in rooms) {
  //     rooms[roomId] = rooms[roomId].filter(
  //       (user) => user.userId !== socket.id
  //     );

  //     if (rooms[roomId].length === 0) {
  //       delete rooms[roomId]; // Clean up empty rooms
  //     }
  //   }
  // });
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

