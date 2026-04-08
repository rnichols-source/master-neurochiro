"use client";

import { motion } from "framer-motion";
import { EliteCard } from "@/components/ui/elite-ui";
import { Activity, Mail, AlertTriangle, CheckCircle2, RefreshCw, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAutomationLogs, fetchAutomationStats } from "@/app/actions/admin-actions";

export default function AutomationDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function loadData() {
    setIsLoading(true);
    const [logsRes, statsRes] = await Promise.all([
      fetchAutomationLogs(),
      fetchAutomationStats()
    ]);
    if (logsRes.success) setLogs(logsRes.data || []);
    if (statsRes.success) setStats(statsRes.data || null);
    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tight">Automation Command Center</h1>
          <p className="text-white/40 font-medium mt-1">Real-time monitoring of lifecycle communications.</p>
        </div>
        <button 
          onClick={loadData}
          className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white/60 transition-all"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Sent" value={stats?.totalSent || 0} icon={Mail} color="text-blue-400" />
        <StatCard title="Failed" value={stats?.totalFailed || 0} icon={AlertTriangle} color="text-red-400" />
        <StatCard title="Reminders" value={stats?.reminders || 0} icon={Clock} color="text-orange-400" />
        <StatCard title="Engagement" value={stats?.reengagements || 0} icon={Activity} color="text-green-400" />
      </div>

      <EliteCard title="Recent Automation History" icon={Activity}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-xs font-black uppercase tracking-widest text-white/30">
                <th className="py-4 px-4">Timestamp</th>
                <th className="py-4 px-4">Recipient</th>
                <th className="py-4 px-4">Event Type</th>
                <th className="py-4 px-4">Status</th>
                <th className="py-4 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {logs.map((log) => (
                <tr key={log.id} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 text-xs font-medium text-white/60">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="py-4 px-4 text-xs font-bold text-white">{log.user_email}</td>
                  <td className="py-4 px-4 text-xs">
                    <span className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-white/60 font-mono">
                      {log.event_type}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {log.status === 'sent' ? (
                      <span className="flex items-center gap-1.5 text-green-400 text-xs font-black uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Sent
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-red-400 text-xs font-black uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5" /> Failed
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-xs font-medium text-white/40 max-w-xs truncate">
                    {log.metadata?.subject || log.error_message || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EliteCard>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl space-y-4">
      <div className={`p-3 bg-white/5 rounded-2xl w-fit ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-white/40">{title}</p>
        <p className="text-3xl font-black text-white mt-1">{value}</p>
      </div>
    </div>
  );
}
