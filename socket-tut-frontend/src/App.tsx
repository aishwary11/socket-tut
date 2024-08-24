import { FC, useEffect } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';
import { newSocket } from './common/constant';
import viteLogo from '/vite.svg';

const App: FC = () => {
  useEffect(() => {
    newSocket.on('message', (data: string) => console.log('Socket Connected', data));
    newSocket.on('disconnect', () => console.log('Socket Disconnected'));
    newSocket.on('date', (date: Date) => console.log('Date', date));
    newSocket.emit('date');
    return () => {
      newSocket.off('message');
      newSocket.off('disconnect');
      newSocket.off('date');
    };
  }, []);
  const sendMessage = (message: string) => newSocket.emit('message', message);
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
      <button onClick={() => sendMessage('Hello, server!')}>Send Message</button>
    </>
  );
};

export default App;
