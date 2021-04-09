// const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/home');
const helloRouter = require('./routes/hello');
const allRouter = require('./routes/all');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/hello', helloRouter)
app.use('/all', allRouter);

//ADMIN_USERS FUNCTIONALITY
// Provide login for administrator
// allow users to check chatrooms.
// allow users to pick a chatroom
// allow users to see chat messages in the chatroom  - socket.io
// allow users to reply to chat messages.- socket.io


//ANONYMOUS USERS FUNCTIONALITY
// allow the anonymous user to provide name, email (optional);
// allow anonymouse user to create chatroom
// allow anonymouse users to send chat messages. - socket.io
// provide replies to anonymouse users from admin users. - socket.io

module.exports = app;
