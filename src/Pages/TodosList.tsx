import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Todo {
  id: number;
  title: string;
  description: string;
}

const TodosList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    // const response = await axios.get('https://your-server.com/api/todos');
    // setTodos(response.data);

    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`https://your-server.com/api/todos/${editingId}`, { title, description });
    } else {
      await axios.post('https://your-server.com/api/todos', { title, description });
    }
    setTitle('');
    setDescription('');
    setEditingId(null);
    fetchTodos();
  };

  const handleEdit = (todo: Todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditingId(todo.id);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`https://your-server.com/api/todos/${id}`);
    fetchTodos();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ToDo List</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          {editingId ? 'Update' : 'Add'} ToDo
        </button>
      </form>
      <ul className="space-y-4">
        {todos.map((todo) => (
          <li key={todo.id} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p className="text-gray-700">{todo.description}</p>
            <div className="mt-2 space-x-2">
              <Link to={`/todos/${todo.id}`} className="text-indigo-600 hover:underline">View</Link>
              <button
                onClick={() => handleEdit(todo)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodosList;