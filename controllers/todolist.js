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

//code using mongoose syntax
// router.post('/', (req, res) => {
//     const todolist = new List({
//         title: req.body.title,
//         entry: req.body.entry,
//         isComplete: false
//     })
//     todolist.save((err, newItem) => {
//         if (err) {
//             res.render('todolist/new', {
//                 todolist: todolist,
//                 errorMessage: 'error creating new entry'
//             })
//         } else {
//             res.redirect(`todolist`)
//         }
//     })
// for me, using async await made more sense thinking about how the requests are actually happening and for my tiny brain to keep track of each little step. it's basically just tells the function after it to be asyncronous and then await happens after the functions begins. i think it also ended up saving me a bit of code length, but i prefer it to the nested callbacks in the .save() method using mongoose's syntax

// code as an async/await
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
        //if we cant find a todolist with this id
        if (todolist == null) {
            res.redirect('/')
        //otherwise, re-render the edit page with everything we had entered
        } else {
            res.render('todolist/edit', {
                todolist: todolist,
                errorMessage: 'error updating entry'
            })
        }
    }
})

// delete route
router.delete('/:id', async (req, res) => {
    //defined todolist up here because i need to access it in my catch. this is a trick i saw on the internet. not really sure why it works like this without proper variable declaration...
    let todolist
    try {
        todolist = await List.findById(req.params.id)
        todolist.title = req.body.title
        todolist.entry = req.body.entry
        await todolist.remove()
        res.redirect('/todolist')
    } catch {
        //if we cant find a todolist with this id to remove
        if (todolist == null) {
            res.redirect('/')
        } else {
            res.redirect(`/todolist${todolist.id}`)
        }
    }
})

module.exports = router