import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  Database, 
  Users, 
  BookPlus, 
  BarChart3, 
  LogOut, 
  Search, 
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Settings,
  Bell
} from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../api/config';
import SemanticSearch from './SemanticSearch';
import { AnimatePresence } from 'framer-motion';
import '../styles/DesignSystem.css';

const StatBox = ({ label, value, trend, icon: Icon }) => (
  <div className="glass p-6 rounded-[32px] flex flex-col gap-4">
    <div className="flex justify-between items-start">
      <div className="p-3 rounded-xl bg-surface-container-highest">
        <Icon size={24} className="text-primary" />
      </div>
      <div className="flex items-center gap-1 text-xs font-bold text-green-400">
        <ArrowUpRight size={14} />
        <span>{trend}</span>
      </div>
    </div>
    <div>
      <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mb-1">{label}</p>
      <h3 className="display text-3xl font-bold text-white">{value}</h3>
    </div>
  </div>
);

const LibrarianDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ totalBooks: 0, activeUsers: 0, circulation: 0 });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    // Mock data for initial UI
    setStats({ totalBooks: '12,408', activeUsers: '1,284', circulation: '842' });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Navigation Rail */}
      <nav className="w-24 glass border-r-0 rounded-r-[40px] m-4 mr-0 flex flex-col items-center py-10 gap-8">
        <div className="neural-pulse scale-125 mb-4" />
        
        <div className="flex-1 flex flex-col gap-6">
          <button className="p-4 rounded-2xl bg-surface-container-highest text-primary shadow-lg shadow-primary/10">
            <Database size={24} />
          </button>
          <button className="p-4 rounded-2xl text-on-surface-variant hover:bg-surface-container hover:text-white transition-all">
            <Users size={24} />
          </button>
          <button className="p-4 rounded-2xl text-on-surface-variant hover:bg-surface-container hover:text-white transition-all">
            <BarChart3 size={24} />
          </button>
          <button className="p-4 rounded-2xl text-on-surface-variant hover:bg-surface-container hover:text-white transition-all">
            <Settings size={24} />
          </button>
        </div>

        <button onClick={logout} className="p-4 rounded-2xl text-on-surface-variant hover:bg-red-500/10 hover:text-red-400 transition-all">
          <LogOut size={24} />
        </button>
      </nav>

      {/* Main Command Center */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={18} className="text-secondary" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">Command Clearance Level 4</span>
            </div>
            <h1 className="display text-4xl font-bold">Archive Command Center</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-4 rounded-2xl glass hover:bg-surface-container transition-all">
              <Bell size={20} className="text-on-surface" />
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full border-2 border-surface" />
            </button>
            <div className="flex items-center gap-4 pl-6 border-l border-outline-variant">
              <div className="text-right">
                <p className="font-bold text-white">{user?.name || 'Administrator'}</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Systems Overseer</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-surface-container-highest border border-outline-variant flex items-center justify-center">
                <Users size={20} className="text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          <StatBox label="Total Archive Stock" value={stats.totalBooks} trend="12%" icon={Database} />
          <StatBox label="Active Archivists" value={stats.activeUsers} trend="4.2%" icon={Users} />
          <StatBox label="Daily Circulation" value={stats.circulation} trend="18%" icon={BarChart3} />
          <div className="glass p-6 rounded-[32px] bg-signature-gradient flex flex-col justify-between">
            <p className="text-xs text-[#1000a9] uppercase tracking-widest font-bold">System Status</p>
            <div>
              <h3 className="display text-2xl font-bold text-[#1000a9]">Neural Core Optimal</h3>
              <p className="text-[#1000a9]/70 text-[10px] font-bold uppercase tracking-wider mt-1">Uptime: 99.998%</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* Main Action Area */}
          <div className="col-span-8 space-y-8">
            <section className="glass rounded-[40px] overflow-hidden">
              <div className="p-8 border-b border-outline-variant flex justify-between items-center bg-surface-container-low/50">
                <h3 className="display text-xl font-bold">Recent Registrations</h3>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search logs..." 
                    onClick={() => setSearchOpen(true)}
                    readOnly
                    className="bg-surface-container border border-outline-variant rounded-xl pl-11 pr-4 py-2 text-sm focus:outline-none focus:border-primary/50 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <AnimatePresence>
                {searchOpen && <SemanticSearch onClose={() => setSearchOpen(false)} />}
              </AnimatePresence>
              <div className="p-0">
                <table className="w-full text-left">
                  <thead className="bg-surface-container-low/30">
                    <tr>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Archivist</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Access Node</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { name: 'Alex Rivera', node: 'Student-Alpha', status: 'Active', time: '2m ago' },
                      { name: 'Sarah Chen', node: 'Staff-Primary', status: 'Idle', time: '14m ago' },
                      { name: 'Marcus Thorne', node: 'Student-Beta', status: 'Active', time: '22m ago' },
                      { name: 'Elena Vance', node: 'Student-Alpha', status: 'Offline', time: '1h ago' }
                    ].map((entry, i) => (
                      <tr key={i} className="hover:bg-surface-container-high/20 transition-all cursor-pointer">
                        <td className="px-8 py-5 font-medium text-white">{entry.name}</td>
                        <td className="px-8 py-5 text-on-surface-variant text-sm">{entry.node}</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                            entry.status === 'Active' ? 'bg-primary/10 text-primary' : 
                            entry.status === 'Idle' ? 'bg-tertiary/10 text-tertiary' : 'bg-outline-variant/20 text-outline'
                          }`}>
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-on-surface-variant text-sm">{entry.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* Quick Controls */}
          <div className="col-span-4 space-y-6">
            <button className="w-full glass p-8 rounded-[40px] flex items-center justify-between group hover:border-primary/50 transition-all">
              <div className="text-left">
                <h4 className="display text-lg font-bold mb-1">Index New Title</h4>
                <p className="text-on-surface-variant text-xs">Append to the knowledge graph</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-highest group-hover:bg-primary group-hover:text-surface transition-all">
                <BookPlus size={24} />
              </div>
            </button>

            <button className="w-full glass p-8 rounded-[40px] flex items-center justify-between group hover:border-secondary/50 transition-all">
              <div className="text-left">
                <h4 className="display text-lg font-bold mb-1">Grant Access</h4>
                <p className="text-on-surface-variant text-xs">Authorize new archivist entry</p>
              </div>
              <div className="p-4 rounded-2xl bg-surface-container-highest group-hover:bg-secondary group-hover:text-surface transition-all">
                <Plus size={24} />
              </div>
            </button>

            <section className="glass p-8 rounded-[40px]">
              <h3 className="display text-xl font-bold mb-6">Archive Alerts</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-tertiary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">Stock Depletion</p>
                    <p className="text-xs text-on-surface-variant mt-1">"Quantum Mechanics v4" is currently unavailable.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-white">Cleansing Protocol</p>
                    <p className="text-xs text-on-surface-variant mt-1">Scheduled database optimization in 4h.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LibrarianDashboard;
