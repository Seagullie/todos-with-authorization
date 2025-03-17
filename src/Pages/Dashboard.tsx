import React, { useState } from 'react';
import { Todo } from './Types';

const Dashboard: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    // Create a new todo
    const addTodo = () => {
        if (newTodo.trim() === '') return;
        const newTodoItem: Todo = {
            id: Date.now(),
            text: newTodo,
            completed: false,
        };
        setTodos([...todos, newTodoItem]);
        setNewTodo('');
    };

    // Read todos (already handled by rendering the state)

    // Update a todo
    const updateTodo = (id: number, updatedText: string) => {
        setTodos(todos.map(todo => (todo.id === id ? { ...todo, text: updatedText } : todo)));
        setEditTodo(null);
    };

    // Delete a todo
    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new todo"
                    className="border rounded p-2 mr-2"
                />
                <button onClick={addTodo} className="bg-blue-500 text-white p-2 rounded">
                    Add Todo
                </button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className="flex items-center mb-2">
                        {editTodo?.id === todo.id ? (
                            <input
                                type="text"
                                value={editTodo.text}
                                onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
                                onBlur={() => updateTodo(todo.id, editTodo.text)}
                                className="border rounded p-2 mr-2"
                            />
                        ) : (
                            <>
                                <span className={`flex-1 ${todo.completed ? 'line-through' : ''}`}>
                                    {todo.text}
                                </span>
                                <button onClick={() => setEditTodo(todo)} className="bg-yellow-500 text-white p-2 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={() => deleteTodo(todo.id)} className="bg-red-500 text-white p-2 rounded">
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;