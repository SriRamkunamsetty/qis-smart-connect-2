import { apiService } from './apiService';

export interface Notice {
    id?: string;
    title: string;
    description: string;
    category: 'Academic' | 'Placement' | 'Sports' | 'General' | 'Exam' | 'Event';
    date: string;
    createdAt?: any;
    createdBy?: string;
    attachmentUrl?: string;
    pinned?: boolean;
    priority?: 'Low' | 'Medium' | 'High';
}

const API_PATH = '/circulars';

export const noticeService = {
    // Get all notices
    getNotices: async (category?: string, limitCount?: number) => {
        let notices: Notice[] = [];
        try {
            const result = await apiService.get<Notice[]>(API_PATH);
            notices = Array.isArray(result) ? result : [];
        } catch {
            notices = [];
        }

        if (category && category !== 'All') {
            notices = notices.filter(n => n.category === category);
        }

        if (limitCount) {
            notices = notices.slice(0, limitCount);
        }

        return notices;
    },

    // Get notice by ID
    getNoticeById: async (id: string) => {
        return await apiService.get<Notice>(`${API_PATH}/${id}`);
    },

    // Create notice
    createNotice: async (notice: Omit<Notice, 'id'>) => {
        const result = await apiService.post<{ id: string }>(API_PATH, notice);
        return result.id;
    },

    // Update notice
    updateNotice: async (id: string, updates: Partial<Notice>) => {
        await apiService.patch(`${API_PATH}/${id}`, updates);
    },

    // Delete notice
    deleteNotice: async (id: string) => {
        await apiService.delete(`${API_PATH}/${id}`);
    }
};
