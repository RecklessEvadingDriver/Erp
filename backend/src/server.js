import 'dotenv/config';
import http from 'node:http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app.js';
import connectDB from './config/db.js';

const port = Number(process.env.PORT || 5000);
const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL?.split(',') || '*',
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  socket.emit('server:hello', { message: 'Connected to ERP realtime channel' });
});

const start = async () => {
  try {
    await connectDB();
    server.listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`ERP backend running on port ${port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server', error.message);
    process.exit(1);
  }
};

start();
