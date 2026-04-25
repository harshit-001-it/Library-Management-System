import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Sparkles, 
  TrendingUp, 
  LogOut, 
  ChevronRight,
  Archive,
  Zap,
  User as UserIcon
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../api/config';
import SemanticSearch from './SemanticSearch';
import '../styles/DesignSystem.css';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
      active 
        ? 'bg-surface-container-highest text-primary' 
        : 'text-on-surface-variant hover:text-white hover:bg-surface-container'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
  </button>
);

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    // Mock data for initial UI - would be replaced by API calls
    setLoans([
      { id: 1, title: 'The Celestial Algorithms', due: '2 days remaining', progress: 65 },
      { id: 2, title: 'Synthetic Empathy', due: 'Overdue by 1 day', progress: 12, alert: true }
    ]);

    setRecommendations([
      { title: 'Architecture of Thought', tag: 'Deep Dive', match: '98% Match' },
      { title: 'Hardware Evolution', tag: 'Legacy Systems', match: '85% Match' }
    ]);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-80 glass border-r-0 rounded-r-[40px] m-4 mr-0 flex flex-col p-8">
        <div className="flex items-center gap-3 mb-12 px-4">
          <div className="neural-pulse" />
          <h2 className="display text-xl font-bold tracking-tighter">AETHERIS</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={Archive} label="Dashboard" active />
          <SidebarItem icon={BookOpen} label="My Bookshelf" />
          <SidebarItem icon={Zap} label="Neural Pulse" />
          <SidebarItem icon={TrendingUp} label="Activity Log" />
        </nav>

        <div className="pt-8 border-t border-outline-variant">
          <div className="flex items-center gap-4 px-4 mb-8">
            <div className="w-10 h-10 rounded-full bg-signature-gradient p-0.5">
              <div className="w-full h-full rounded-full bg-surface flex items-center justify-center">
                <UserIcon size={18} className="text-primary" />
              </div>
            </div>
            <div>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold">Archivist</p>
              <p className="font-semibold text-white">{user?.name || 'Loading...'}</p>
            </div>
          </div>
          <SidebarItem icon={LogOut} label="Terminate Session" onClick={logout} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="display text-4xl font-bold mb-2">Knowledge Discovery</h1>
            <p className="text-on-surface-variant">Welcome back, Archivist. Your read velocity is up 15%.</p>
          </div>
          
          <div className="relative w-96">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input 
              type="text" 
              placeholder="Search concepts or titles..." 
              value={searchQuery}
              onClick={() => setSearchOpen(true)}
              readOnly
              className="w-full glass bg-surface-container-low border-outline-variant rounded-2xl pl-14 pr-6 py-4 focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
            />
          </div>
        </header>

        <AnimatePresence>
          {searchOpen && <SemanticSearch onClose={() => setSearchOpen(false)} />}
        </AnimatePresence>

        <div className="grid grid-cols-12 gap-8">
          {/* Active Loans */}
          <div className="col-span-8 space-y-8">
            <section>
              <div className="flex justify-between items-center mb-6">
                <h3 className="display text-xl font-bold">Active Transmissions</h3>
                <button className="text-primary text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  View Full Shelf <ChevronRight size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {loans.map(loan => (
                  <motion.div 
                    key={loan.id}
                    whileHover={{ y: -5 }}
                    className="glass p-6 rounded-3xl group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 rounded-xl bg-surface-container-highest">
                        <BookOpen size={24} className="text-primary" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${loan.alert ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                        {loan.due}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{loan.title}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-on-surface-variant">
                        <span>Read Progress</span>
                        <span>{loan.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${loan.progress}%` }}
                          className="h-full bg-signature-gradient"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="glass p-10 rounded-[40px] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Sparkles size={40} className="text-primary/20" />
              </div>
              <h3 className="display text-2xl font-bold mb-4">Neural Insights</h3>
              <p className="text-on-surface-variant max-w-md mb-8">
                Based on your recent deep-dive into Synthetic Empathy, we've identified 4 new research papers that bridge your current knowledge gap.
              </p>
              <button className="btn-primary">Execute Protocol</button>
            </section>
          </div>

          {/* Sidebar Info */}
          <div className="col-span-4 space-y-8">
            <section className="glass p-8 rounded-[40px]">
              <h3 className="display text-xl font-bold mb-6">Archive Pulse</h3>
              <div className="space-y-6">
                {[
                  { label: 'System Load', value: 'Minimal', status: 'optimal' },
                  { label: 'New Arrivals', value: '42 Titles', status: 'optimal' },
                  { label: 'Overdue Fines', value: '$2.40', status: 'warning' }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-on-surface-variant text-sm">{item.label}</span>
                    <span className={`font-bold ${item.status === 'warning' ? 'text-tertiary' : 'text-primary'}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="display text-xl font-bold mb-6">Recommendations</h3>
              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <div key={i} className="glass p-4 rounded-2xl flex items-center gap-4 hover:bg-surface-container transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
                      <Zap size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{rec.title}</h4>
                      <div className="flex gap-3 mt-1">
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase">{rec.tag}</span>
                        <span className="text-[10px] text-secondary font-bold uppercase">{rec.match}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
