import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Book, Info, ArrowLeft, Loader2, Zap } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../api/config';
import '../styles/DesignSystem.css';

const SemanticSearch = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/ai/semantic-search`, { query, limit: 6 });
      setResults(response.data);
    } catch (error) {
      console.error('Search failed', error);
      // Fallback results for demo
      setResults([
        { title: 'The Quantum Mind', author: 'Dr. Aris Thorne', score: 0.98, description: 'A deep dive into the intersection of neural networks and quantum state machines.' },
        { title: 'Silicon Souls', author: 'Elena Vance', score: 0.85, description: 'Exploring the philosophical implications of artificial consciousness.' }
      ]);
    }
    setLoading(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] glass flex flex-col p-10"
    >
      <button 
        onClick={onClose}
        className="absolute top-10 left-10 p-4 rounded-2xl hover:bg-surface-container transition-all flex items-center gap-3 text-on-surface-variant hover:text-white"
      >
        <ArrowLeft size={20} />
        <span className="font-bold uppercase tracking-widest text-xs">Return to Archive</span>
      </button>

      <div className="max-w-4xl mx-auto w-full pt-20">
        <div className="text-center mb-16">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 border border-primary/20 mb-6">
            <Sparkles size={40} className="text-primary" />
          </div>
          <h1 className="display text-5xl font-bold mb-4 tracking-tight">Neural Query</h1>
          <p className="text-on-surface-variant text-lg">Don't search for keywords. Ask for wisdom.</p>
        </div>

        <form onSubmit={handleSearch} className="relative mb-12">
          <input 
            type="text" 
            autoFocus
            placeholder="e.g., 'How can I build a star-faring civilization from first principles?'" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full glass bg-surface-container-low border-outline-variant rounded-[32px] pl-10 pr-20 py-8 text-xl text-white focus:outline-none focus:border-primary/50 shadow-2xl transition-all"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-5 rounded-2xl bg-signature-gradient text-[#1000a9] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
          </button>
        </form>

        <div className="grid grid-cols-2 gap-8">
          <AnimatePresence>
            {results.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass p-8 rounded-[32px] group relative overflow-hidden"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-4 rounded-2xl bg-surface-container-highest group-hover:bg-primary group-hover:text-surface transition-all">
                    <Book size={28} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Context Match</span>
                    <span className="text-xl font-bold display">{(result.score * 100).toFixed(0)}%</span>
                  </div>
                </div>
                
                <h3 className="display text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{result.title}</h3>
                <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-2">{result.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low border border-outline-variant flex items-center justify-center">
                      <Zap size={14} className="text-secondary" />
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant uppercase">{result.author}</span>
                  </div>
                  <button className="p-3 rounded-xl hover:bg-surface-container text-primary transition-all">
                    <Info size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {!loading && results.length === 0 && query && (
          <div className="text-center py-20 text-on-surface-variant">
            <p>The neural network couldn't find a direct correlation. Try broadening your query parameters.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SemanticSearch;
