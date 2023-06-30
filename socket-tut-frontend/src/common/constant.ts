import { io } from 'socket.io-client';

export const newSocket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
  transports: ['websocket'],
  upgrade: false,
  autoConnect: true
});
