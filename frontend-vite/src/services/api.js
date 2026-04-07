const BASE_URL = 'http://127.0.0.1:8000';

function getAuthToken() {
  return localStorage.getItem('authToken');
}

function getAuthHeaders() {
  const token = getAuthToken();
  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/api/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || 'Login failed');
  }

  return response.json();
}

export async function fetchDoctorDashboard() {
  const response = await fetch(`${BASE_URL}/api/appointments/`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch doctor dashboard');
  }
  return response.json();
}