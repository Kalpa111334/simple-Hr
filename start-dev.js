import express from 'express';
import { createServer } from 'http';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { AuthenticationServer } from './app/core/authentication/server.js';
import { SocketServer } from './app/plugins/socket/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev'));
app.disable('x-powered-by');
app.use(express.static('build/client'));

// Authentication setup
AuthenticationServer.expressSetup(app);

// Socket setup
SocketServer.start(httpServer);

// Start server
httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
});
