import io from "socket.io-client";

export const socketConnect = ()=> io("http://localhost:5000")