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
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold">Student Management</h2>
        <div className="flex gap-2">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search" className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm outline-none dark:border-slate-700" />
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-700">
            <option value="all">All</option>
            <option value="Active">Active</option>
            <option value="Pending Fees">Pending Fees</option>
          </select>
        </div>
      </div>
      <div className="overflow-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 dark:border-slate-700">
              <th className="py-2">Admission ID</th>
              <th>Name</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2">{r.id}</td>
                <td>{r.name}</td>
                <td>{r.course}</td>
                <td>{r.batch}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
