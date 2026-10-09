import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />
  };

  const borderMap = {
    success: 'border-emerald-500/50 bg-emerald-950/90 text-emerald-100',
    error: 'border-rose-500/50 bg-rose-950/90 text-rose-100',
    warning: 'border-amber-500/50 bg-amber-950/90 text-amber-100',
    info: 'border-cyan-500/50 bg-[#0d1726]/95 text-cyan-100'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-200">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl ${borderMap[toast.type] || borderMap.info}`}>
        {iconMap[toast.type] || iconMap.info}
        <span className="text-xs sm:text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
}
