const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {type: String, 'required': true, 'unique': true},
    password: {type: String, 'required': true},
    entries: [{
        item: {type: String, 'required': true},
        entry: {type: String, 'required': true},
        isComplete: {type: Boolean, 'default': false}
    }]
})

module.exports = mongoose.model('user', userSchema)