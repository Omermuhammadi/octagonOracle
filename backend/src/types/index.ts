import { Request } from 'express';

// Base types for the application
export interface BaseResponse {
  message: string;
  success: boolean;
}

// User types
export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  role?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Error types
export interface ErrorResponse extends BaseResponse {
  error: string | Record<string, any>;
} 