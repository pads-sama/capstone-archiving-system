require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const connectDB = require('./config/dbConnection');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3001;

connectDB();

app.use(logger);

app.use(cors(corsOption));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
    res.status(404);
    req.accepts('html')
        ? res.sendFile(path.join(__dirname, 'views', '404.html'))
        : req.accepts('json')
            ? req.json({ message: '404 Not Found!' })
            : res.type('txt').send('404 Not Found!')
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB');
    app.listen(PORT, () => console.log(`Server listening to port:${PORT}`));
});

mongoose.connection.on('error', error => {
    console.log(error)
    logEvents(`${error.no}:${error.code}\t${error.syscall}\t${error.hostname}`, 'mongoErrorLog.log');
});