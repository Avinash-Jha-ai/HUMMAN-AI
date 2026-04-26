import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, clearError } from '../store/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { UserPlus, Mail, Lock, User, Camera } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: null,
  });
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, verificationStep } = useSelector((state) => state.auth);

  useEffect(() => {
    if (verificationStep) navigate('/verify');
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [verificationStep, error, navigate, dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setFormData({ ...formData, avatar: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.avatar) data.append('avatar', formData.avatar);
    
    dispatch(register(data));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '450px', padding: '40px' }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '2rem' }}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--glass-border)', overflow: 'hidden' }}>
              {preview ? (
                <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <Camera size={30} color="var(--text-muted)" />
              )}
              <input 
                type="file" 
                name="avatar" 
                onChange={handleChange} 
                style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
              />
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <User style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input
              name="username"
              type="text"
              placeholder="Username"
              className="input-field"
              style={{ paddingLeft: '45px' }}
              value={formData.username}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input-field"
              style={{ paddingLeft: '45px' }}
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted)' }} size={20} />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input-field"
              style={{ paddingLeft: '45px' }}
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }} disabled={loading}>
            {loading ? 'Creating account...' : <><UserPlus size={20} /> Register</>}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '20px', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
