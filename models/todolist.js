const mongoose = require('mongoose')

const todolistSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        default: false
    }
});

const List = mongoose.model('List', todolistSchema)

module.exports = List