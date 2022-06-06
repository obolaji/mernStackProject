require('./public/js/models/db.js')

const express = require('express');

const path = require('path');

const bodyparser = require('body-parser');

const hbs = require('express-handlebars');

const Handlebars = require('handlebars');

const mongoose = require('mongoose');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

//const bcrypt = require('bcryptjs')

const app = express();


const public = path.join(__dirname, 'public');


const courseworkController = require('./public/js/controllers/courseworkController');


const courseController = require('./public/js/controllers/coursesdescriptionController');




app.engine('hbs', hbs({ defaultLayout: 'courseworkdescriptionLayout.hbs', layoutsDir: __dirname + '/public/views/layouts', handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('views',path.join(__dirname,'/public/views'));
app.set('view engine', 'hbs');


app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());


app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/html', express.static(__dirname + 'public/html'))
app.use('/coursework', courseworkController);
app.use('/course', courseController);



app.get('/', function(req, res) {
    res.sendFile(path.join(public, 'html/menupage.html'));
})


app.get('/menupage', function(req, res) {
    res.sendFile(path.join(public, 'html/menupage.html'));
})

app.get('/course', function(req, res) {
    res.render("coursework/courselist.hbs");
})

app.get('/coursework', function(req, res) {
    res.render("coursework/courseworklist.hbs");
})


app.get('/addcourse', function(req, res) {
    res.render("coursework/coursesdescription.hbs");

   })
app.get('/addcoursework', function(req, res) {
    res.render("coursework/courseworkdescription.hbs");
   })
app.use(function(req, res) {
 res.status(404);
 res.send('Oops! We didn\'t find what you are looking for.');
})
app.listen(3000, () => {
 console.log('Server started on port 3000. Ctrl^c to quit.');
}) 

