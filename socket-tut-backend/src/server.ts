import { faker } from "@faker-js/faker";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
dotenv.config();

const app = express();
app.use(cors());
const socketServer = createServer(express);
const io = new Server(socketServer, {
  pingInterval: 2000,
  pingTimeout: 25000,
  transports: ["websocket"],
});
io.on("connection", (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`);
  io.emit('message', faker.internet.userName());
  io.on('disconnect', () => {
    console.log('A user disconnected');
  });
  // socket.on("join_room", (data) => socket.join(data));
  // socket.on("send_message", (data) => socket.to(data.room).emit("receive_message", faker.internet.userName()));
});


app.get('/', async (req: Request, res: Response) => res.status(200).json({ msg: "Server serves api" }));
app.listen(process.env.SERVER_PORT, () => console.log(`🚀 Server Started at ${process.env.SERVER_PORT}`));
socketServer.listen(process.env.SOCKET_PORT, () => console.log(`🚀 Socket connected at ${process.env.SOCKET_PORT}`));