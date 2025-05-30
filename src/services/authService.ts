import { User } from '../types';
import { mockUsers } from '../data/mockData';

// In a real application, these functions would make API calls
// For this demo, we're using localStorage to simulate persistence

export const getUserFromStorage = (): User | null => {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Find user in mock data
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (!user) {
    throw new Error('User not found');
  }
  
  // In a real app, we would check the password hash
  // Here we're just simulating authentication
  
  // Save to localStorage
  localStorage.setItem('user', JSON.stringify(user));
  
  return user;
};

export const registerUser = async (userData: Partial<User> & { password: string }): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists
  const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email?.toLowerCase());
  
  if (existingUser) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser: User = {
    id: mockUsers.length + 1,
    email: userData.email || '',
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    avatar: userData.avatar,
    country: userData.country,
    city: userData.city,
    age: userData.age,
  };
  
  // In a real app, we would hash the password and save it to the database
  
  // Save to localStorage
  localStorage.setItem('user', JSON.stringify(newUser));
  
  return newUser;
};

export const updateUserProfile = async (userId: number, userData: Partial<User>): Promise<User> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const currentUser = getUserFromStorage();
  
  if (!currentUser || currentUser.id !== userId) {
    throw new Error('Unauthorized');
  }
  
  // Update user data
  const updatedUser: User = {
    ...currentUser,
    ...userData,
  };
  
  // Save to localStorage
  localStorage.setItem('user', JSON.stringify(updatedUser));
  
  return updatedUser;
};

export const changePassword = async (userId: number, currentPassword: string, newPassword: string): Promise<boolean> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const currentUser = getUserFromStorage();
  
  if (!currentUser || currentUser.id !== userId) {
    throw new Error('Unauthorized');
  }
  
  // In a real app, we would verify the current password and update with a new hashed password
  
  return true;
};