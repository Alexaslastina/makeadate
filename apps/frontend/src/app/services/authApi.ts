const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export interface RegisterDto {
  email: string;
  password: string;
  name?: string;
  role?: 'customer' | 'admin';
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  name?: string;
  role: 'customer' | 'admin';
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
}

export async function register(userData: RegisterDto): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(error.message || 'Registration failed');
  }

  const data = await response.json();
  
  // Store token and user info in localStorage
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }
  if (data.user) {
    localStorage.setItem('current_user', JSON.stringify(data.user));
  }
  
  return data;
}

export async function login(credentials: LoginDto): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(error.message || 'Invalid email or password');
  }

  const data = await response.json();
  
  // Store token and user info in localStorage
  if (data.access_token) {
    localStorage.setItem('access_token', data.access_token);
  }
  if (data.user) {
    localStorage.setItem('current_user', JSON.stringify(data.user));
  }
  
  return data;
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('current_user');
  if (!userStr) {
    return null;
  }
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('current_user');
}

export async function requestPasswordReset(email: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to request password reset' }));
    throw new Error(error.message || 'Failed to request password reset');
  }

  return response.json();
}

export async function resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to reset password' }));
    throw new Error(error.message || 'Failed to reset password');
  }

  return response.json();
}

export async function getAllUsers(): Promise<User[]> {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch users' }));
    throw new Error(error.message || 'Failed to fetch users');
  }

  return response.json();
}

export async function updateUserRole(userId: string, role: 'customer' | 'admin'): Promise<User> {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_BASE_URL}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to update user role' }));
    throw new Error(error.message || 'Failed to update user role');
  }

  return response.json();
}

