import React, { useState, useEffect } from 'react';
import {
  Server,
  Database,
  Cpu,
  Layers,
  Shield,
  Activity,
  Zap,
  Radio,
  CheckCircle2,
  RefreshCw,
  Play
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const TOPOLOGY_NODES = [
  {
    id: 'edge',
    name: 'Vercel Edge Global CDN',
    category: 'INGRESS & CACHE',
    icon: Server,
    color: '#00F2FE',
    latency: '14.2 ms',
    rps: '12,400 req/s',
    health: '100% HEALTHY',
    tech: 'Edge Middleware / Anycast',
    details: 'Global routing layer terminating TLS 1.3, distributing cached static assets, and proxying API payloads.'
  },
  {
    id: 'gateway',
    name: 'Node.js API Microservices',
    category: 'COMPUTE CLUSTER',
    icon: Cpu,
    color: '#38BDF8',
    latency: '4.8 ms',
    rps: '8,900 req/s',
    health: '4/4 REPLICAS UP',
    tech: 'Express.js / Docker Cluster',
    details: 'Clustered Node.js services executing business logic, schema validation, and asynchronous event triggers.'
  },
  {
    id: 'auth',
    name: 'Zero-Trust Auth & RBAC',
    category: 'SECURITY VAULT',
    icon: Shield,
    color: '#10B981',
    latency: '2.1 ms',
    rps: '3,200 req/s',
    health: 'ENCRYPTED',
    tech: 'JWT / Cryptographic Nonce',
    details: 'Granular Role-Based Access Control matrix verifying cryptographically signed session tokens on every request.'
  },
  {
    id: 'cache',
    name: 'Redis In-Memory Distributed Cache',
    category: 'HIGH-SPEED TIER',
    icon: Zap,
    color: '#EF4444',
    latency: '0.8 ms',
    rps: '18,500 ops/s',
    health: '99.2% HIT RATIO',
    tech: 'Redis 7.2 Cluster',
    details: 'In-memory key-value cache preventing redundant database round-trips and managing distributed locks.'
  },
  {
    id: 'database',
    name: 'PostgreSQL 16 Relational Cluster',
    category: 'ACID DATA TIER',
    icon: Database,
    color: '#8B5CF6',
    latency: '8.4 ms',
    rps: '4,100 qps',
    health: 'RLS ENFORCED',
    tech: 'Supabase PostgreSQL',
    details: 'Partition-indexed relational schemas isolated by Row-Level Security (RLS) guaranteeing zero tenant data leak.'
  },
  {
    id: 'motion',
    name: 'Remotion 30fps Video Pipeline',
    category: 'MOTION AS CODE',
    icon: Layers,
    color: '#EC4899',
    latency: '0 jitter',
    rps: '30.0 fps locked',
    health: 'DETERMINISTIC',
    tech: 'Analytical Spring Math',
    details: 'Frame-accurate rendering pipeline transforming state parameters into deterministic visual compositions.'
  },
];

export const ArchitectureTopology = () => {
  const [sectionRef, isInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeNode, setActiveNode] = useState(TOPOLOGY_NODES[0]);
  const [spikeSimulated, setSpikeSimulated] = useState(false);

  const triggerSpike = () => {
    setSpikeSimulated(true);
    setTimeout(() => setSpikeSimulated(false), 3000);
  };

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-24 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden"
    >
      {/* Target Aliases for 1-Click & Voice Navigation */}
      <span id="topology" className="sr-only" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-4 py-1.5 rounded-full mb-3 shadow-[0_0_20px_rgba(0,242,254,0.25)]">
            <Activity className="w-3.5 h-3.5 text-energy-cyan animate-pulse" />
            <span>INTERACTIVE SYSTEM TOPOLOGY // LIVE DATA FLOW</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-4">
            Production Architecture Visualizer
          </h2>
          <p className="text-slate-400 max-w-2xl text-base sm:text-lg mb-6">
            Click on any architectural node to inspect latency hops, throughput load, security policies, and failover redundancy.
          </p>

          <button
            onClick={triggerSpike}
            disabled={spikeSimulated}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all shadow-lg ${
              spikeSimulated
                ? 'bg-rose-500 text-white animate-pulse shadow-[0_0_25px_rgba(244,63,94,0.6)]'
                : 'bg-space-900/80 border border-energy-teal/40 text-energy-cyan hover:bg-space-850 hover:border-energy-teal'
            }`}
          >
            <Zap className={`w-3.5 h-3.5 ${spikeSimulated ? 'animate-bounce' : ''}`} />
            <span>{spikeSimulated ? 'LOAD SPIKE ACTIVE: 50,000 REQ/SEC' : 'SIMULATE 50K REQ/S TRAFFIC SPIKE'}</span>
          </button>
        </div>

        {/* 6-Node Architecture Grid with Interactive Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {TOPOLOGY_NODES.map((node, idx) => {
            const isSelected = activeNode.id === node.id;
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer backdrop-blur-xl relative overflow-hidden group ${
                  isSelected
                    ? 'bg-space-900/95 border-energy-teal shadow-[0_0_35px_rgba(0,242,254,0.25)] scale-[1.02]'
                    : 'bg-space-900/75 border-slate-800/80 hover:border-slate-700 hover:shadow-xl hover:-translate-y-1'
                } ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                {/* Active Glowing Top Accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-opacity"
                  style={{
                    backgroundColor: node.color,
                    opacity: isSelected ? 1 : 0,
                    boxShadow: `0 0 12px ${node.color}`,
                  }}
                />

                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${node.color}15`,
                      border: `1px solid ${node.color}40`,
                      color: node.color,
                      boxShadow: `0 0 20px ${node.color}25`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span
                    className="font-mono text-[10px] font-extrabold px-2.5 py-1 rounded"
                    style={{
                      backgroundColor: `${node.color}15`,
                      color: node.color,
                      border: `1px solid ${node.color}35`,
                    }}
                  >
                    {node.category}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-energy-cyan transition-colors">
                  {node.name}
                </h3>
                <span className="text-xs font-mono text-slate-400 block mb-4">{node.tech}</span>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                  <span className="text-slate-500">P99 LATENCY</span>
                  <span className="text-energy-teal font-bold">{node.latency}</span>
                </div>
                <div className="flex items-center justify-between font-mono text-xs mt-1">
                  <span className="text-slate-500">THROUGHPUT</span>
                  <span className="text-white font-bold">{spikeSimulated ? '45,200 req/s' : node.rps}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Node In-Depth Architectural Telemetry Console */}
        <div className="w-full rounded-3xl bg-space-900/90 border border-slate-800 shadow-[0_30px_90px_rgba(0,0,0,0.85)] p-8 sm:p-10 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 font-mono text-xs text-energy-teal mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>INSPECTED SUBSYSTEM // {activeNode.category}</span>
              </div>
              <h3 className="text-3xl font-black text-white">{activeNode.name}</h3>
              <p className="text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">{activeNode.details}</p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-space-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block">HEALTH SLA</span>
                <span className="text-emerald-400 font-bold">{activeNode.health}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-space-950 border border-slate-800 font-mono text-xs">
                <span className="text-slate-500 block">PROTOCOL</span>
                <span className="text-energy-teal font-bold">{activeNode.tech}</span>
              </div>
            </div>
          </div>

          {/* 4 Interactive Benchmark Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 font-mono">
            <div className="p-4 rounded-2xl bg-space-950 border border-slate-800/80">
              <span className="text-xs text-slate-500 block mb-1">HOP LATENCY</span>
              <span className="text-xl font-black text-energy-cyan">{activeNode.latency}</span>
            </div>
            <div className="p-4 rounded-2xl bg-space-950 border border-slate-800/80">
              <span className="text-xs text-slate-500 block mb-1">BURST CAPACITY</span>
              <span className="text-xl font-black text-white">{spikeSimulated ? '50,000 req/s' : activeNode.rps}</span>
            </div>
            <div className="p-4 rounded-2xl bg-space-950 border border-slate-800/80">
              <span className="text-xs text-slate-500 block mb-1">ENCRYPTION</span>
              <span className="text-xl font-black text-violet-400">TLS 1.3 / AES</span>
            </div>
            <div className="p-4 rounded-2xl bg-space-950 border border-slate-800/80">
              <span className="text-xs text-slate-500 block mb-1">FAILOVER RECOVERY</span>
              <span className="text-xl font-black text-emerald-400">&lt; 300 ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
