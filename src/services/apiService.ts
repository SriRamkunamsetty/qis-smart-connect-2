import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    get: async <T>(url: string) => {
        const response = await api.get<T>(url);
        return response.data;
    },

    post: async <T>(url: string, data: any) => {
        const response = await api.post<T>(url, data);
        return response.data;
    },

    patch: async <T>(url: string, data: any) => {
        const response = await api.patch<T>(url, data);
        return response.data;
    },

    delete: async <T>(url: string) => {
        const response = await api.delete<T>(url);
        return response.data;
    }
};

export default apiService;
