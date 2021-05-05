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
        todolist: new List()
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
        res.redirect(`todolist/${newItem.id}`)
    } catch {
        res.render('todolist/new', {
            todolist: todolist,
            errorMessage: 'error creating new entry'
        })
    }
})

// show route
router.get('/:id', (req, res) => {
    res.send('Show Specific Log ' + req.params.id)
})

// edit item route (just displays form)// new list item route (just displays form)
router.get('/:id/edit', async (req, res) => {
    const todolist = await List.findById(req.params.id)
    try {
        res.render('todolist/edit', {
            todolist: todolist
        })
    } catch {
        res.redirect('/todolist')
    }
})

// edit/create todolist item route (actually writes to DB)
router.put('/:id', async (req, res) => {
    //defined todolist up here because i need to access it in my catch
    let todolist
    try {
        todolist = await List.findById(req.params.id)
        todolist.title = req.body.title
        todolist.entry = req.body.entry
        await todolist.save()
        res.redirect(`/todolist/${todolist.id}`)
    } catch {
        if (todolist == null) {
            res.redirect('/')
        } else {
            res.render('todolist/edit', {
                todolist: todolist,
                errorMessage: 'error updating entry'
            })
        }
    }
    // const todolist = List.findById(req.params.id)
})

// delete route
router.delete('/:id', (req, res) => {
    res.send('delete ' + req.params.id)
})

module.exports = router