const express = require('express')
const router = express.Router()
const List = require('../models/todolist')

// all lists route
router.get('/', async (req, res) => {
    try {
        const todolist = await List.find({})
        res.render('todolist/index', {
            todolist: todolist
        })
    } catch {
        res.redirect('/')
    }
})

// new list item route (just displays form)
router.get('/new', (req, res) => {
    res.render('todolist/new', {
        List: List
    })
})

// create todolist item route (actually adds to DB)
router.post('/', async (req, res) => {
    const todolist = new List({
        item: req.body.item,
        isComplete: false
    })
    try {
        const newItem = await todolist.save()
        res.redirect('todolist')
        // res.redirect(`todolist/${newItem.id}`)
    } catch {
        res.render('todolist/new', {
            todolist: todolist,
            errorMessage: 'error creating new entry'
        })
    }
})

module.exports = router