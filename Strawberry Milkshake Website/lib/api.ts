import axios, { AxiosInstance, AxiosError } from 'axios';

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor - Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    const originalRequest = error.config as any;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken && error.response?.data?.code === 'TOKEN_EXPIRED') {
        try {
          // Try to refresh the token
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // Save new tokens
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh failed, redirect to login
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('user');

          // Redirect to login page
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          return Promise.reject(refreshError);
        }
      }

      // No refresh token, redirect to login
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// API methods
export const apiClient = {
  // Auth endpoints
  auth: {
    register: async (data: {
      username: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await api.post('/auth/register', data);
      return response.data;
    },

    login: async (data: { email: string; password: string }) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },

    logout: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },

    getMe: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },

    forgotPassword: async (email: string) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },

    resetPassword: async (data: {
      token: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await api.post('/auth/reset-password', data);
      return response.data;
    },
  },

  // User endpoints
  user: {
    getProfile: async () => {
      const response = await api.get('/users/profile');
      return response.data;
    },

    updateProfile: async (data: { username?: string; email?: string }) => {
      const response = await api.put('/users/profile', data);
      return response.data;
    },

    changePassword: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      const response = await api.put('/users/change-password', data);
      return response.data;
    },

    deleteAccount: async () => {
      const response = await api.delete('/users/profile');
      return response.data;
    },
  },

  // Admin endpoints
  admin: {
    getAllUsers: async (page = 1, limit = 10) => {
      const response = await api.get(`/users?page=${page}&limit=${limit}`);
      return response.data;
    },

    updateUserRole: async (userId: string, role: string) => {
      const response = await api.put(`/users/${userId}/role`, { role });
      return response.data;
    },

    deleteUser: async (userId: string) => {
      const response = await api.delete(`/users/${userId}`);
      return response.data;
    },
  },
};

export default api;
