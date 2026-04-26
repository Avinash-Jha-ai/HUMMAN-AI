import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { LogIn, Mail, Lock } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '400px', padding: '40px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Welcome Back</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              style={{ paddingLeft: '45px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              style={{ paddingLeft: '45px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} disabled={loading}>
            {loading ? 'Authenticating...' : <><LogIn size={20} /> Login</>}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
