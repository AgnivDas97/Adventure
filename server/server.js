import express from 'express';
import cors from 'cors'; // Import CORS middleware
import 'dotenv/config'; // Load environment variables from .env file
import authRoute from './router/auth-router.js';
import userRoute from './router/user-router.js'; // Import the contact route
import connectDb from './utils/db.js'; // Import the database connection function
import errorMiddleware from './middlewares/error-middleware.js';
import cookieParser from 'cookie-parser';

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

app.use(errorMiddleware); // Error handling middleware

connectDb().then(()=>{ // Connect to the database
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
}); 