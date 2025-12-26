const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
};