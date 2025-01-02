
// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// app.get("/", (req, res) => {
//   res.send("This is mern realtime board sharing app official server");
// });

// io.on("connection", (socket) => {
//   socket.on("userJoined", (data) => {
//     const { name, userId, roomId, host, presenter } = data;

//     // Replace 'getUsers(user.room)' with appropriate logic
//     // Assuming it fetches room users
//     const roomUsers = []; // Placeholder logic

//     socket.join(roomId);
//     socket.emit("userIsJoined", {
//       success: true,
//     });
//   });
// }); // <-- Correctly closed io.on("connection")

// const port = process.env.PORT || 5000;
// server.listen(port, () =>
//   console.log("server is running on http://localhost:5000")
// );





const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const rooms = {}; // Object to track users in rooms

app.get("/", (req, res) => {
  res.send("This is MERN realtime board sharing app official server");
});

let roomIdGlobal, imgURLGlobal
io.on("connection",(socket)=>{
  socket.on("userJoined",(data)=>{
    const {name,userId,roomId,host,presenter}=data;
    roomIdGlobal=roomId;
    socket.join(roomId);
    socket.emit("userIsJoined",{success:true});
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
      imgURL: imgURLGlobal,
    })
  });
  socket.on("whiteboardData",(data)=>{
    console.log(data)
    imgURLGlobal=data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
      imgURL:data,
    });

  });

});


// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("userJoined", (data) => {
//     const { name, userId, roomId, host, presenter } = data;
//     roomIdGlobal=roomId;

//     // Initialize the room if it doesn't exist
//     if (!rooms[roomId]) {
//       rooms[roomId] = [];
//     }

//     // Add the user to the room
//     rooms[roomId].push({ userId, name, host, presenter });

//     // Join the user to the room
//     socket.join(roomId);

//     // Emit success message to the user
//     socket.emit("userIsJoined", {
//       success: true,
//       roomUsers: rooms[roomId], // Provide room users
//     });
//     socket.broadcast.to(roomId).emit("whiteBoardDataResponse",{
//       imgURL:imgURLGlobal,
//     })

//     console.log(`${name} joined room ${roomId}`);
//   });

//   socket.on("whiteboardData", (data) => {
//     console.log("Received whiteboard data:", data);
//     imgURLGlobal = data;
//     console.log("Emitting whiteBoardDataResponse to all clients");

//     // Broadcast to all connected clients (not room-specific)
//     io.emit("whiteBoardDataResponse", { imgURL: imgURLGlobal });
// });


  

  socket.on("whiteboardData",(data=>{
    imgURLGlobal=data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse",{
      imgURL:data,
    })

  }))

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");

//     // Remove user from all rooms
//     for (const roomId in rooms) {
//       rooms[roomId] = rooms[roomId].filter(
//         (user) => user.userId !== socket.id
//       );

//       if (rooms[roomId].length === 0) {
//         delete rooms[roomId]; // Clean up empty rooms
//       }
//     }
//   });
// });

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);


// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

// const rooms = {}; // Object to track users in rooms

// app.get("/", (req, res) => {
//   res.send("This is MERN realtime board sharing app official server");
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("userJoined", (data) => {
//     const { name, userId, roomId, host, presenter } = data;

//     // Initialize the room if it doesn't exist
//     if (!rooms[roomId]) {
//       rooms[roomId] = {
//         users: [],
//         imgURL: null, // Initialize an empty imgURL for each room
//       };
//     }

//     // Add the user to the room
//     rooms[roomId].users.push({ userId, name, host, presenter });

//     // Join the user to the room
//     socket.join(roomId);

//     // Emit success message to the user
//     socket.emit("userIsJoined", {
//       success: true,
//       roomUsers: rooms[roomId].users, // Provide room users
//     });

//     // Emit current whiteboard image to the new user
//     socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
//       imgURl: rooms[roomId].imgURL,
//     });

//     console.log(`${name} joined room ${roomId}`);
//   });

//   socket.on("whiteboardData", (data) => {
//     const roomId = Object.keys(socket.rooms)[1]; // Get the roomId from the socket
//     if (rooms[roomId]) {
//       rooms[roomId].imgURL = data; // Save the image URL for the room
//       socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
//         imgURL: data,
//       });
//     }
//   });

  

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");

//     // Remove user from the room
//     for (const roomId in rooms) {
//       rooms[roomId].users = rooms[roomId].users.filter(
//         (user) => user.userId !== socket.id
//       );

//       if (rooms[roomId].users.length === 0) {
//         delete rooms[roomId]; // Clean up empty rooms
//       }
//     }
//   });
// });

// const port = process.env.PORT || 5000;
// server.listen(port, () =>
//   console.log(`Server is running on http://localhost:${port}`)
// );
