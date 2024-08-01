import { io } from "socket.io-client";

const URL = "http://localhost:7000"; // Replace with your server URL
const socket = io(URL);

export default socket;
