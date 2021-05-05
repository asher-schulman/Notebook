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
        title: req.body.title,
        entry: req.body.entry,
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

// edit item route (just displays form)// new list item route (just displays form)
router.get('/:id/edit', (req, res) => {
    res.render('todolist/edit', {
        List: List.findById(req.params.id)
    })
})

// edit todolist item route (actually writes to DB)
// router.patch('/:id/edit', async (req, res) => {
//     const todolist = List.findById(req.params.id)
// })

module.exports = router