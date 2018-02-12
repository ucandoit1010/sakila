var path = require('path');
var express = require('express');
var es6 = require('express-es6-template-engine');
var bodyParser = require('body-parser');
global.parseForm = bodyParser.urlencoded({ extended: false })
var app = express();
var main = require('./routes/main');
var actor = require('./routes/api_actor');

app.use(bodyParser.json());

app.engine('html',es6);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','html');

app.use(express.static(path.join(__dirname,'assets')));


app.use('/',main);
app.use('/api/actor',actor);

app.listen(3311,function(){
    console.log('Start !');
});