import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { motion } from 'framer-motion';
import { LogOut, User, MessageSquare, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="glass-card" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 100 }}>
      <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Shield size={20} color="white" />
        </div>
        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }}>HUMMAN AI</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MessageSquare size={18} /> Dashboard
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={18} />
              )}
              <span style={{ fontSize: '0.9rem' }}>{user?.username}</span>
            </div>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" className="btn-primary" style={{ textDecoration: 'none' }}>Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
