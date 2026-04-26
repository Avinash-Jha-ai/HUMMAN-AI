import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, addMessage, fetchHistory, fetchChatMessages, startNewChat, deleteChat, setSidebarOpen } from '../store/chatSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, History, Plus, MessageSquare, Clock, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [input, setInput] = useState('');
  const { messages, sessions, currentChatId, loading, sidebarOpen } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const scrollRef = useRef();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    dispatch(addMessage({ role: 'user', content: input }));
    dispatch(sendMessage({ message: input, chatId: currentChatId }));
    setInput('');
  };

  const handleSelectSession = (id) => {
    dispatch(fetchChatMessages(id));
    if (window.innerWidth <= 768) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleNewChat = () => {
    dispatch(startNewChat());
    if (window.innerWidth <= 768) {
      dispatch(setSidebarOpen(false));
    }
  };

  const handleDeleteSession = (e, id) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      dispatch(deleteChat(id));
      toast.success('Chat deleted');
    }
  };

  return (
    <div className="dashboard-container" style={{ display: 'flex', height: 'calc(100vh - 100px)', gap: '20px', padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => dispatch(setSidebarOpen(false))}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
            display: window.innerWidth <= 768 ? 'block' : 'none'
          }}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`glass-card sidebar-mobile ${sidebarOpen ? 'open' : ''}`} style={{ width: '280px', display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
        <button 
          onClick={handleNewChat}
          className="btn-primary" 
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
          <Plus size={18} /> New Chat
        </button>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <h3 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <History size={14} /> CHAT HISTORY
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {sessions.length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No history yet</p>}
            {sessions.map((session) => (
              <div 
                key={session._id} 
                onClick={() => handleSelectSession(session._id)}
                style={{ 
                  padding: '10px', 
                  borderRadius: '8px', 
                  background: currentChatId === session._id ? 'rgba(255,77,77,0.1)' : 'rgba(255,255,255,0.03)', 
                  border: currentChatId === session._id ? '1px solid var(--primary)' : '1px solid var(--glass-border)', 
                  cursor: 'pointer', 
                  transition: 'all 0.2s ease',
                  position: 'relative',
                  group: 'true'
                }} 
                className="history-item"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                    <MessageSquare size={12} color={currentChatId === session._id ? "var(--primary)" : "var(--text-muted)"} />
                    <span style={{ fontSize: '0.8rem', fontWeight: currentChatId === session._id ? '600' : '400', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {session.title || "Untitled Chat"}
                    </span>
                  </div>
                  <Trash2 
                    size={14} 
                    className="delete-icon"
                    onClick={(e) => handleDeleteSession(e, session._id)}
                    style={{ color: 'var(--text-muted)', transition: 'color 0.2s ease' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  <Clock size={10} /> {new Date(session.updatedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '15px', background: 'rgba(255,77,77,0.05)', borderRadius: '12px', border: '1px solid var(--primary-glow)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: '600' }}>Upgrade to Pro</p>
          <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Get unlimited messages & more</p>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="main-chat-area" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--secondary), #0047b3)', width: '45px', height: '45px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 15px var(--secondary-glow)' }}>
            <Bot size={28} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>AI Assistant</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {currentChatId ? 'Viewing specific session' : 'Starting a new premium conversation'}
            </p>
          </div>
        </header>

        <div 
          ref={scrollRef}
          className="glass-card chat-messages-container" 
          style={{ flex: 1, padding: '20px', overflowY: 'auto', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: '12px 18px',
                  borderRadius: '15px',
                  background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                  color: 'white',
                  position: 'relative',
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'flex-start'
                }}
              >
                {msg.role === 'assistant' && <Bot size={16} style={{ marginTop: '4px', flexShrink: 0 }} />}
                <div style={{ width: '100%', overflowWrap: 'anywhere' }}>
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === 'user' && <User size={16} style={{ marginTop: '4px', flexShrink: 0 }} />}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ alignSelf: 'flex-start', padding: '12px 18px', color: 'var(--text-muted)' }}
              >
                AI is thinking...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            className="input-field"
            style={{ marginBottom: 0, flex: 1 }}
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
};

export default Dashboard;
