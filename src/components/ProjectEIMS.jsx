import React from 'react';
import { Server, Users, Building, Activity, TrendingUp, CheckCircle, Database, Shield, Layers } from 'lucide-react';

export const ProjectEIMS = () => {
  return (
    <section id="projects" className="py-24 px-6 bg-space-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-secondary-violet bg-secondary-violet/10 border border-secondary-violet/30 px-3.5 py-1.5 rounded-full mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE ARCHITECTURE // PROVEN SCALE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Multi-Campus School Management System (EIMS)
          </h2>
          <p className="text-slate-400 max-w-3xl text-lg">
            A production multi-tenant educational governance platform built with React, Vite, Node.js Express, and Supabase PostgreSQL.
          </p>
        </div>

        {/* Executive Metric Cards (Matching real system metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Active Sessions */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-energy-teal/30 backdrop-blur-xl relative overflow-hidden group hover:border-energy-teal/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span>ACTIVE SESSIONS</span>
              <span className="text-emerald-400 font-bold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +23.1%
              </span>
            </div>
            <div className="text-4xl font-extrabold text-white mb-1">2,341</div>
            <div className="text-xs text-slate-400">Concurrent user sessions across cluster</div>
          </div>

          {/* Students Managed */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-secondary-violet/30 backdrop-blur-xl relative overflow-hidden group hover:border-secondary-violet/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span>STUDENT ROSTER</span>
              <span className="text-cyan-400 font-bold">96.4% Att.</span>
            </div>
            <div className="text-4xl font-extrabold text-white mb-1">1,240</div>
            <div className="text-xs text-slate-400">Enrolled students in 3 institutions</div>
          </div>

          {/* Platform Growth */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-cyan-400/30 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-400/60 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span>GROWTH RATE</span>
              <span className="text-emerald-400 font-bold flex items-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +5.4%
              </span>
            </div>
            <div className="text-4xl font-extrabold text-white mb-1">34.2%</div>
            <div className="text-xs text-slate-400">Platform expansion year-over-year</div>
          </div>

          {/* Fee Recovery */}
          <div className="p-6 rounded-2xl bg-space-900/80 border border-slate-700/60 backdrop-blur-xl relative overflow-hidden group hover:border-slate-600 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3">
              <span>FEE RECOVERY</span>
              <span className="text-emerald-400 font-bold">94.0%</span>
            </div>
            <div className="text-4xl font-extrabold text-white mb-1">94.0%</div>
            <div className="text-xs text-slate-400">Voucher reconciliation efficiency</div>
          </div>
        </div>

        {/* Dual Portal Architecture Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Superadmin Platform Portal */}
          <div className="p-8 rounded-3xl bg-space-900/70 border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-energy-teal/10 border border-energy-teal/30 flex items-center justify-center text-energy-teal">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Superadmin Portal</h3>
                <p className="text-xs font-mono text-slate-400">Platform-Wide Administration</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Centralized platform governor managing educational divisions, administrative districts, examination bodies (BISE, CAIE), study schemes, and multi-tenant billing.
            </p>

            <ul className="space-y-3 font-mono text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-energy-teal shrink-0" />
                <span>Multi-Campus Directory with 1-click administrative delegation</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-energy-teal shrink-0" />
                <span>Academics Module: Curricula, study schemes, and credit hours</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-energy-teal shrink-0" />
                <span>Platform Audit Stream: 30-day chronological event trail</span>
              </li>
            </ul>
          </div>

          {/* Institute Admin Portal */}
          <div className="p-8 rounded-3xl bg-space-900/70 border border-slate-800 backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-secondary-violet/10 border border-secondary-violet/30 flex items-center justify-center text-secondary-violet">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Institute Admin Portal</h3>
                <p className="text-xs font-mono text-slate-400">Campus-Specific Operations</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              Day-to-day operations engine for campus administrators, managing 1,240 student admissions, 68 faculty allocations, live attendance roll-call, and fee challans.
            </p>

            <ul className="space-y-3 font-mono text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-secondary-violet shrink-0" />
                <span>Student Admissions & Roster: Roll numbers & section assignments</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-secondary-violet shrink-0" />
                <span>Daily Attendance Register: Interactive Present / Absent roll-call</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-secondary-violet shrink-0" />
                <span>Fee Management & Challan Generation: Automated billing vouchers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Database & Security Architecture Callout */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-space-900 via-space-850 to-space-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">16 Relational Tables on Supabase PostgreSQL</h4>
              <p className="text-xs text-slate-400">
                Normalized schema with foreign key integrity, row-level policies, and index-optimized query plans.
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
              Vite Frontend
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
