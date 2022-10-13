const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const category = require('./routes/category')
const item = require('./routes/item')
const user = require('./routes/user')

dotenv.config({ path: './config/config.env' })

const app = express();

//use morgan if we are in development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// read/parse JSON data
app.use(bodyParser.json());

//use our logger
app.use(logger)

app.use('/api/v1/category', category);
app.use('/api/v1/item', item);
app.use('/api/v1/user', user);

//handles error 
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1))
})

