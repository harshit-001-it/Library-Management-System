import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Clock, 
  MessageSquare, 
  Search, 
  LogOut, 
  TrendingUp,
  Sparkles,
  Send,
  X
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../api/config';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card p-6 flex items-center gap-4"
  >
    <div className={`p-4 rounded-2xl ${color} bg-opacity-20`}>
      <Icon className={color.replace('bg-', 'text-')} size={24} />
    </div>
    <div>
      <p className="text-slate-400 text-sm">{label}</p>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ books: 0, issued: 0, users: 0 });
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: `Hello ${user?.name}, I am your Library AI. How can I help you today?` }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Fetch stats logic here
    setStats({ books: 1240, issued: 156, users: 890 });
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    
    try {
      const response = await axios.post(`${API_URL}/ai/chat`, { message: input });
      setMessages(prev => [...prev, { role: 'bot', content: response.data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting to the neural network." }]);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      {/* Sidebar / Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-slate-400 mt-2">Welcome back, <span className="text-primary">{user?.name}</span></p>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/50 hover:bg-red-500/20 hover:text-red-400 transition-all border border-slate-700"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard icon={BookOpen} label="Total Books" value={stats.books} color="bg-blue-500" />
          <StatCard icon={Clock} label="Books Issued" value={stats.issued} color="bg-purple-500" />
          <StatCard icon={Users} label="Active Users" value={stats.users} color="bg-indigo-500" />
        </div>

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 h-[400px] flex flex-col justify-center items-center text-center"
          >
            <TrendingUp size={48} className="text-primary mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Library Insights</h2>
            <p className="text-slate-400 max-w-sm">
              Your reading trends are up 12% this month. Discover new titles curated by our AI.
            </p>
            <button className="mt-8 px-8 py-3 rounded-xl bg-primary text-white font-medium hover:scale-105 transition-all">
              Explore Library
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8 h-[400px] flex flex-col justify-center items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="text-secondary opacity-50" />
            </div>
            <Search size={48} className="text-secondary mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Semantic Search</h2>
            <p className="text-slate-400 max-w-sm">
              Don't just search for keywords. Ask for concepts, like "Intro to Quantum Physics for kids".
            </p>
            <div className="mt-8 w-full max-w-md relative">
              <input 
                type="text" 
                placeholder="Search the archive..." 
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-6 py-4 focus:ring-2 focus:ring-secondary/50 outline-none"
              />
              <Search className="absolute right-4 top-4 text-slate-500" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Chatbot Toggle */}
      <button 
        onClick={() => setChatOpen(true)}
        className="fixed bottom-8 right-8 p-4 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white shadow-xl shadow-primary/40 hover:scale-110 transition-all z-50"
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Interface */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 100 }}
            className="fixed bottom-8 right-8 w-96 h-[500px] glass-card shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-900/50">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-secondary" />
                <span className="font-semibold">Library AI</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-slate-800 text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-slate-900/50 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..." 
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary"
              />
              <button 
                onClick={handleSend}
                className="p-2 rounded-xl bg-primary text-white hover:bg-primary-dark"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;
