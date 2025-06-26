require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const requireAuth = require('./middleware/jwtAuth');
const setupio = require('./socket');

const app = express();


// Database
const db = require('./db');

// Middleware
app.use(cors());
app.use(express.json());

// View engine
app.set('view engine', 'ejs');

// Server setup
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",}
});

setupio(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Chat backend running on port ${PORT}`));


//Routes
app.get('/', (req, res) => {
  res.render('home');
});

app.use(requireAuth, chatRoutes);
app.use(requireAuth, messageRoutes);





