const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOption = require('./config/corsOption');
const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => console.log(`Server listening to port:${PORT}`));