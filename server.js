// DEPENDENCIES
// import express
const express = require('express');
// import express layouts
const expressLayouts = require('express-ejs-layouts')
// tell server where our controllers/routers are
const indexRouter = require('./controllers/index')
const todolistRouter = require('./controllers/todolist')

const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');

// DB urls use whichever one works, probably local for now
// const DATABASE_URL = 'mongodb://localhost:27017/todolist'
//begins and initiallized our express framework (kinda 'starts' the server)
const app = express();


// import mongoose
const mongoose = require('mongoose');
//tells mongoose what databse to try and connect to. establishes how our backend server communicates with the back end database
// mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/todolist', {
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/todolist', {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

//double-check that we connected to mongoose
mongoose.connection.on('error', () => {
    console.log('Error connecting to mongoose database...')
})
mongoose.connection.once('open', () => {
    console.log('Connected to mongoose database')
})

// tells us what view file format to use
app.set('view engine', 'ejs')
// tells us where all views are coming from
app.set('views', __dirname + '/views')
// let's us know where layout file is
app.set('layout', 'layouts/layout')

// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))
// maybe needing json parser?
app.use(express.json())
// tell express we want to use express layouts
app.use(expressLayouts)
// tell express where public files will be
app.use(express.static(__dirname + '/public'))
// tell server which router/controller to use for which path
app.use('/', indexRouter)
app.use('/todolist', todolistRouter)

// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({
    extended: true
}));

app.listen(process.env.PORT || 3000), () => {
    console.log(`listening on port 3000`)
}