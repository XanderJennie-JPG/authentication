// Utility functions for managing authentication data in storage

// Constants for storage keys
export const STORAGE_KEYS = {
  USERNAME: 'auth_username',
  PASSWORD: 'auth_password',
  PIN: 'auth_pin',
  EMAIL: 'auth_email',
  SECURITY_QUESTION: 'auth_security_question',
  SECURITY_ANSWER: 'auth_security_answer',
};

// Check if we're in a browser environment (to handle React Native's lack of sessionStorage)
const isBrowser = typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';

// We'll use sessionStorage for this demo so data is cleared when the browser is closed
// Could use localStorage for persistence if desired
const storage = isBrowser ? window.sessionStorage : {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

// Helper functions
export const saveAuthData = (key: string, value: string): void => {
  storage.setItem(key, value);
};

export const getAuthData = (key: string): string | null => {
  return storage.getItem(key);
};

export const clearAuthData = (): void => {
  Object.values(STORAGE_KEYS).forEach(key => {
    storage.removeItem(key);
  });
};

// Specific functions for each type of auth data
export const saveUserCredentials = (username: string, password: string): void => {
  saveAuthData(STORAGE_KEYS.USERNAME, username);
  saveAuthData(STORAGE_KEYS.PASSWORD, password);
};

export const savePin = (pin: string): void => {
  saveAuthData(STORAGE_KEYS.PIN, pin);
};

export const saveEmail = (email: string): void => {
  saveAuthData(STORAGE_KEYS.EMAIL, email);
};

export const saveSecurityQuestion = (question: string, answer: string): void => {
  saveAuthData(STORAGE_KEYS.SECURITY_QUESTION, question);
  saveAuthData(STORAGE_KEYS.SECURITY_ANSWER, answer);
};

// Verification functions
export const verifyUsername = (username: string): boolean => {
  return username === getAuthData(STORAGE_KEYS.USERNAME);
};

export const verifyPassword = (password: string): boolean => {
  return password === getAuthData(STORAGE_KEYS.PASSWORD);
};

export const verifyPin = (pin: string): boolean => {
  return pin === getAuthData(STORAGE_KEYS.PIN);
};

export const verifyEmail = (email: string): boolean => {
  return email === getAuthData(STORAGE_KEYS.EMAIL);
};

export const verifySecurityAnswer = (answer: string): boolean => {
  const storedAnswer = getAuthData(STORAGE_KEYS.SECURITY_ANSWER);
  return storedAnswer !== null && 
         answer.toLowerCase().trim() === storedAnswer.toLowerCase().trim();
};

export const getSecurityQuestion = (): string | null => {
  return getAuthData(STORAGE_KEYS.SECURITY_QUESTION);
}; 