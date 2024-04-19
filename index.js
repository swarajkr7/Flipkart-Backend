import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Router from './routes/route.js';

const app = express();

dotenv.config();

// Configure CORS options
const corsOptions = {
    origin: function (origin, callback) {
        // Specify a list of allowed origins
        const allowedOrigins = ['http://localhost:3000', 'https://myapp.com'];
        
        // Allow request if the origin is in the list of allowed origins
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials (e.g., cookies, authentication)
};

// Use the configured CORS middleware
app.use(cors(corsOptions));

// Use body-parser middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Use the router for handling all routes
app.use('/', Router);

const PORT = 7000;
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

// Establish the database connection
Connection(USERNAME, PASSWORD);

// Start the server
app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));

// Initialize default data (e.g., seeding the database)
DefaultData();
