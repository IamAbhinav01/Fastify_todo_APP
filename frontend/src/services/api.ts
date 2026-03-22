import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
});

export interface Todo {
  id: number;
  text: string;
}

export const todoService = {
  getAll: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data.response;
  },
  getOne: async (id: number): Promise<Todo> => {
    const response = await api.get(`/todos/${id}`);
    return response.data.response;
  },
  create: async (text: string): Promise<Todo[]> => {
    const response = await api.post('/todos', { todotext: text });
    return response.data.response;
  },
  delete: async (id: number): Promise<Todo[]> => {
    const response = await api.delete(`/todos/${id}`);
    return response.data.response;
  },
  clearAll: async (): Promise<Todo[]> => {
    const response = await api.delete('/todos');
    return response.data.response;
  },
};

export default api;
