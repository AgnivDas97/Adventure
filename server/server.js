import express from 'express';
import cors from 'cors'; // Import CORS middleware
import 'dotenv/config'; // Load environment variables from .env file
import authRoute from './router/auth-router.js';
import userRoute from './router/user-router.js'; // Import the contact route
import connectDb from './utils/db.js'; // Import the database connection function
import errorMiddleware from './middlewares/error-middleware.js';
import cookieParser from 'cookie-parser';
import chatRoute from './chat/chat-router/chatRoutes.js'; // Import chat routes
import messageRoutes from './chat/chat-router/messageRoutes.js'; // Import message routes
// Soket.io setup
import { Server } from 'socket.io';
// import { addUser, removeUser, getUser, getUsersInRoom } from './utils/socketUtils.js';

const app = express();

const PORT = process.env.PORT || 5000;

//! handling cors policy
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: "GET, POST, PUT, DELETE", // Allow these HTTP methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser());

app.use('/', authRoute); // Authentication routes
app.use('/user', userRoute); // Contact form routes
app.use('/chat', chatRoute)
app.use('/messages',messageRoutes)


app.use(errorMiddleware); // Error handling middleware

connectDb().then(()=>{ // Connect to the database
    const server = app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

//#region -----socket.io setup-----

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    // origin: "http://localhost:3000",
    origin: "http://localhost:5173",

    // credentials: true,
  },
});


io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

//#endregion


});