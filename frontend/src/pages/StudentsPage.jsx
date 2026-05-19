import { useMemo, useState } from 'react';
import { sampleStudents } from '../data/mockData.js';

export default function StudentsPage() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('all');

  const rows = useMemo(() => sampleStudents.filter((s) => {
    const q = query.toLowerCase();
    const matchQ = [s.name, s.id, s.course, s.batch].join(' ').toLowerCase().includes(q);
    const matchStatus = status === 'all' || s.status === status;
    return matchQ && matchStatus;
  }), [query, status]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Student Management</h2>
          <p className="text-xs text-slate-500">{rows.length} records shown</p>
        </div>
        <div className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, id, course" className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700">
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Pending Fees">Pending Fees</option>
          </select>
        </div>
      </div>
      <div className="overflow-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/80">
            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700">
              <th className="px-3 py-2">Admission ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Course</th>
              <th className="px-3 py-2">Batch</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                <td className="px-3 py-2 font-medium">{r.id}</td>
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.course}</td>
                <td className="px-3 py-2">{r.batch}</td>
                <td className="px-3 py-2"><span className={`rounded-full px-2 py-1 text-xs ${r.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'}`}>{r.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
