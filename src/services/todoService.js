const { v4: uuidv4 } = require('uuid');

class TodoService {
    constructor() {
        // In-memory storage (in a real app, you'd use a database)
        this.todos = [
            {
                id: uuidv4(),
                title: 'Sample Todo',
                description: 'This is a sample todo item',
                completed: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];
    }

    // Get all todos
    getAllTodos() {
        return this.todos;
    }

    // Get todo by ID
    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    // Create a new todo
    createTodo(todoData) {
        const { title, description } = todoData;

        if (!title || title.trim() === '') {
            throw new Error('Title is required');
        }

        const newTodo = {
            id: uuidv4(),
            title: title.trim(),
            description: description ? description.trim() : '',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.todos.push(newTodo);
        return newTodo;
    }

    // Update a todo
    updateTodo(id, updateData) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            return null;
        }

        const currentTodo = this.todos[todoIndex];
        const updatedTodo = {
            ...currentTodo,
            ...updateData,
            id: currentTodo.id, // Ensure ID cannot be changed
            createdAt: currentTodo.createdAt, // Ensure createdAt cannot be changed
            updatedAt: new Date().toISOString()
        };

        // Validate title if provided
        if (updateData.title !== undefined && (!updateData.title || updateData.title.trim() === '')) {
            throw new Error('Title cannot be empty');
        }

        // Trim strings if provided
        if (updatedTodo.title) {
            updatedTodo.title = updatedTodo.title.trim();
        }
        if (updatedTodo.description) {
            updatedTodo.description = updatedTodo.description.trim();
        }

        this.todos[todoIndex] = updatedTodo;
        return updatedTodo;
    }

    // Delete a todo
    deleteTodo(id) {
        const todoIndex = this.todos.findIndex(todo => todo.id === id);

        if (todoIndex === -1) {
            return null;
        }

        const deletedTodo = this.todos[todoIndex];
        this.todos.splice(todoIndex, 1);
        return deletedTodo;
    }

    // Get todos by completion status
    getTodosByStatus(completed) {
        return this.todos.filter(todo => todo.completed === completed);
    }

    // Get todo count
    getTodoCount() {
        return {
            total: this.todos.length,
            completed: this.todos.filter(todo => todo.completed).length,
            pending: this.todos.filter(todo => !todo.completed).length
        };
    }
}

module.exports = new TodoService();
