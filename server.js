require('dotenv').config({path: __dirname + '/ENVIRONMENT.env'});
const express = require('express');
const app = express();
const port = process.env.PORT;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./api/routes/botRoutes');
const mongodb = 'mongodb+srv://MeritBot:' + process.env.SERVER_KEY + '@discord-project-fho6m.mongodb.net/test?retryWrites=true';

mongoose.Promise = global.Promise;
mongoose.connect(mongodb, { 
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: false,
    dbName: 'Discord' });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port);