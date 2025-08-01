import axios from 'axios';
// import { MediaUrlFactory } from '../adapters/MediaUrlFactory';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          // No refresh token available, redirect to login
          window.location.href = '/account/login';
          return Promise.reject(error);
        }

        // Try to refresh the token
        const response = await axios.post('http://localhost:3000/api/token/refresh/', {
          refresh: refreshToken
        });

        if (response.data.access) {
          localStorage.setItem('access_token', response.data.access);
          
          // Retry the original request with new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, clear storage and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/account/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// export const getImageUrl = (path: string | null, mediaType: string = 'image') => {
// //   const adapter = MediaUrlFactory.createAdapter(mediaType);
//   return adapter.getUrl(path);
// };

export default axiosInstance;
