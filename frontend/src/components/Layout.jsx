import { Bell, Bot, ChartColumnBig, GraduationCap, IndianRupee, LayoutDashboard, LogOut, Menu, Moon, Search, Sun, UserCircle2, X } from 'lucide-react';
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
    <div className="min-h-screen text-slate-900 transition-colors dark:text-slate-50">
      {open && <button aria-label="Close sidebar overlay" className="fixed inset-0 z-20 bg-slate-950/40 md:hidden" onClick={() => setOpen(false)} />}

      <div className="flex">
        <aside className={`fixed z-30 h-screen w-72 border-r border-slate-200/75 bg-white/85 p-5 shadow-xl backdrop-blur-md transition-transform dark:border-slate-800 dark:bg-slate-900/90 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-xl font-semibold">
              <div className="rounded-xl bg-blue-600 px-2.5 py-1.5 text-base text-white shadow-lg shadow-blue-600/30">ERP</div>
              <div>
                <div>Coaching SaaS</div>
                <div className="text-xs font-normal text-slate-500 dark:text-slate-400">Operations console</div>
              </div>
            </div>
            <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden" onClick={() => setOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-1.5">
            {visibleItems.map(({ to, label, icon: Icon }) => {
              const active = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'}`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="w-full md:ml-72">
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200/70 bg-white/75 px-4 py-3.5 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/75">
            <div className="flex items-center gap-3">
              <button className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 md:hidden" onClick={() => setOpen((v) => !v)}>
                <Menu size={18} />
              </button>
              <div className="hidden items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex">
                <Search size={16} className="text-slate-500" />
                <input placeholder="Search students, teachers, reports..." className="w-72 bg-transparent outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm capitalize shadow-sm dark:border-slate-700 dark:bg-slate-900">
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
                  <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900">
                    <div className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Notifications</div>
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
