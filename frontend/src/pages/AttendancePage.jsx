import { CheckCircle2, CircleAlert, Clock3, QrCode, Users } from 'lucide-react';

const todayStats = [
  { label: 'Present', value: '1,087', icon: CheckCircle2, tone: 'text-emerald-500' },
  { label: 'Absent', value: '102', icon: CircleAlert, tone: 'text-rose-500' },
  { label: 'Late', value: '51', icon: Clock3, tone: 'text-amber-500' },
];

export default function AttendancePage() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
        <h2 className="mb-2 text-lg font-semibold">QR Attendance</h2>
        <p className="text-sm text-slate-500">Scan student QR code to mark attendance in realtime with auto-sync.</p>

        <div className="mt-4 flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-blue-600/25">
            <QrCode size={16} /> Start Scanner
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm dark:border-slate-700">
            <Users size={16} /> Open Manual Marking
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold">Today Summary</h2>
        <div className="space-y-3 text-sm">
          {todayStats.map(({ label, value, icon: Icon, tone }) => (
            <div key={label} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 dark:border-slate-700">
              <div className="flex items-center gap-2"><Icon size={16} className={tone} /> {label}</div>
              <div className="font-semibold">{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
