const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');

// GET /api/todos - Get all todos with optional query parameters
router.get('/', (req, res) => {
    try {
        const { status } = req.query;

        let todos;
        if (status === 'completed') {
            todos = todoService.getTodosByStatus(true);
        } else if (status === 'pending') {
            todos = todoService.getTodosByStatus(false);
        } else {
            todos = todoService.getAllTodos();
        }

        res.status(200).json({
            success: true,
            count: todos.length,
            data: todos
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve todos',
            message: error.message
        });
    }
});

// GET /api/todos/stats - Get todo statistics
router.get('/stats', (req, res) => {
    try {
        const stats = todoService.getTodoCount();
        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve todo statistics',
            message: error.message
        });
    }
});

// GET /api/todos/:id - Get a specific todo by ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const todo = todoService.getTodoById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: `Todo with ID ${id} does not exist`
            });
        }

        res.status(200).json({
            success: true,
            data: todo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to retrieve todo',
            message: error.message
        });
    }
});

// POST /api/todos - Create a new todo
router.post('/', (req, res) => {
    try {
        const { title, description } = req.body;

        const newTodo = todoService.createTodo({ title, description });

        res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            data: newTodo
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Failed to create todo',
            message: error.message
        });
    }
});

// PUT /api/todos/:id - Update an existing todo
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedTodo = todoService.updateTodo(id, updateData);

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: `Todo with ID ${id} does not exist`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo updated successfully',
            data: updatedTodo
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Failed to update todo',
            message: error.message
        });
    }
});

// PATCH /api/todos/:id/toggle - Toggle todo completion status
router.patch('/:id/toggle', (req, res) => {
    try {
        const { id } = req.params;
        const todo = todoService.getTodoById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: `Todo with ID ${id} does not exist`
            });
        }

        const updatedTodo = todoService.updateTodo(id, { completed: !todo.completed });

        res.status(200).json({
            success: true,
            message: `Todo marked as ${updatedTodo.completed ? 'completed' : 'pending'}`,
            data: updatedTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to toggle todo status',
            message: error.message
        });
    }
});

// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = todoService.deleteTodo(id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                error: 'Todo not found',
                message: `Todo with ID ${id} does not exist`
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            data: deletedTodo
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete todo',
            message: error.message
        });
    }
});

module.exports = router;
