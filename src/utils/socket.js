const { Server } = require("socket.io");

const connectSocket = (app) => {
  const io = new Server(app, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", () => {
      const roomId = socket.handshake.auth.roomId;
      socket.join(roomId);
    });

    socket.on("sendMessage", ({ text, name }) => {
      const roomId = socket.handshake.auth.roomId;
      io.to(roomId).emit("recieveMessage", { name, text });
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = connectSocket;
