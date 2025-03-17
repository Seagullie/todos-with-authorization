import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToDo } from '../Data/Models/ToDo';
import ToDosClient from '../Data/ToDosClient';
import { BACKEND_SERVER_URL } from '../Constants/Constants';

const todosClient = new ToDosClient(BACKEND_SERVER_URL);

const ToDosContainer: React.FC = () => {
  const { id: containerId } = useParams<{ id: string }>();

  const [todos, setTodos] = useState<ToDo[]>([]);
  const [newTodo, setNewTodo] = useState<{
    title: string;
    description: string;
  }>({ title: '', description: '' });
  const [editTodo, setEditTodo] = useState<ToDo | null>(null);

  async function fetchData() {
    // TODO: remove "!"
    const containerToDos = await todosClient.getTasks(containerId!);
    setTodos(containerToDos);
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  if (!containerId) {
    return null;
  }

  // Create a new todo
  const addTodo = () => {
    if (!newTodo.title || !newTodo.description) return;
    const newTodoItem: ToDo = {
      _id: Date.now().toString(),
      title: newTodo.title,
      description: newTodo.description,
      completed: false,
      listId: containerId,
    };
    setTodos([...todos, newTodoItem]);
    setNewTodo({ title: '', description: '' });

    todosClient.createTask(
      newTodoItem.title,
      newTodoItem.description ?? '',
      containerId
    );
  };

  // Update a todo
  const updateTodo = (
    id: string,
    updatedTitle: string,
    updatedDescription: string
  ) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id
          ? { ...todo, title: updatedTitle, description: updatedDescription }
          : todo
      )
    );
    setEditTodo(null);

    todosClient.updateTask(id, updatedTitle, updatedDescription);
  };

  // Delete a todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo._id !== id));
    todosClient.deleteTask(id);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          className="border p-2 mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          className="border p-2 mr-2"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white p-2">
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="mb-2 my-2">
            <h2 className="font-bold">{todo.title}</h2>
            <p>{todo.description}</p>
            <div className="my-4">
              <button
                className="delete-button bg-red-500 text-white px-4 mx-4 py-2 rounded hover:bg-red-600"
                onClick={() => deleteTodo(todo._id)}
              >
                Delete
              </button>
              <button
                className="edit-button bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
                onClick={() => setEditTodo(todo)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
      {editTodo && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={editTodo.title}
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={editTodo.description}
            onChange={(e) =>
              setEditTodo({ ...editTodo, description: e.target.value })
            }
            className="border p-2 mr-2"
          />
          <button
            onClick={() =>
              updateTodo(
                editTodo._id,
                editTodo.title,
                editTodo.description ?? ''
              )
            }
            className="bg-green-500 text-white p-2"
          >
            Update Todo
          </button>
        </div>
      )}
    </div>
  );
};

export default ToDosContainer;
