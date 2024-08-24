import { faker } from "@faker-js/faker";
import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import loggerMiddleware from "./middleware/logger";
import responseHelper from "./utils/helpers";

const app = express();
app.use(express.json());
app.use(loggerMiddleware);
app.use(cors());
const socketServer = createServer(express);
const io = new Server(socketServer, {
  pingInterval: 2000,
  pingTimeout: 25000,
  transports: ["websocket"],
});
io.on('connection', (socket: Socket) => {
  console.log('A user connected');
  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', faker.internet.userName());
  });
  socket.on('date', () => io.emit('date', new Date()));
  socket.on('disconnect', () => console.log('A user disconnected'));
});

app.get('/', async (req: Request, res: Response) => responseHelper(res, 200, "Successful!!"));
app.post('/send', async (req: Request, res: Response) => responseHelper(res, 200, "Successful!!", req.body));
app.listen(process.env.SERVER_PORT, () => console.log(`🚀 Server Started at ${process.env.SERVER_PORT}`));
socketServer.listen(process.env.SOCKET_PORT, () => console.log(`🚀 Socket Started at ${process.env.SOCKET_PORT}`));