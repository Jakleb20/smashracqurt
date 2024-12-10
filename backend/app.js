var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var tournamentRouter = require('./routes/tournament');
var matchRouter = require('./routes/match');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const { connectDB } = require('./src/db/utilService.js');
const { initDB } = require('./src/db/DBService.js');
connectDB();
initDB();

app.use(cors({
    origin: '*', // Erlaubt Anfragen von allen Ursprüngen
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Erlaubt alle Methoden
    allowedHeaders: ['Content-Type', 'Authorization'] // Erlaubt diese Header
}));


app.use('/users', userRouter);
app.use("/tournaments", tournamentRouter);
app.use('/matches', matchRouter);

module.exports = app;
