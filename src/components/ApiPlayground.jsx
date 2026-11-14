import React, { useState } from 'react';
import {
  Send,
  Play,
  Copy,
  Check,
  RefreshCw,
  Terminal,
  Activity,
  Shield,
  Layers,
  Cpu,
  Flame,
  Clock,
  Sparkles,
  Database
} from 'lucide-react';

const API_ENDPOINTS = [
  {
    id: 'auth-verify',
    method: 'POST',
    path: '/api/v1/auth/verify',
    title: 'Zero-Trust RBAC Token Verification',
    badge: 'Security / Auth',
    badgeColor: '#00FFE0',
    description: 'Validates cryptographically signed RS256 JWT bearer token, checks tenant revocation list, and extracts permission scopes.',
    defaultHeaders: {
      'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.orbit_payload',
      'X-Tenant-ID': 'tenant_us_east_primary',
      'Content-Type': 'application/json',
    },
    defaultBody: JSON.stringify(
      {
        token: "eyJhbGciOiJSUzI1NiJ9.orbit.session.sig",
        requiredRole: "cluster_operator",
        resource: "k8s:deployments:scale"
      },
      null,
      2
    ),
    mockResponse: (body) => ({
      status: 200,
      statusText: "OK",
      latencyMs: 14,
      data: {
        authenticated: true,
        identity: {
          uid: "usr_7f89d3a1",
          email: "mesameer762@gmail.com",
          role: "cluster_operator",
          tenant: "enterprise_orbit_us_east",
          scopes: ["metrics:read", "k8s:deployments:scale", "cluster:drain"]
        },
        tokenDetails: {
          algorithm: "RS256",
          expiresIn: 3600,
          issuedAt: new Date().toISOString()
        },
        governance: {
          revocationCheck: "PASS (sub-1ms cache hit)",
          zeroTrustCompliant: true
        }
      }
    }),
  },
  {
    id: 'cluster-topology',
    method: 'GET',
    path: '/api/v1/cluster/topology',
    title: 'Mesh Topology & Global Node Health',
    badge: 'Microservices / Cloud',
    badgeColor: '#8B5CF6',
    description: 'Queries active Kubernetes nodes, Redis cluster health, read replicas, and global p99 response times.',
    defaultHeaders: {
      'X-Trace-ID': 'trace_909ab87c_live',
      'Accept': 'application/json',
    },
    defaultBody: '',
    mockResponse: () => ({
      status: 200,
      statusText: "OK",
      latencyMs: 9,
      data: {
        clusterName: "nexus-cloud-prod-us",
        region: "us-east-1",
        activeNodes: 6,
        replicaLagMs: 2.1,
        p99LatencyMs: 14.8,
        services: [
          { name: "edge-gateway", replicas: 4, status: "HEALTHY", cpuPct: 28 },
          { name: "auth-gateway", replicas: 3, status: "HEALTHY", cpuPct: 32 },
          { name: "redis-cluster-v7", shards: 3, status: "HEALTHY", memoryPct: 41 },
          { name: "pg-pool-patroni", primary: 1, syncStandby: 2, status: "HEALTHY" },
          { name: "remotion-worker-pool", workers: 8, status: "IDLE_READY", queueDepth: 0 }
        ],
        cloudSLA: "99.993% (Trailing 90 Days)"
      }
    }),
  },
  {
    id: 'rate-limiter',
    method: 'POST',
    path: '/api/v1/cache/sliding-window',
    title: 'Distributed Sliding-Window Rate Limiter',
    badge: 'Redis / Distributed Cache',
    badgeColor: '#38BDF8',
    description: 'Atomic Redis multi-key zremrangebyscore and zcard algorithm to prevent noisy-neighbor DoS attacks.',
    defaultHeaders: {
      'X-Client-IP': '198.51.100.42',
      'Content-Type': 'application/json',
    },
    defaultBody: JSON.stringify(
      {
        key: "ip:198.51.100.42:api:v1",
        windowMs: 60000,
        maxRequests: 500
      },
      null,
      2
    ),
    mockResponse: (body) => ({
      status: 200,
      statusText: "OK",
      latencyMs: 11,
      data: {
        allowed: true,
        currentUsage: 84,
        remainingLimit: 416,
        resetWindowInSeconds: 38,
        backpressurePolicy: "TOKEN_BUCKET_BALANCED",
        nodeExecution: "redis_cluster_node_02 (atomic Lua script)"
      }
    }),
  },
  {
    id: 'motion-render',
    method: 'POST',
    path: '/api/v1/motion/frame',
    title: 'Remotion Deterministic Frame Synthesis',
    badge: 'Creative / Video Engine',
    badgeColor: '#EC4899',
    description: 'Dispatches headless Puppeteer canvas snapshot for real-time 30.0 fps video composition in AWS Lambda.',
    defaultHeaders: {
      'X-Render-Engine': 'remotion-v4-headless',
      'Content-Type': 'application/json',
    },
    defaultBody: JSON.stringify(
      {
        composition: "BuiltInOrbit",
        frame: 145,
        fps: 30,
        width: 1920,
        height: 1080,
        inputProps: {
          heroTitle: "Sameer Hussain",
          accentColor: "#00F2FE"
        }
      },
      null,
      2
    ),
    mockResponse: (body) => ({
      status: 201,
      statusText: "Created",
      latencyMs: 28,
      data: {
        renderJobId: "job_rm_837b92f0",
        frameRendered: 145,
        timeCode: "00:00:04:25",
        frameBufferSizeBytes: 1845920,
        compressionCodec: "prores_422_hq",
        storageS3Url: "s3://dev75-renders/frames/frame_0145.png",
        deterministicChecksum: "sha256:d83f12a9e38d94b0c20188ef77382"
      }
    }),
  },
];

