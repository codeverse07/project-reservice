const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const AppError = require('./utils/AppError');
const routes = require('./routes/v1');
const errorHandler = require('./middlewares/errorHandler');
const { globalLimiter } = require('./middlewares/rateLimit');

const app = express();

// Security HTTP headers
app.use(helmet());
app.use(require('compression')());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
app.use('/api', globalLimiter);
app.use(cors({
    origin: ['https://frontend-umber-three-92.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Serving static files
app.use('/public', express.static('public'));

// Routes
app.use('/api/v1', routes);

// 404 Handler
// 404 Handler - Disabled for debugging
// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// Global Error Handler
app.use(errorHandler);

module.exports = app;
