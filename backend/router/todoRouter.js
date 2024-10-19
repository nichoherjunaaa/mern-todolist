const express = require('express')
const router = express.Router()
const Todo = require('../models/todoSchema')
const { getTodo, addTodo, deleteTodo } = require('../controller/todoController')

router.get('/', getTodo )
router.post('/', addTodo )
router.delete('/:id', deleteTodo )

module.exports = router;