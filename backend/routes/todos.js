const router = require('express').Router();
let Todo = require('../models/todo.model');

router.route('/').get((req, res) => {
    Todo.find()
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const todo_description = req.body.todo_description;
    const todo_responsible = req.body.todo_responsible;
    const todo_priority = req.body.todo_priority;
    const todo_completed = req.body.todo_completed;

    const newTodo = new Todo({
        todo_description,
        todo_responsible,
        todo_priority,
        todo_completed
    });
    newTodo.save()
        .then(() => res.json('Todo added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => res.json(todo))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json("Todo deleted."))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;
            todo.save()
                .then(() => res.json("Todo upadted!"))
                .catch(err => res.status(400).json("Error: " + err));
        });
});


module.exports = router;