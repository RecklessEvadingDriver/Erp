import { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import api from '../services/api.js';
import { defaultDashboard } from '../data/mockData.js';

const cards = [
  { key: 'students', title: 'Students' },
  { key: 'teachers', title: 'Teachers' },
  { key: 'attendanceToday', title: 'Today Attendance' },
];

export default function DashboardPage() {
  const [data, setData] = useState(defaultDashboard);

  useEffect(() => {
    api.get('/dashboard').then((res) => setData((prev) => ({ ...prev, ...res.data }))).catch(() => {});
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.key} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-sm text-slate-500">{card.title}</div>
            <div className="mt-2 text-2xl font-semibold">{data[card.key]}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-4 text-sm font-medium">Revenue vs Expense</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.chartData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" fill="url(#rev)" />
                <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="url(#exp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="text-sm font-medium">Branches</div>
          <div className="mt-3 space-y-2">
            {data.branches.map((b) => (
              <div key={b} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">{b}</div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm dark:bg-slate-800">QR Attendance enabled for all active batches.</div>
        </div>
      </div>
    </div>
  );
}
