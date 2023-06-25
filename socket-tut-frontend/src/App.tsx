import { FC } from 'react';
import { io } from 'socket.io-client';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
const App: FC = () => {
  // const [count, setCount] = useState<number>(0);
  const newSocket = io(import.meta.env.VITE_SOCKET_BASE_URL, {
    transports: ['websocket'],
    upgrade: false,
    autoConnect: true
  });
  newSocket.on('message', (data) => console.log('Socket Connected', data));
  newSocket.on('disconnect', () => console.log('Socket Disconnected'));

  const sendMessage = (message: string) => {
    console.log('message', message);
    newSocket.emit('message', message);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <button onClick={() => sendMessage('Hello, server!')}>Send Message</button>
    </>
  );
};

export default App;
