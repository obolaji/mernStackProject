const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dbUser:dbUser@wpd2.9opnu.mongodb.net/Lists?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},  () => console.log('connected to db1!'));
require('./coursework.model');
require('./course.model');
