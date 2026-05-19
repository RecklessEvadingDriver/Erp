import { CheckCircle2, QrCode } from 'lucide-react';

export default function AttendancePage() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold">QR Attendance</h2>
        <p className="text-sm text-slate-500">Scan student QR code to mark attendance in realtime.</p>
        <button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white">
          <QrCode size={16} /> Start Scanner
        </button>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-lg font-semibold">Today Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-500" /> 1,087 Present</div>
          <div>102 Absent</div>
          <div>51 Late</div>
        </div>
      </div>
    </div>
  );
}
