// DEPENDENCIES
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const port = 3000;

// MIDDLEWARE
// body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// static files middleware
app.use(express.static('public'))