export const ApiPlayground = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [requestBody, setRequestBody] = useState(selectedEndpoint.defaultBody);
  const [isExecuting, setIsExecuting] = useState(false);
  const [responseOutput, setResponseOutput] = useState(null);
  const [hasCopied, setHasCopied] = useState(false);

  const handleSelectEndpoint = (ep) => {
    setSelectedEndpoint(ep);
    setRequestBody(ep.defaultBody);
    setResponseOutput(null);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setResponseOutput(null);

    // Realistic simulated API network roundtrip
    setTimeout(() => {
      const mockResult = selectedEndpoint.mockResponse(requestBody);
      setResponseOutput(mockResult);
      setIsExecuting(false);
    }, 450 + Math.random() * 300);
  };

  const handleCopyResponse = () => {
    if (!responseOutput) return;
    navigator.clipboard.writeText(JSON.stringify(responseOutput.data, null, 2));
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <section id="api-playground" className="py-24 px-6 bg-transparent relative border-t border-slate-900/60 overflow-hidden">
      {/* Target Aliases for 1-Click & Voice Navigation */}
      <span id="api" className="sr-only" />
      <span id="api-suite" className="sr-only" />
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[700px] h-[500px] bg-energy-teal/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-secondary-violet/10 blur-[190px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center space-x-2 font-mono text-xs tracking-widest text-energy-teal bg-energy-teal/10 border border-energy-teal/30 px-3.5 py-1.5 rounded-full mb-3 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
            <Activity className="w-3.5 h-3.5 text-energy-cyan animate-pulse" />
            <span>INTERACTIVE LIVE API PLAYGROUND // TEST SUITE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-3">
            Real-Time Production API Tester
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Dispatch live mock queries to Sameer’s microservices endpoints. Inspect zero-trust auth token verification, distributed rate-limiting, cluster topology, and deterministic Remotion rendering.
          </p>
        </div>

        {/* Endpoint Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {API_ENDPOINTS.map((ep) => {
            const isSelected = selectedEndpoint.id === ep.id;
            return (
              <button
                key={ep.id}
                onClick={() => handleSelectEndpoint(ep)}
                className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-space-900/95 border-energy-teal shadow-[0_0_25px_rgba(0,242,254,0.25)] scale-[1.02]'
                    : 'bg-space-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-space-850'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
                      ep.method === 'GET'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${ep.badgeColor}15`,
                      color: ep.badgeColor,
                      border: `1px solid ${ep.badgeColor}40`,
                    }}
                  >
                    {ep.badge}
                  </span>
                </div>
                <div className="font-mono text-xs font-bold text-white truncate mb-1">
                  {ep.path}
                </div>
                <div className="text-[11px] text-slate-400 line-clamp-1">
                  {ep.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* API Playground Interactive Console Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Request Configuration (6 cols) */}
          <div className="lg:col-span-6 flex flex-col p-6 rounded-2xl bg-space-900/85 border border-slate-800 backdrop-blur-xl shadow-2xl">
            {/* Header with Execute Button */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-2.5">
                <span
                  className={`font-mono text-xs font-black px-2.5 py-1 rounded ${
                    selectedEndpoint.method === 'GET'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {selectedEndpoint.method}
                </span>
                <span className="font-mono text-xs sm:text-sm font-semibold text-white">
                  {selectedEndpoint.path}
                </span>
              </div>

              <button
                onClick={handleExecute}
                disabled={isExecuting}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-energy-teal to-energy-cyan text-space-950 font-mono text-xs font-black shadow-[0_0_20px_rgba(0,242,254,0.35)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>DISPATCHING...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>SEND REQUEST</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              {selectedEndpoint.description}
            </p>

            {/* Headers Preview */}
            <div className="mb-4">
              <div className="font-mono text-[11px] font-bold text-slate-400 mb-1.5 flex items-center space-x-1.5">
                <Shield className="w-3.5 h-3.5 text-energy-teal" />
                <span>REQUEST HEADERS</span>
              </div>
              <div className="p-3 rounded-xl bg-space-950/80 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
                {Object.entries(selectedEndpoint.defaultHeaders).map(([key, val]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-slate-500">{key}:</span>
                    <span className="text-energy-cyan truncate max-w-[280px]">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Request Body Editor */}
            <div className="flex-1 flex flex-col">
              <div className="font-mono text-[11px] font-bold text-slate-400 mb-1.5 flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Database className="w-3.5 h-3.5 text-secondary-violet" />
                  <span>REQUEST BODY (JSON payload)</span>
                </span>
                {selectedEndpoint.defaultBody === '' && (
                  <span className="text-slate-500 text-[10px] italic">No body required for GET</span>
                )}
              </div>

              {selectedEndpoint.defaultBody !== '' ? (
                <textarea
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  rows={7}
                  className="w-full flex-1 p-3.5 rounded-xl bg-space-950/90 border border-slate-800 font-mono text-xs text-slate-200 focus:outline-none focus:border-energy-teal/70 focus:ring-1 focus:ring-energy-teal/50 transition-all resize-none shadow-inner"
                  spellCheck="false"
                />
              ) : (
                <div className="flex-1 flex items-center justify-center p-6 rounded-xl bg-space-950/40 border border-dashed border-slate-800 text-slate-500 font-mono text-xs">
                  HTTP GET request carries zero payload. Ready to query upstream cluster state.
                </div>
              )}
            </div>
          </div>

          {/* Right: Response Inspector (6 cols) */}
          <div className="lg:col-span-6 flex flex-col p-6 rounded-2xl bg-space-900/85 border border-slate-800 backdrop-blur-xl shadow-2xl relative min-h-[380px]">
            {/* Header: Status, Latency & Copy Button */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold text-slate-400">STATUS:</span>
                {responseOutput ? (
                  <span className="inline-flex items-center space-x-1.5 font-mono text-xs font-black px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                    <Check className="w-3 h-3" />
                    <span>{responseOutput.status} {responseOutput.statusText}</span>
                  </span>
                ) : (
                  <span className="font-mono text-xs text-slate-500">IDLE (awaiting trigger)</span>
                )}

                {responseOutput && (
                  <span className="inline-flex items-center space-x-1 font-mono text-xs text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    <Clock className="w-3 h-3" />
                    <span>{responseOutput.latencyMs}ms</span>
                  </span>
                )}
              </div>

              {responseOutput && (
                <button
                  onClick={handleCopyResponse}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-space-950 border border-slate-700 hover:border-energy-teal text-slate-300 hover:text-white font-mono text-[11px] transition-all"
                  title="Copy JSON Response"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>COPY JSON</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Response Output Body */}
            <div className="flex-1 flex flex-col justify-center">
              {isExecuting ? (
                <div className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full border-2 border-energy-teal/20 border-t-energy-teal animate-spin" />
                    <Activity className="w-5 h-5 text-energy-teal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                  </div>
                  <div className="font-mono text-xs text-energy-cyan tracking-wider">
                    TRANSMITTING PAYLOAD ACROSS CLUSTER...
                  </div>
                  <div className="font-mono text-[11px] text-slate-500">
                    Resolving TLS 1.3 handshake & microservice gateway
                  </div>
                </div>
              ) : responseOutput ? (
                <pre className="flex-1 p-4 rounded-xl bg-space-950/95 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto selection:bg-emerald-500/20 shadow-inner max-h-[360px]">
                  <code>{JSON.stringify(responseOutput.data, null, 2)}</code>
                </pre>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-space-950 border border-slate-800 flex items-center justify-center text-slate-600">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div className="font-mono text-xs text-slate-400 font-semibold">
                    NO ACTIVE HTTP TRANSACTION
                  </div>
                  <p className="text-xs text-slate-500 max-w-sm">
                    Click <span className="text-energy-teal font-semibold">"SEND REQUEST"</span> above to dispatch this payload and inspect real-time response schema, latency, and security headers.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
