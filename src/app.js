require('dotenv').config();
import express from 'express';
import cors from 'cors';

// Import Routes
import authRoute from './routes/auth.routes';

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT);

// Middlewares
app.use(express.json());
app.use(cors());

// Route Middlewares
app.use('/api/user', authRoute);

export default app;