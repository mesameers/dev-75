import React, { useState, useEffect } from 'react';
import {
  Server,
  Users,
  Building,
  Activity,
  TrendingUp,
  CheckCircle,
  Database,
  Shield,
  Layers,
  Key,
  Lock,
  Cpu,
  GraduationCap,
  FileText,
  DollarSign,
  UserCheck,
  PlayCircle
} from 'lucide-react';
import { EIMSDemoModal } from './EIMSDemoModal';

export const ProjectEIMS = () => {
  const [activeTab, setActiveTab] = useState('superadmin');
  const [liveSessions, setLiveSessions] = useState(2341);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [auditLog, setAuditLog] = useState([
    { id: 1, time: 'Just now', event: 'Division zone synchronized: Rawalpindi North', status: 'OK' },
    { id: 2, time: '12s ago', event: 'Superadmin RBAC token renewed: admin@schoolms.com', status: 'AUTH' },
    { id: 3, time: '34s ago', event: 'Campus 01 attendance register posted: 96.4% present', status: 'SYNC' },
    { id: 4, time: '1m ago', event: 'Challan fee batch #842 reconciled (94.0% recovery)', status: 'BATCH' },
  ]);

  // Gentle live telemetry simulation (frame-accurate, non-flashing)
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveSessions((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="projects" className="py-28 px-6 bg-space-950 relative border-t border-slate-900 overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-secondary-violet/10 blur-[170px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-secondary-violet bg-secondary-violet/10 border border-secondary-violet/30 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE // PROVEN SCALE</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Multi-Campus School Management System (EIMS)
          </h2>
          <p className="text-slate-400 max-w-3xl text-lg leading-relaxed mb-6">
            A production-hardened multi-tenant educational governance platform built with React, Vite, Node.js Express, and Supabase PostgreSQL.
          </p>

          {/* Launch Live Interactive Sandbox Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-energy-teal via-cyan-400 to-secondary-violet text-space-950 font-black text-sm tracking-wide shadow-[0_0_30px_rgba(0,242,254,0.35)] hover:scale-105 transition-all"
          >
            <PlayCircle className="w-5 h-5 fill-current" />
            <span>Launch Live Interactive Demo Sandbox</span>
          </button>
        </div>

        {/* Live Executive KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Active Sessions */}
          <div className="p-6 rounded-3xl bg-space-900/80 border border-energy-teal/40 backdrop-blur-xl relative overflow-hidden group hover:border-energy-teal hover:shadow-[0_0_35px_rgba(0,242,254,0.25)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span className="flex items-center space-x-1.5 text-energy-teal">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>LIVE SESSIONS</span>
              </span>
              <span className="text-emerald-400 font-bold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +23.1%
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">
              {liveSessions.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Concurrent user sessions across cluster</div>
          </div>

          {/* Students Managed */}
          <div className="p-6 rounded-3xl bg-space-900/80 border border-secondary-violet/40 backdrop-blur-xl relative overflow-hidden group hover:border-secondary-violet hover:shadow-[0_0_35px_rgba(139,92,246,0.25)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span className="text-secondary-violet flex items-center space-x-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>STUDENT ROSTER</span>
              </span>
              <span className="text-cyan-400 font-bold">96.4% Att.</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">
              1,240
            </div>
            <div className="text-xs text-slate-400">Enrolled students in 3 campus institutions</div>
          </div>

          {/* Certified Faculty */}
          <div className="p-6 rounded-3xl bg-space-900/80 border border-cyan-400/40 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400 hover:shadow-[0_0_35px_rgba(56,189,248,0.25)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span className="text-cyan-400 flex items-center space-x-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                <span>FACULTY ALLOCATION</span>
              </span>
              <span className="text-emerald-400 font-bold">100% Active</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">
              68
            </div>
            <div className="text-xs text-slate-400">Teaching faculty & departmental heads</div>
          </div>

          {/* Fee Recovery */}
          <div className="p-6 rounded-3xl bg-space-900/80 border border-slate-700/80 backdrop-blur-xl relative overflow-hidden group hover:border-energy-teal/50 hover:shadow-[0_0_35px_rgba(0,242,254,0.15)] transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span className="text-slate-300 flex items-center space-x-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>FEE RECOVERY</span>
              </span>
              <span className="text-emerald-400 font-bold">94.0%</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-white mb-1 tracking-tight">
              94.0%
            </div>
            <div className="text-xs text-slate-400">Automated voucher reconciliation</div>
          </div>
        </div>

        {/* Interactive Dual-Portal & Security Deep Dive Tabs */}
        <div className="rounded-3xl bg-space-900/80 border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl mb-12">
          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800 px-6 py-4 bg-space-850/80">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveTab('superadmin')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                  activeTab === 'superadmin'
                    ? 'bg-energy-teal/20 text-energy-cyan border border-energy-teal/40 shadow-[0_0_15px_rgba(0,242,254,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4 text-energy-teal" />
                <span>Superadmin Portal</span>
              </button>

              <button
                onClick={() => setActiveTab('campus')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                  activeTab === 'campus'
                    ? 'bg-secondary-violet/20 text-violet-300 border border-secondary-violet/40 shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Building className="w-4 h-4 text-secondary-violet" />
                <span>Institute Admin Portal</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center space-x-2 ${
                  activeTab === 'security'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lock className="w-4 h-4 text-cyan-400" />
                <span>Security & RBAC Architecture</span>
              </button>
            </div>

            <div className="hidden sm:flex items-center space-x-2 font-mono text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>CLUSTER STATUS: HEALTHY</span>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-8">
            {activeTab === 'superadmin' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded bg-energy-teal/10 text-energy-teal border border-energy-teal/30">
                    PLATFORM-WIDE ADMINISTRATIVE GOVERNANCE
                  </span>
                  <h3 className="text-3xl font-extrabold text-white">
                    Superadmin Executive Engine
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Centralized platform governor managing educational divisions, districts, examination boards (BISE Lahore, Cambridge CAIE, FBISE), and complete campus directory with 1-click administrative delegation.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-1">Academics Module</div>
                      <div className="text-sm font-bold text-white">Syllabus & Study Schemes</div>
                      <div className="text-xs text-slate-500 mt-1">Curricula roadmaps & credit hours</div>
                    </div>

                    <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-1">Audit Stream</div>
                      <div className="text-sm font-bold text-white">30-Day Activity Log</div>
                      <div className="text-xs text-slate-500 mt-1">Immutable administrative trace</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-space-950 border border-slate-800/90 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-slate-400">
                    <span>LIVE EVENT STREAM</span>
                    <span className="text-energy-teal">REALTIME</span>
                  </div>
                  {auditLog.map((log) => (
                    <div key={log.id} className="flex items-start justify-between space-x-2 py-1.5">
                      <div className="flex items-start space-x-2">
                        <span className="text-slate-500 shrink-0">{log.time}</span>
                        <span className="text-slate-300">{log.event}</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-energy-cyan shrink-0">
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'campus' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded bg-secondary-violet/10 text-secondary-violet border border-secondary-violet/30">
                    CAMPUS-SPECIFIC DAILY OPERATIONS
                  </span>
                  <h3 className="text-3xl font-extrabold text-white">
                    Institute Admin & Operations Portal
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Granular campus-level portal serving individual school principals, registrars, and accountants. Manages student admissions, classroom capacities, daily attendance register, and fee voucher issuance.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-1">Admissions & Roster</div>
                      <div className="text-sm font-bold text-white">1,240 Enrolled Profiles</div>
                      <div className="text-xs text-slate-500 mt-1">Roll numbers & guardian contacts</div>
                    </div>

                    <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-1">Attendance Roll-Call</div>
                      <div className="text-sm font-bold text-white">Interactive Register</div>
                      <div className="text-xs text-slate-500 mt-1">Real-time Present/Absent sheet</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-space-950 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="text-slate-400 pb-2 border-b border-slate-800 font-semibold">
                    CAMPUS METRICS BREAKDOWN
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Beaconhouse Central High:</span>
                    <span className="text-white font-bold">540 Students</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Islamia College Campus:</span>
                    <span className="text-white font-bold">420 Students</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-400">Punjab Model Campus:</span>
                    <span className="text-white font-bold">280 Students</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 flex justify-between text-energy-teal">
                    <span>Total Students:</span>
                    <span className="font-bold">1,240 Enrolled</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="font-mono text-xs uppercase px-3 py-1 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-400/30">
                    ENTERPRISE SECURITY & DATA ISOLATION
                  </span>
                  <h3 className="text-3xl font-extrabold text-white">
                    Hardened Security & RBAC Model
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Engineered with zero-trust multi-tenancy. Every request is verified via tokenized middleware ensuring strict tenant data isolation across institutes, classes, and administrative scopes.
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-1">Row-Level Security (RLS)</div>
                      <div className="text-sm font-bold text-white">Supabase PostgreSQL 16</div>
                      <div className="text-xs text-slate-500 mt-1">Kernel-level data tenancy boundaries</div>
                    </div>

                    <div className="p-4 rounded-xl bg-space-950 border border-slate-800">
                      <div className="text-xs font-mono text-slate-400 mb-1">Cryptographic Auth</div>
                      <div className="text-sm font-bold text-white">HMAC-SHA256 Tokens</div>
                      <div className="text-xs text-slate-500 mt-1">Timed expiration & instant revocation</div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 p-6 rounded-2xl bg-space-950 border border-slate-800 font-mono text-xs space-y-3">
                  <div className="text-slate-400 pb-2 border-b border-slate-800 font-semibold">
                    ROLE PERMISSION MATRIX
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-300">Superadmin:</span>
                    <span className="text-emerald-400 font-bold">ROOT_FULL_ACCESS</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-300">Institute Admin:</span>
                    <span className="text-cyan-400 font-bold">TENANT_RESTRICTED</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-300">Teaching Faculty:</span>
                    <span className="text-violet-400 font-bold">CLASSROOM_READ_WRITE</span>
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-slate-500 text-[11px]">
                    SQL Injection proof via prepared statements & parameterized inputs.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Database Architecture Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">16 Relational Tables on Supabase PostgreSQL</h4>
              <p className="text-xs text-slate-400">
                Foreign key constraints, relational cascading, transaction rollbacks, and indexed foreign keys.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-space-800 text-energy-teal border border-energy-teal/30">
              PostgreSQL 16
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-space-800 text-secondary-violet border border-secondary-violet/30">
              Express REST API
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-space-800 text-slate-300 border border-slate-700">
              React + Vite SPA
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox Modal */}
      <EIMSDemoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
