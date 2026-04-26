import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { motion } from 'framer-motion';
import { LogOut, User, MessageSquare, Shield, Menu } from 'lucide-react';
import { toggleSidebar } from '../store/chatSlice';

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="glass-card navbar-container" style={{ margin: '20px', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '20px', zIndex: 100 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isAuthenticated && (
          <button 
            onClick={() => dispatch(toggleSidebar())}
            className="mobile-menu-btn"
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              cursor: 'pointer',
              display: 'none', // Hidden by default, shown in CSS media query
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Menu size={24} />
          </button>
        )}
        <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ background: 'var(--primary)', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={20} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }} className="nav-logo-text">HUMMAN AI</span>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="nav-link" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MessageSquare size={18} /> <span className="nav-text">Dashboard</span>
            </Link>
            <div className="user-profile-nav" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px 15px', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <User size={18} />
              )}
              <span className="nav-text" style={{ fontSize: '0.9rem' }}>{user?.fullname || user?.username}</span>
            </div>
            <button onClick={handleLogout} className="logout-btn" style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '600' }}>
              <LogOut size={18} /> <span className="nav-text">Logout</span>
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
