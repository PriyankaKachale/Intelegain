const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var path = require('path');
var cors = require('cors');
//const mysql = require('mysql');

// ---------------- routers ---------------------
const userRoutes = require('./api/routes/user');
const employeeRouter = require('./api/routes/employee');
//-------------------------------------------------------


app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
       res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);
app.use('/employee', employeeRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});


app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
