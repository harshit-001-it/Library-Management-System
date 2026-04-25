import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Library, User, Shield, Briefcase, Loader2, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';
import '../styles/DesignSystem.css';

const AuthPortal = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      result = await register(name, email, password, role);
    }

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-[480px] p-10 rounded-[32px] relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 blur-[60px] rounded-full -ml-16 -mb-16" />

        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex p-4 rounded-2xl bg-surface-container-high border border-outline-variant mb-6"
          >
            <Library size={32} className="text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Ethereal Vault</h1>
          <p className="text-on-surface-variant">AI-Enhanced Archive Access</p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-surface-container-low p-1 rounded-2xl mb-8 border border-outline-variant">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${isLogin ? 'bg-surface-container-highest text-primary' : 'text-on-surface-variant hover:text-white'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${!isLogin ? 'bg-surface-container-highest text-primary' : 'text-on-surface-variant hover:text-white'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-5 overflow-hidden"
              >
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
                    required={!isLogin}
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-on-surface-variant mb-3 uppercase tracking-wider ml-1">Access Level</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'student', icon: User, label: 'Student' },
                      { id: 'staff', icon: Briefcase, label: 'Staff' },
                      { id: 'admin', icon: Shield, label: 'Admin' }
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRole(r.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                          role === r.id 
                            ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' 
                            : 'bg-surface-container-low border-outline-variant text-outline hover:border-outline'
                        }`}
                      >
                        <r.icon size={18} />
                        <span className="text-[10px] font-bold mt-1 uppercase">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="email"
              placeholder="Archive Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" />
            <input
              type="password"
              placeholder="Access Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low border border-outline-variant rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary/50 transition-all"
              required
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
            >
              {error}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 mt-4 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <span>{isLogin ? 'Initialize Session' : 'Create Credentials'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="neural-pulse" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-outline font-bold">Node: Aetheris-01</span>
          </div>
          <p className="text-on-surface-variant text-[11px]">Secure end-to-end knowledge encryption active</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPortal;
