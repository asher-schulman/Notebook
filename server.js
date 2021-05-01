// DEPENDENCIES
// require express library
const express = require('express');
const app = express();
// require express layouts
const expressLayouts = require('express-ejs-layouts')

// tell server where our controllers/routers are
const indexRouter = require('./controllers/index')

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
// tell express we want to use express layouts
app.use(expressLayouts)
// tell express where public files will be
app.use(express.static('public'))
// maybe needing json parser?
// app.use(express.json())
// tell server which router/controller to use for which path
app.use('/', indexRouter)

const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');


// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({
    extended: true
}));


app.listen(3000, () => {
    console.log(`listening on port 3000`)
})