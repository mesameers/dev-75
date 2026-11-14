import React, { useState } from 'react';
import {
  X,
  Shield,
  Building,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  FileText,
  DollarSign,
  UserCheck,
  RefreshCw,
  Key,
  Lock,
  Sparkles
} from 'lucide-react';

export const EIMSDemoModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeCampus, setActiveCampus] = useState('Beaconhouse Central High');
  const [attendance, setAttendance] = useState({
    'Ali Raza (Roll #101)': 'Present',
    'Fatima Noor (Roll #102)': 'Present',
    'Hamza Tariq (Roll #103)': 'Absent',
    'Zainab Bibi (Roll #104)': 'Present',
    'Bilal Ahmed (Roll #105)': 'Present',
  });
  const [generatedChallan, setGeneratedChallan] = useState(null);
  const [securityStatus, setSecurityStatus] = useState('AUTHENTICATED_SECURE');

  const toggleAttendance = (student) => {
    setAttendance((prev) => ({
      ...prev,
      [student]: prev[student] === 'Present' ? 'Absent' : 'Present',
    }));
  };

  const presentCount = Object.values(attendance).filter((s) => s === 'Present').length;
  const attendanceRate = ((presentCount / Object.values(attendance).length) * 100).toFixed(1);

  const handleGenerateChallan = () => {
    const challanId = `CH-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedChallan({
      id: challanId,
      student: 'Ali Raza (Roll #101)',
      campus: activeCampus,
      month: 'November 2026',
      amount: '$140.00',
      status: 'VERIFIED_UNPAID',
      timestamp: new Date().toLocaleTimeString(),
      hash: `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
    });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-space-900 border-2 border-energy-teal/40 shadow-[0_30px_100px_rgba(0,242,254,0.3)] overflow-hidden flex flex-col font-sans">
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-space-850 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-energy-teal/20 border border-energy-teal/40 flex items-center justify-center text-energy-teal">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">EIMS Enterprise Interactive Sandbox</h3>
              <p className="text-xs font-mono text-slate-400">Live Multi-Campus Governance Simulation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-space-800 hover:bg-space-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Campus Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-space-950 border border-slate-800">
            <span className="font-mono text-xs text-slate-400 uppercase tracking-wider">
              SELECT CAMPUS INSTITUTE:
            </span>
            <div className="flex flex-wrap gap-2">
              {['Beaconhouse Central High', 'Islamia College Campus', 'Punjab Model Campus'].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCampus(c)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-all ${
                    activeCampus === c
                      ? 'bg-energy-teal text-space-950 font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                      : 'bg-space-850 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Attendance Register */}
          <div className="p-6 rounded-2xl bg-space-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <GraduationCap className="w-4 h-4 text-energy-teal" />
                <span>Class Grade 11-A Attendance Register (Click to Toggle)</span>
              </div>
              <div className="font-mono text-xs px-2.5 py-1 rounded-lg bg-space-900 border border-slate-800">
                <span>Present Rate: </span>
                <span className="text-emerald-400 font-bold">{attendanceRate}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {Object.entries(attendance).map(([student, status]) => (
                <div
                  key={student}
                  onClick={() => toggleAttendance(student)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    status === 'Present'
                      ? 'bg-space-900/90 border-emerald-500/40 text-emerald-300'
                      : 'bg-space-900/90 border-rose-500/40 text-rose-300'
                  }`}
                >
                  <span className="text-xs font-mono font-medium text-slate-200">{student}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      status === 'Present' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Challan Generator Section */}
          <div className="p-6 rounded-2xl bg-space-950 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white font-bold text-sm">
                <DollarSign className="w-4 h-4 text-secondary-violet" />
                <span>Automated Fee Voucher Generator</span>
              </div>
              <button
                onClick={handleGenerateChallan}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-energy-teal to-secondary-violet text-space-950 font-extrabold text-xs shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:scale-105 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate Voucher</span>
              </button>
            </div>

            {generatedChallan ? (
              <div className="p-4 rounded-xl bg-space-900 border border-secondary-violet/40 font-mono text-xs space-y-2 animate-fadeIn">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 pb-2">
                  <span>VOUCHER #{generatedChallan.id}</span>
                  <span className="text-emerald-400 font-bold">{generatedChallan.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
                  <div>Student: <span className="text-white font-bold">{generatedChallan.student}</span></div>
                  <div>Campus: <span className="text-white font-bold">{generatedChallan.campus}</span></div>
                  <div>Tuition: <span className="text-energy-cyan font-bold">{generatedChallan.amount}</span></div>
                  <div>Crypto Hash: <span className="text-violet-400 font-bold">{generatedChallan.hash}</span></div>
                </div>
              </div>
            ) : (
              <p className="text-xs font-mono text-slate-500">
                Click "Generate Voucher" to simulate automated billing voucher reconciliation with Supabase PostgreSQL.
              </p>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-space-850 border-t border-slate-800 flex items-center justify-between font-mono text-xs text-slate-400">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>ROLE: SUPERADMIN_ROOT_PRIVILEGE</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-space-800 hover:bg-space-700 text-white font-semibold transition-colors border border-slate-700"
          >
            Close Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
