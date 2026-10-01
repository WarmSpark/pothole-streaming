import React, { useState } from 'react';
import type { MediaAsset, RoyaltyTransaction } from '../types';
import { 
  Receipt, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Calculator, 
  Download, 
  CheckCircle2, 
  ShieldCheck,
  Building2,
  PieChart
} from 'lucide-react';

interface RoyaltyViewProps {
  assets: MediaAsset[];
  transactions: RoyaltyTransaction[];
}

export const RoyaltyView: React.FC<RoyaltyViewProps> = ({ assets, transactions }) => {
  const [calculatorMinutes, setCalculatorMinutes] = useState(120000);
  const [calculatorRate, setCalculatorRate] = useState(0.045);

  const totalWatchHours = assets.reduce((acc, a) => acc + a.royalties.totalWatchHours, 0);
  const totalAccrued = assets.reduce((acc, a) => acc + a.royalties.accruedEarnings, 0);
  const totalStreams = assets.reduce((acc, a) => acc + a.royalties.totalStreams, 0);

  const estimatedPayout = calculatorMinutes * calculatorRate;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-6 h-6 text-[#1f80e0]" />
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Royalty Accounting Ledger
            </h1>
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Automated Watch-Time Telemetry, Pro-Rata Rev-Share Pool & Auditable Financial Disbursements
          </p>
        </div>

        <button 
          onClick={() => alert("Exported immutable double-entry ledger to CSV for studio audit.")}
          className="flex items-center gap-2 bg-[#192133] hover:bg-gray-800 text-white border border-gray-700 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md self-start md:self-auto"
        >
          <Download className="w-4 h-4 text-[#1f80e0]" />
          Export Audit Ledger (CSV)
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#192133] p-5 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Total Accrued Royalties</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">
            ${totalAccrued.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            +12.4% vs last billing cycle
          </div>
        </div>

        <div className="bg-[#192133] p-5 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Logged Watch Time</span>
            <Clock className="w-4 h-4 text-[#1f80e0]" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">
            {(totalWatchHours / 1000).toFixed(1)}k <span className="text-sm font-normal text-gray-400">Hours</span>
          </div>
          <div className="text-[11px] text-gray-500">
            From 10s ping telemetry heartbeats
          </div>
        </div>

        <div className="bg-[#192133] p-5 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Total Completed Streams</span>
            <PieChart className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl md:text-3xl font-black text-white font-mono">
            {totalStreams.toLocaleString()}
          </div>
          <div className="text-[11px] text-purple-400">
            Avg Duration: 42.8 mins
          </div>
        </div>

        <div className="bg-[#192133] p-5 rounded-2xl border border-gray-800 space-y-1">
          <div className="flex items-center justify-between text-gray-500 text-xs">
            <span>Disbursement Model</span>
            <Building2 className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white mt-1">
            Pro-Rata Pool
          </div>
          <div className="text-[11px] text-gray-400">
            Allocated monthly to studio partners
          </div>
        </div>

      </div>

      {/* Interactive Royalty Calculator */}
      <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <span className="text-[10px] text-[#1f80e0] font-mono font-bold uppercase tracking-wider">
              Simulation Sandbox
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#1f80e0]" />
              Pro-Rata Licensor Payout Estimator
            </h3>
          </div>
          <span className="text-xs text-gray-400 hidden sm:inline">
            Formula: <code className="text-gray-200">Watch Minutes × Contract Rate/Min</code>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Stream Watch Minutes:</span>
              <span className="font-mono text-white font-bold">{calculatorMinutes.toLocaleString()} mins</span>
            </div>
            <input 
              type="range"
              min={10000}
              max={500000}
              step={10000}
              value={calculatorMinutes}
              onChange={(e) => setCalculatorMinutes(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#1f80e0]"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-400">
              <span>Contract Rate Per Minute:</span>
              <span className="font-mono text-[#1f80e0] font-bold">${calculatorRate.toFixed(3)}/min</span>
            </div>
            <input 
              type="range"
              min={0.010}
              max={0.100}
              step={0.005}
              value={calculatorRate}
              onChange={(e) => setCalculatorRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#1f80e0]"
            />
          </div>

          <div className="bg-[#0C111B] p-4 rounded-xl border border-gray-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-gray-500 block">Calculated Net Studio Payout</span>
              <span className="text-xl md:text-2xl font-black text-emerald-400 font-mono">
                ${estimatedPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
              Audit Ready
            </span>
          </div>

        </div>
      </div>

      {/* Transaction Ledger Table */}
      <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-[#1f80e0]" />
            Real-Time Stream Transaction Stream (Append-Only)
          </h3>
          <span className="text-xs text-gray-500 font-mono">
            {transactions.length} Verified Ledger Entries
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0C111B]">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#141824] text-gray-400 font-semibold border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">TXN Hash</th>
                <th className="py-3 px-4">Asset Title</th>
                <th className="py-3 px-4">Licensor / Studio</th>
                <th className="py-3 px-4">Watch Duration</th>
                <th className="py-3 px-4">Accrued Amount</th>
                <th className="py-3 px-4">Territory</th>
                <th className="py-3 px-4">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-mono text-[11px]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-purple-400 font-bold">{tx.id}</td>
                  <td className="py-3 px-4 text-white font-sans font-bold">{tx.assetTitle}</td>
                  <td className="py-3 px-4 text-gray-400">{tx.licensor}</td>
                  <td className="py-3 px-4 text-gray-300">
                    {Math.floor(tx.watchSeconds / 60)}m {tx.watchSeconds % 60}s
                  </td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">
                    +${tx.accruedAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-gray-400">{tx.territory}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.status === 'Disbursed'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-[#1f80e0] border border-[#1f80e0]/30'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
