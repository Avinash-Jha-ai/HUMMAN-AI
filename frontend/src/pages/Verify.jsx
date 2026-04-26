import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verify, clearError } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ShieldCheck } from 'lucide-react';

const Verify = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
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
    dispatch(verify({ email, otp }));
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '400px', padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <ShieldCheck size={50} color="var(--primary)" style={{ margin: '0 auto' }} />
        </div>
        <h2 style={{ textAlign: 'center', marginBottom: '10px', fontSize: '1.8rem' }}>Verify Email</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '30px' }}>Enter the OTP sent to your email</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Confirm your email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            className="input-field"
            style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem' }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            required
          />
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Verify;
