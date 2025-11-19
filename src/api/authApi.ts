import axiosInstance from './axios';
import { AuthResponse, LoginCredentials, SignupCredentials } from '../types';
import { z } from 'zod';

const authResponseSchema = z.object({
  _id: z.string(),
  name: z.string(),
  email: z.string(),
  token: z.string(),
});

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/login', credentials);
    return authResponseSchema.parse(response.data);
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    const response = await axiosInstance.post('/auth/register', credentials);
    return authResponseSchema.parse(response.data);
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await axiosInstance.post(`/auth/reset-password/${token}`, { password });
    return response.data;
  },
};