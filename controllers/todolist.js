const express = require('express')
const router = express.Router()

// all lists route
router.get('/', (req, res) => {
    res.render('todolist/index')
})

// new list item route (just displays form)
router.get('/new', (req, res) => {
    res.render('todolist/new')
})

// create todolist item route (actually adds to DB)
router.post('/', (req, res) => {
    res.send('Create')
})

module.exports = router