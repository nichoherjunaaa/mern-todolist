const Todo = require('../models/todoSchema')
const mongoose = require('mongoose')

const deleteTodo = async (req, res) => {
    const id = req.params.id;

    if (!id || !mongoose.isValidObjectId(id)) {
        return res.status(400).send('Invalid ID'); 
    }

    try {
        const result = await Todo.findByIdAndDelete(id);
        
        if (!result) {
            return res.status(404).send('Not found'); 
        }
        
        res.status(200).send('Deleted successfully'); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}
const getTodo = (req, res) => {
    try {
        Todo.find().then((todos) => {
            res.send(todos)
        }) 
    } catch (error) {
        console.log(error)
    }
}

const addTodo = async (req, res) => {
    try {
        const todo = await new Todo({
            todo: req.body.todo,
            dueDate: req.body.dueDate,
        })
        todo.save().then(() => {
            res.send(todo)
        })
    } catch (error) {
        console.log(error);
        
    } 
}

module.exports = {
    deleteTodo
    ,getTodo
    ,addTodo
}