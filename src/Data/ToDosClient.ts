import axios from 'axios';
import { ToDo } from './Models/ToDo';

class ToDosClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getTasks(listId: number): Promise<ToDo[]> {
        try {
            const response = await axios.get(`${this.baseUrl}/tasks/${listId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching tasks for listId ${listId}:`, error);
            throw error;
        }
    }

    async createTask(title: string, description: string, listId: number) {
        try {
            const response = await axios.post(`${this.baseUrl}/tasks`, {
                title,
                description,
                listId
            });
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    }

    async updateTask(id: number, title: string, description: string) {
        try {
            const response = await axios.put(`${this.baseUrl}/tasks/${id}`, {
                title,
                description
            });
            return response.data;
        } catch (error) {
            console.error(`Error updating task with id ${id}:`, error);
            throw error;
        }
    }

    async deleteTask(id: number) {
        try {
            const response = await axios.delete(`${this.baseUrl}/tasks/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting task with id ${id}:`, error);
            throw error;
        }
    }
}

export default ToDosClient;