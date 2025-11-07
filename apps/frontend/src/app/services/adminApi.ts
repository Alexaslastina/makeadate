const API_URL = 'http://localhost:3001/api';

export interface User {
  _id: string;
  email: string;
  name?: string;
  role: 'customer' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalUsers: number;
  totalAdmins: number;
  totalCustomers: number;
}

export async function getAllUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
}

export async function getUserStats(): Promise<UserStats> {
  const response = await fetch(`${API_URL}/users/stats/overview`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user stats');
  }

  return response.json();
}

export async function updateUserRole(
  userId: string,
  role: 'customer' | 'admin'
): Promise<User> {
  const response = await fetch(`${API_URL}/users/${userId}/role`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error('Failed to update user role');
  }

  return response.json();
}

export async function deleteUser(userId: string): Promise<void> {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
}

