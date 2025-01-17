// utils/apiClient.ts

import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig,
  } from 'axios';
  
  // Create an Axios instance
  const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
    timeout: 10000, // Optional timeout setting
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Request interceptor to add auth token (if needed)
  apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // If you have a token stored in localStorage, you can add it to the headers
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
      if (token && config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      return config;
    },
    (error: AxiosError) => {
      // Handle request errors
      return Promise.reject(error);
    }
  );
  
  // Response interceptor for error handling
  apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
      // Any status code within the range of 2xx causes this function to trigger
      return response;
    },
    (error: AxiosError) => {
      // Any status codes outside the range of 2xx cause this function to trigger
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('API Error:', error.response.status, error.response.data);
  
        if (error.response.status === 401) {
          // Handle unauthorized access, e.g., redirect to login page
          // You can implement a redirect or notification here
        }
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
      } else {
        // Something happened while setting up the request
        console.error('Error setting up request:', error.message);
      }
      return Promise.reject(error);
    }
  );
  
  export default apiClient;
  