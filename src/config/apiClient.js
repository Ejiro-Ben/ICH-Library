/**
 * API Client Helper
 * This file handles dynamic API URLs based on environment
 */

const getApiBaseUrl = () => {
  // In development: use localhost:5000
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }

  // In production (Vercel): use /api (will route to serverless functions)
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

console.log('API Base URL:', API_BASE_URL); // For debugging

/**
 * GET request helper
 */
export const apiGet = async (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('GET request to:', url);
  
  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `API request failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * POST request for FormData (file uploads)
 */
export const apiPostFormData = async (endpoint, formData) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('POST FormData to:', url);

  const response = await fetch(url, {
    method: 'POST',
    body: formData, // Don't set Content-Type for FormData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Upload failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * DELETE request helper
 */
export const apiDelete = async (endpoint) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('DELETE request to:', url);

  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Delete failed: ${response.statusText}`);
  }

  return response.json();
};

export default {
  apiGet,
  apiPostFormData,
  apiDelete,
  API_BASE_URL,
};

