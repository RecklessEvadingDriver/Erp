import { createContext, useEffect, useMemo, useState } from 'react';

export const AppContext = createContext(null);

const roles = ['super-admin', 'admin', 'teacher', 'student', 'parent', 'accountant'];

export default function AppProvider({ children }) {
  const [role, setRole] = useState(localStorage.getItem('erp_role') || 'admin');
  const [theme, setTheme] = useState(localStorage.getItem('erp_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('erp_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('erp_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const value = useMemo(() => ({ role, setRole, roles, theme, setTheme }), [role, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
