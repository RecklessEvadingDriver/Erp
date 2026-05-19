import { Bell, Bot, ChartColumnBig, GraduationCap, IndianRupee, LayoutDashboard, LogOut, Menu, Moon, Search, Sun, UserCircle2 } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext.jsx';
import { sampleNotifications } from '../data/mockData.js';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, roles: ['super-admin', 'admin', 'teacher', 'accountant', 'parent', 'student'] },
  { to: '/students', label: 'Students', icon: GraduationCap, roles: ['super-admin', 'admin', 'teacher'] },
  { to: '/attendance', label: 'Attendance', icon: ChartColumnBig, roles: ['super-admin', 'admin', 'teacher', 'parent'] },
  { to: '/fees', label: 'Fees', icon: IndianRupee, roles: ['super-admin', 'admin', 'accountant', 'parent', 'student'] },
  { to: '/assistant', label: 'AI Assistant', icon: Bot, roles: ['super-admin', 'admin', 'teacher', 'accountant', 'parent', 'student'] },
];

export default function Layout({ children }) {
  const { role, roles, setRole, theme, setTheme } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  const visibleItems = useMemo(() => navItems.filter((item) => item.roles.includes(role)), [role]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-50">
      <div className="flex">
        <aside className={`fixed z-30 h-screen w-64 border-r border-slate-200 bg-white p-4 shadow-sm transition-transform dark:border-slate-800 dark:bg-slate-900 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="mb-5 flex items-center gap-2 text-xl font-semibold">
            <div className="rounded-xl bg-blue-600 p-2 text-white">ERP</div>
            Coaching SaaS
          </div>
          <nav className="space-y-1">
            {visibleItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${location.pathname === to ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                <Icon size={18} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="w-full md:ml-64">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
            <div className="flex items-center gap-3">
              <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden" onClick={() => setOpen((v) => !v)}>
                <Menu size={18} />
              </button>
              <div className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm dark:border-slate-700 sm:flex">
                <Search size={16} />
                <input placeholder="Search students, teachers, reports..." className="w-72 bg-transparent outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-slate-300 bg-transparent px-2 py-1 text-sm dark:border-slate-700">
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="relative">
                <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setNotifOpen((v) => !v)}>
                  <Bell size={18} />
                </button>
                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    {sampleNotifications.map((n) => (
                      <div key={n.id} className="rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-slate-800">
                        <div className="text-sm font-medium">{n.title}</div>
                        <div className="text-xs text-slate-500">{n.time}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800" title="Profile settings"><UserCircle2 size={18} /></button>
              <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800" title="Logout"><LogOut size={18} /></button>
            </div>
          </header>

          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
