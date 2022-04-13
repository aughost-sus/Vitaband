import { useEffect } from "react";
import io from "socket.io-client";
import { API_URL } from "../../utils/constants";

export const useSocket = (channel, callback) => {
  useEffect(() => {
    const socket = io(API_URL);
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on(channel, callback);
    // socket.on("disconnect", () => setTime("Server disconnected"));
  }, []);
};
