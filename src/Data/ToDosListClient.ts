import axios from 'axios';
import { TodoList } from './Models/ToDosList';

class TodoListsClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getTodoLists(): Promise<TodoList[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/todolists`);
      return response.data;
    } catch (error) {
      console.error('Error fetching todo lists:', error);
      throw error;
    }
  }

  async createTodoList(name: string, description: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/todolists`, {
        name,
        description,
      });
      return response.data;
    } catch (error) {
      console.error('Error creating todo list:', error);
      throw error;
    }
  }

  async updateTodoList(id: string, name: string, description: string) {
    try {
      const response = await axios.put(`${this.baseUrl}/todolists/${id}`, {
        name,
        description,
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating todo list with id ${id}:`, error);
      throw error;
    }
  }

  async deleteTodoList(id: string) {
    try {
      console.log('deleting list with id of ', id);
      const response = await axios.delete(`${this.baseUrl}/todolists/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting todo list with id ${id}:`, error);
      throw error;
    }
  }
}

export default TodoListsClient;
