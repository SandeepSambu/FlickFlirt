import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

const socketConnect = (userId, connectedId) => {
  return io(BASE_URL, {
    auth: {
      roomId: [userId, connectedId].sort().join("-"),
    },
  });
};

export default socketConnect;
