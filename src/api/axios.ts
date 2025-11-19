import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://todo-backend-vgjt.onrender.com', // .env was hidden so I used it to show the backend url directly
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;