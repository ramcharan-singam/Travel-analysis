import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sun, Moon, Contrast, ShieldCheck, User as UserIcon, LogOut,
  LayoutDashboard, Users, Database, FileText, TrendingUp, BarChart3, Bot
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'employees', label: 'Employees', icon: Users },
  { id: 'pipeline', label: 'Pipeline', icon: Database },
  { id: 'reports', label: 'Reports', icon: FileText },
  { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
  { id: 'powerbi', label: 'PowerBI', icon: BarChart3 },
  { id: 'assistant', label: 'Assistant', icon: Bot },
];

export const Navbar = ({ activeTab, setActiveTab }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const isManager = user?.role === 'manager';

  const getThemeTitle = () => {
    if (theme === 'light') return 'Switch to Dark Mode';
    if (theme === 'dark') return 'Switch to High Contrast Mode';
    return 'Switch to Light Mode';
  };

  return (
    <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between transition-colors duration-200 shrink-0">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
          C
        </div>
        <div className="hidden sm:block">
          <h1 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">Corporate Travel</h1>
          <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">Travel Intelligence</p>
        </div>
      </div>

      {/* Top Navigation Links (Normal Website Header) */}
      {isManager && setActiveTab && (
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      )}

      {/* Right User Controls & Theme Switcher */}
      <div className="flex items-center gap-3">
        {/* 3-Way Theme Switcher (Light / Dark / High Contrast) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all flex items-center gap-1"
          title={getThemeTitle()}
        >
          {theme === 'light' && <Moon className="w-4 h-4" />}
          {theme === 'dark' && <Contrast className="w-4 h-4 text-yellow-400" />}
          {theme === 'contrast' && <Sun className="w-4 h-4 text-amber-400 animate-pulse" />}
          <span className="text-[10px] font-bold uppercase hidden xl:inline">
            {theme === 'light' ? 'Light' : theme === 'dark' ? 'Dark' : 'High Contrast'}
          </span>
        </button>

        {/* User Profile Info & Role Badge */}
        {user && (
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
            <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
              {isManager ? 'M' : user.name ? user.name.charAt(0) : 'E'}
            </div>
            <div className="text-left hidden md:block">
              <div className="text-xs font-semibold text-slate-800 dark:text-white leading-tight">
                {isManager ? 'Manager' : user.name}
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-all ml-1"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
