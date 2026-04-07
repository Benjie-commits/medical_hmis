import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      const token = data.token || data.access || data.auth_token;
      if (!token) {
        throw new Error('No token returned from backend');
      }

      localStorage.setItem('authToken', token);
      navigate('/doctor');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container" style={{ maxWidth: 480, padding: 32 }}>
      <div className="dashboard-header" style={{ borderRadius: 24, padding: 24 }}>
        <div className="header-left">
          <h1>Login</h1>
          <p>Use your HMIS credentials to continue.</p>
        </div>
      </div>

      <div className="dashboard-content" style={{ padding: '24px 0' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 18 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 16,
                border: '1px solid #f2c4ce',
              }}
            />
          </div>

          <div style={{ marginBottom: 18 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: 16,
                border: '1px solid #f2c4ce',
              }}
            />
          </div>

          {error && (
            <div className="message error" style={{ marginBottom: 16 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            className="action-btn"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;