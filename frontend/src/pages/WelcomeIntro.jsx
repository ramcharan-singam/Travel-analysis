import React, { useEffect, useRef, useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  FileText, 
  TrendingUp, 
  BarChart3, 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Download,
  LogIn,
  ShieldCheck,
  CheckCircle2,
  Cpu
} from 'lucide-react';

const services = [
  {
    id: 'dashboard',
    number: '01',
    title: 'Executive Overview Dashboard',
    subtitle: 'Real-time visibility into global travel spend, ticket volume, country distribution, policy compliance, and approval workflows.',
    icon: LayoutDashboard,
    accent: 'from-blue-600 to-indigo-600',
    borderGlow: 'hover:border-blue-500/40 hover:shadow-blue-500/5',
    highlights: [
      'Multi-Slicer Quarter & Division Filtering',
      'Real-Time Policy Exception Alerts',
      'Dynamic INR Currency Normalization'
    ],
    functionality: [
      'Filters time-series charts and metrics dynamically across Quarters (All Quarters 2026) and Business Divisions (Global Technology, Finance, Operations, Sales).',
      'Tracks Filtered Spend (₹1,01,61,020), Travel Bookings (250 / 158 Flown Trips), Cross-Border Trips (85), and Pending Manager Approvals (0 Claims).',
      'Renders BI Tile 1 (Travel Volume & Spend Timeline Curve with Month Tooltips) and BI Tile 2 (Spend by Business Division Bar Chart) with dynamic metric switching.'
    ]
  },
  {
    id: 'employees',
    number: '02',
    title: 'Employee Directory & Allowance Tracking',
    subtitle: 'Governed workforce intelligence powered by SCD Type-2 temporal tracking. Track department transfers, annual allowances, role shifts, and budget burn rates.',
    icon: Users,
    accent: 'from-emerald-600 to-teal-600',
    borderGlow: 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
    highlights: [
      'SCD Type-2 Point-in-Time History',
      'Annual Allowance Utilization Tracking',
      'Role-Aware Data Isolation & Governance'
    ],
    functionality: [
      'Implements Slowly Changing Dimension (SCD) Type-2 temporal joins on employee_master matching ticket travel_date.',
      'Tracks employee historical role transfers, department shifts, and annual travel allowance utilization burn bars.',
      'Enforces strict data isolation preventing employees from viewing company-wide budgets while allowing full manager oversight.'
    ]
  },
  {
    id: 'pipeline',
    number: '03',
    title: 'Governed ETL & Lineage Pipeline',
    subtitle: 'Production-grade data ingestion engine featuring SHA-256 idempotency checks, automated ISO-8601 date cleansing, multi-currency exchange rate lookup, and quarantine handling.',
    icon: Database,
    accent: 'from-purple-600 to-violet-600',
    borderGlow: 'hover:border-purple-500/40 hover:shadow-purple-500/5',
    highlights: [
      'SHA-256 Idempotency Verification',
      'Auditable Multi-Currency Conversion (USD, GBP, EUR)',
      'Quarantine Isolation for Invalid Dates'
    ],
    functionality: [
      'Executes 4-stage pipeline: (1) Staging CSV Ingestion with microsecond batch ID & SHA-256 payload hash calculation.',
      'Standardizes travel/issue dates to ISO-8601 YYYY-MM-DD and converts foreign currencies against auditable FXRate table.',
      'Deduplicates bookings via SHA-256 record_hash, flags revised tickets, and publishes enriched rows to governed view vw_travel.'
    ]
  },
  {
    id: 'reports',
    number: '04',
    title: 'C-Suite Briefing & Export Engine',
    subtitle: 'Generate publication-ready C-Suite executive briefing HTML documents, complete audit trail logs, and formatted data exports with a single click.',
    icon: FileText,
    accent: 'from-amber-600 to-orange-600',
    borderGlow: 'hover:border-amber-500/40 hover:shadow-amber-500/5',
    highlights: [
      'Automated C-Suite Executive Briefing Generator',
      '100% Test Suite Verification Seal (38/38 Tests)',
      'Power BI Template (.pbit) Export'
    ]
  ,
    functionality: [
      'Compiles executive summary HTML reports featuring corporate spend totals, policy compliance metrics, and route rankings.',
      'Integrates automated test suite validation checks (38/38 passed, 100% pass rate) verifying pipeline governance.',
      'Generates pre-configured Power BI templates (.pbit) and raw CSV exports for external enterprise auditing.'
    ]
  },
  {
    id: 'forecasting',
    number: '05',
    title: 'Predictive Travel Spend Forecasting',
    subtitle: 'Forward-looking predictive analytics utilizing historical travel spend trends to project Q3/Q4 budgets, confidence interval envelopes, and growth scenario impact simulations.',
    icon: TrendingUp,
    accent: 'from-cyan-600 to-blue-600',
    borderGlow: 'hover:border-cyan-500/40 hover:shadow-cyan-500/5',
    highlights: [
      'Quarterly Spend Growth Modeling (+5% to +20%)',
      '95% Statistical Confidence Intervals',
      'Scenario-Based Policy Cap Adjustment'
    ],
    functionality: [
      'Utilizes historical monthly spend trajectory to project Q3 and Q4 corporate travel budget commitments.',
      'Computes 95% statistical confidence interval bounds providing lower and upper budget risk envelopes.',
      'Provides interactive scenario sliders to simulate policy adjustment impacts (+5%, +10%, +20%) on future quarterly spend.'
    ]
  },
  {
    id: 'powerbi',
    number: '06',
    title: 'Power BI Governed Analytical View',
    subtitle: 'Direct database integration exposing 36 standardized columns through governed analytical view vw_travel. Includes 13 production-grade DAX measures for Power BI Desktop.',
    icon: BarChart3,
    accent: 'from-rose-600 to-pink-600',
    borderGlow: 'hover:border-rose-500/40 hover:shadow-rose-500/5',
    highlights: [
      'Governed View vw_travel (36 Columns)',
      '13 Pre-Calculated DAX Measures Catalog',
      'Zero Schema Discrepancy DirectQuery Support'
    ],
    functionality: [
      'Exposes SQLite / PostgreSQL analytical database view vw_travel across 36 standardized enterprise columns.',
      'Includes 13 pre-calculated production DAX measures (Total Spend INR, Completed Travel Tickets, Cross-Border Spend %).',
      'Provides seamless DirectQuery connectivity to Power BI Desktop with zero schema discrepancy or manual data reshaping.'
    ]
  },
  {
    id: 'assistant',
    number: '07',
    title: 'Corporate AI Travel Assistant',
    subtitle: 'Enterprise AI assistant trained on corporate travel datasets. Perform natural language queries, explore route spend breakdowns, and submit policy dispute complaints automatically.',
    icon: Bot,
    accent: 'from-indigo-600 to-blue-700',
    borderGlow: 'hover:border-indigo-500/40 hover:shadow-indigo-500/5',
    highlights: [
      'Natural Language Travel Data Queries',
      'Strict Role-Aware Data Access Control',
      'Automated Policy Dispute Complaint Engine'
    ],
    functionality: [
      'Processes natural language user questions using corporate domain intelligence (e.g. top cross-border routes, spend totals).',
      'Enforces JWT role-aware scoping: employees view personal travel data, managers access company-wide intelligence.',
      'Automates policy dispute registration, logging employee fare exception complaints into the audit database.'
    ]
  }
];

export const WelcomeIntro = ({ setActiveTab, onOpenAuth, isPublic = false }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observers = [];
    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSectionIndex(index);
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  const handleAction = (secId) => {
    if (isPublic && onOpenAuth) {
      onOpenAuth();
    } else if (setActiveTab) {
      setActiveTab(secId);
    }
  };

  return (
    <div className="relative h-full w-full overflow-y-auto scroll-smooth bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 selection:bg-blue-500 selection:text-white">
      {/* Animated Ambient Background Backdrop */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating Animated Gradient Orbs */}
        <div className="absolute -top-32 -left-32 w-[450px] h-[450px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 via-blue-500/15 to-cyan-500/10 rounded-full blur-3xl animate-pulse duration-1000" />
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-gradient-to-tl from-purple-500/20 via-pink-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse duration-700" />
        
        {/* Subtle Tech Radial Dot Grid Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-30" />
      </div>

      {/* Optional Top Right Auth Button if Public */}
      {onOpenAuth && (
        <div className="absolute top-4 right-4 z-40">
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md transform hover:scale-105"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In / Sign Up</span>
          </button>
        </div>
      )}

      {/* Hero Welcome Header */}
      <div className="pt-8 pb-4 text-center max-w-4xl mx-auto px-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold uppercase tracking-widest border border-blue-200 dark:border-blue-800 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
          <span>Platform Services</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Corporate Travel & <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">Expense Intelligence</span> Platform
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-normal font-medium">
          Explore our end-to-end governed data pipeline, predictive analytics, enterprise reporting, and AI intelligence suite below.
        </p>
      </div>

      {/* 7 Services in Exact Order - Wide Full-Width Desktop Layout */}
      {services.map((sec, idx) => {
        const Icon = sec.icon;
        const isActive = activeSectionIndex === idx;
        const isLast = idx === services.length - 1;

        return (
          <section
            key={sec.id}
            ref={el => sectionRefs.current[idx] = el}
            className="py-6 px-6 sm:px-10 max-w-6xl w-full mx-auto flex flex-col justify-center items-center relative border-b border-slate-200/50 dark:border-slate-800/50 last:border-0"
          >
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${sec.accent} opacity-5 dark:opacity-10 blur-xl pointer-events-none rounded-full transform scale-75 -z-10`} />

            <div className="w-full flex flex-col items-center text-center space-y-3">
              {/* Attractive Title with Gradient Accent & Icon Badge */}
              <div className="w-full max-w-3xl space-y-1.5">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-800 dark:from-white dark:via-blue-100 dark:to-slate-200 bg-clip-text text-transparent">
                    {sec.title}
                  </span>
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-normal font-medium">
                  {sec.subtitle}
                </p>
              </div>

              {/* Service Capabilities Highlight Tags */}
              <div className="flex flex-wrap justify-center gap-1.5 w-full max-w-3xl">
                {sec.highlights.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-700 dark:text-slate-200 shadow-2xs">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </span>
                ))}
              </div>

              {/* Visual Component Preview Card - Full Container Width */}
              <div className={`w-full max-w-5xl bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-md overflow-hidden backdrop-blur-md transition-all duration-200 ${isActive ? 'ring-1 ring-blue-500/20' : ''} ${sec.borderGlow}`}>
                {/* Mock Card Header Bar */}
                <div className="px-3.5 py-1.5 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-[10px] font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                      <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="font-mono text-[9px] text-slate-400 dark:text-slate-500 ml-1">travel_analytics / {sec.id}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold uppercase tracking-wider text-[8px] flex items-center gap-1">
                    <ShieldCheck className="w-2.5 h-2.5" /> Governed View Active
                  </span>
                </div>

                {/* Section Specific Visual Feature Showcase */}
                <div className="p-3.5 sm:p-4">
                  {sec.id === 'dashboard' && (
                    <div className="space-y-3 text-left">
                      {/* Executive Command Center Header & Slicers Bar */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-slate-200 dark:border-slate-700 gap-2">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Executive Command Center</h3>
                          <p className="text-[9px] text-slate-500">Filter time-series charts and metrics dynamically across Quarters & Business Divisions</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-slate-700/60 border border-blue-200 dark:border-slate-600 text-[9px] font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1">
                            Quarter: <span className="font-semibold">All Quarters 2026 ⌄</span>
                          </span>
                          <span className="px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-slate-700/60 border border-purple-200 dark:border-slate-600 text-[9px] font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
                            Division: <span className="font-semibold">All Business Divisions ⌄</span>
                          </span>
                        </div>
                      </div>

                      {/* Top 4 Metric Cards Grid matching exact screenshot values */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">FILTERED SPEND</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">₹1,01,61,020</p>
                          <span className="text-[8px] text-slate-400 font-bold block mt-0.5">ALL • ALL</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">TRAVEL BOOKINGS</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">250</p>
                          <span className="text-[8px] text-emerald-600 font-bold block mt-0.5">158 Flown Trips</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          <p className="text-[9px] font-bold uppercase text-slate-400 tracking-wider">CROSS-BORDER TRIPS</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">85</p>
                          <span className="text-[8px] text-purple-600 font-bold block mt-0.5">91 Domestic Trips</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          <p className="text-[9px] font-bold uppercase text-amber-600 dark:text-amber-400 tracking-wider">PENDING APPROVALS</p>
                          <p className="text-sm font-black text-amber-600 dark:text-amber-400 mt-0.5">0 Claims</p>
                          <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Real-time Action Desk</span>
                        </div>
                      </div>

                      {/* Bottom 2 BI Tiles Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* BI Tile 1: Travel Volume & Spend Timeline */}
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-800 dark:text-white">
                            <span>BI Tile 1: Travel Volume & Spend Timeline</span>
                            <span className="text-[8px] text-blue-600 border border-blue-200 rounded px-1.5 py-0.5">Spend Amount (INR ₹) ⌄</span>
                          </div>
                          <div className="relative h-24 w-full pt-2">
                            {/* Line / Area Curve Representation */}
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80">
                              <defs>
                                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                                </linearGradient>
                              </defs>
                              <path d="M 0 50 Q 30 20 60 10 Q 90 25 120 55 Q 150 40 180 60 Q 210 50 240 55 Q 270 70 300 65 L 300 80 L 0 80 Z" fill="url(#blueGrad)" />
                              <path d="M 0 50 Q 30 20 60 10 Q 90 25 120 55 Q 150 40 180 60 Q 210 50 240 55 Q 270 70 300 65" fill="none" stroke="#2563eb" strokeWidth="2" />
                              {/* Tooltip Point at 2026-08 */}
                              <circle cx="180" cy="60" r="3" fill="#2563eb" />
                              <rect x="140" y="20" width="90" height="28" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" className="shadow-xs" />
                              <text x="145" y="32" fontSize="7" fill="#475569" fontWeight="bold">2026-08</text>
                              <text x="145" y="42" fontSize="7" fill="#2563eb" fontWeight="bold">Spend (INR): 427850</text>
                            </svg>
                          </div>
                        </div>

                        {/* BI Tile 2: Spend by Business Division */}
                        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-bold text-slate-800 dark:text-white">
                            <span>BI Tile 2: Spend by Business Division</span>
                            <span className="text-[8px] text-emerald-600 border border-emerald-200 rounded px-1.5 py-0.5">Total Spend (INR ₹) ⌄</span>
                          </div>
                          <div className="flex items-end justify-between gap-1.5 h-24 pt-3 pb-1 px-1">
                            {/* Green Division Bars matching screenshot */}
                            {[
                              { label: 'Executive', height: '25%' },
                              { label: 'Global Tech', height: '55%' },
                              { label: 'Global Tech', height: '100%' },
                              { label: 'HR', height: '55%' },
                              { label: 'Operations', height: '50%' },
                              { label: 'Risk', height: '40%' },
                              { label: 'Sales', height: '70%' }
                            ].map((b, i) => (
                              <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                                <div className="w-full bg-emerald-500 rounded-t-xs hover:bg-emerald-600 transition-all" style={{ height: b.height }} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {sec.id === 'employees' && (
                    <div className="space-y-3 text-left">
                      {/* Header & Title */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-slate-200 dark:border-slate-700 gap-2">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Corporate Employee Directory & Dataset Manager</h3>
                          <p className="text-[9px] text-slate-500">Manage Verified Corporate Employees, Income Allowances & Governed Data Quality Rules</p>
                        </div>
                        <button className="px-2.5 py-1 rounded-lg bg-blue-600 text-white text-[9px] font-bold flex items-center gap-1 shadow-2xs">
                          + Add Employee / Import CSV
                        </button>
                      </div>

                      {/* Top 3 KPI Summary Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-2xs">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">TOTAL CORPORATE HEADCOUNT</p>
                            <p className="text-xs font-black text-slate-900 dark:text-white mt-0.5">100 Employees</p>
                            <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Active Master Records</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center text-xs">👥</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-2xs">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">STANDARD ALLOCATED BUDGET</p>
                            <p className="text-xs font-black text-emerald-600 dark:text-emerald-400 mt-0.5">95 Profiles</p>
                            <span className="text-[8px] text-emerald-600 font-bold block mt-0.5">100% Validated Allowances</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center text-xs">✓</div>
                        </div>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-2xs">
                          <div>
                            <p className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">UNALLOCATED / NULL RECORDS</p>
                            <p className="text-xs font-black text-amber-600 dark:text-amber-400 mt-0.5">5 Records</p>
                            <span className="text-[8px] text-amber-600 font-bold block mt-0.5">Graceful Null-Safety Handled</span>
                          </div>
                          <div className="w-6 h-6 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center text-xs">🛡️</div>
                        </div>
                      </div>

                      {/* Search Bar & Filter Tabs */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1">
                        <div className="w-full sm:w-64 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-[9px] text-slate-400 flex items-center gap-1.5">
                          🔍 <span>Search by Employee Name, ID, Business Unit...</span>
                        </div>
                        <div className="flex items-center gap-1 text-[9px] font-bold">
                          <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">All Employees (100)</span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Allocated (95)</span>
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Null Allowance Audit (5)</span>
                        </div>
                      </div>

                      {/* Table Preview */}
                      <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <table className="w-full text-left text-[9px]">
                          <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-bold tracking-wider">
                            <tr>
                              <th className="p-2">Employee ID & Name</th>
                              <th className="p-2">Division & Dept</th>
                              <th className="p-2">Designation & Location</th>
                              <th className="p-2 text-right">Quarterly Allowance</th>
                              <th className="p-2 text-right">Flown Spend (INR)</th>
                              <th className="p-2 text-center">Flown Trips</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50 font-medium">
                            <tr>
                              <td className="p-2">
                                <span className="font-bold text-slate-900 dark:text-white block">Rajesh Sharma</span>
                                <span className="text-[8px] text-blue-600 font-mono">EMP-1001</span>
                              </td>
                              <td className="p-2">
                                <span className="text-slate-800 dark:text-slate-200 block font-semibold">Global Technology</span>
                                <span className="text-[8px] text-slate-400">Software Engineering</span>
                              </td>
                              <td className="p-2">
                                <span className="text-slate-800 dark:text-slate-200 block">Senior Principal Engineer</span>
                                <span className="text-[8px] text-slate-400">Bengaluru</span>
                              </td>
                              <td className="p-2 text-right font-bold text-slate-900 dark:text-white">₹2,50,000</td>
                              <td className="p-2 text-right font-bold text-slate-900 dark:text-white">₹1,63,000</td>
                              <td className="p-2 text-center font-bold text-blue-600">3 Trips</td>
                            </tr>
                            <tr>
                              <td className="p-2">
                                <span className="font-bold text-slate-900 dark:text-white block">Priya Nair</span>
                                <span className="text-[8px] text-blue-600 font-mono">EMP-1002</span>
                              </td>
                              <td className="p-2">
                                <span className="text-slate-800 dark:text-slate-200 block font-semibold">Finance & Actuarial</span>
                                <span className="text-[8px] text-slate-400">Financial Planning</span>
                              </td>
                              <td className="p-2">
                                <span className="text-slate-800 dark:text-slate-200 block">Lead Financial Analyst</span>
                                <span className="text-[8px] text-slate-400">Mumbai</span>
                              </td>
                              <td className="p-2 text-right font-bold text-slate-900 dark:text-white">₹1,80,000</td>
                              <td className="p-2 text-right font-bold text-slate-900 dark:text-white">₹79,840</td>
                              <td className="p-2 text-center font-bold text-blue-600">3 Trips</td>
                            </tr>
                            <tr>
                              <td className="p-2">
                                <span className="font-bold text-slate-900 dark:text-white block">Ananya Verma</span>
                                <span className="text-[8px] text-blue-600 font-mono">EMP-1003</span>
                              </td>
                              <td className="p-2">
                                <span className="text-slate-800 dark:text-slate-200 block font-semibold">Global Technology</span>
                                <span className="text-[8px] text-slate-400">Data & AI</span>
                              </td>
                              <td className="p-2">
                                <span className="text-slate-800 dark:text-slate-200 block">Lead Data Engineer</span>
                                <span className="text-[8px] text-slate-400">Hyderabad</span>
                              </td>
                              <td className="p-2 text-right font-bold text-slate-900 dark:text-white">₹2,00,000</td>
                              <td className="p-2 text-right font-bold text-slate-900 dark:text-white">₹3,41,250</td>
                              <td className="p-2 text-center font-bold text-blue-600">4 Trips</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {sec.id === 'pipeline' && (
                    <div className="space-y-3 text-left">
                      {/* Top Grid: Continuous Ingestion & Exemption Link */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {/* Card 1: Continuous Ingestion */}
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                            <Database className="w-3.5 h-3.5 text-blue-600" />
                            <span>Continuous Ingestion & Governed Pipeline</span>
                          </div>
                          <p className="text-[9px] text-slate-500">Upload New Vendor/Partner Ticketing CSV Dataset:</p>
                          <div className="flex items-center gap-2 text-[9px] p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-medium">Choose File</span>
                            <span className="text-slate-400">No file chosen</span>
                          </div>
                          <button className="w-full py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-400 text-[9px] font-bold cursor-not-allowed">
                            ↑ Run Pipeline on Chosen File
                          </button>
                        </div>

                        {/* Card 2: Manager & Employee Policy Exemption Link */}
                        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                          <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-white">
                            <span className="text-purple-600">🔗</span>
                            <span>Manager & Employee Policy Exemption Link</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                            <div>
                              <span className="text-slate-400 block text-[8px]">Target Ticket ID</span>
                              <span className="p-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 block font-mono font-bold">TCK-8012</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block text-[8px]">Linked Employee ID</span>
                              <span className="p-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 block font-mono font-bold">EMP-1002</span>
                            </div>
                          </div>
                          <div className="text-[9px]">
                            <span className="text-slate-400 block text-[8px]">Official Policy Exemption Reason</span>
                            <span className="p-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 block text-[8px] truncate">
                              Manager approved Business Class upgrade for international tech symposium
                            </span>
                          </div>
                          <button className="w-full py-1 rounded bg-purple-600 text-white text-[9px] font-bold shadow-2xs">
                            💾 Link Exemption & Publish to Employee Portal
                          </button>
                        </div>
                      </div>

                      {/* Middle Card: Bad-Record Quarantine Isolation Desk */}
                      <div className="p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-center justify-between text-[10px]">
                        <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold">
                          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>Zero bad records quarantined. 100% of vendor records passed schema constraint validations.</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold text-[9px]">
                          0 Quarantined Records
                        </span>
                      </div>

                      {/* Bottom: Active Linked Exemptions Table */}
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200">Active Linked Manager & Employee Policy Exemptions</p>
                        <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                          <table className="w-full text-left text-[9px]">
                            <thead className="bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase font-bold tracking-wider">
                              <tr>
                                <th className="p-1.5">Ticket ID</th>
                                <th className="p-1.5">Employee ID & Name</th>
                                <th className="p-1.5">Manager Exemption Reason</th>
                                <th className="p-1.5">Status</th>
                                <th className="p-1.5">Published At</th>
                              </tr>
                            </thead>
                            <tbody className="font-medium">
                              <tr>
                                <td className="p-1.5 font-mono font-bold text-purple-600">TCK-8012</td>
                                <td className="p-1.5 font-bold">Priya Nair <span className="text-slate-400 font-mono text-[8px]">(EMP-1002)</span></td>
                                <td className="p-1.5 text-slate-600 dark:text-slate-300">Manager approved Business Class upgrade for international tech symposium</td>
                                <td className="p-1.5"><span className="px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[8px] font-bold">APPROVED & PUBLISHED TO VW_TRAVEL</span></td>
                                <td className="p-1.5 text-slate-400 font-mono text-[8px]">2026-08-31 21:25</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {sec.id === 'reports' && (
                    <div className="space-y-3 text-left">
                      {/* Card 1: Executive Briefing Desk */}
                      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-center space-y-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white">C-Suite Executive Briefing & Data Quality Desk</h3>
                          <p className="text-[9px] text-slate-500 mt-0.5">Export governed <code className="font-mono text-blue-600">vw_travel</code> reports or run live warehouse data health quality checks.</p>
                        </div>
                        <button className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold shadow-2xs inline-flex items-center gap-1.5">
                          <FileText className="w-3 h-3" />
                          <span>Open C-Suite Executive Briefing (HTML/PDF)</span>
                        </button>
                      </div>

                      {/* Card 2: Executive Data Exports */}
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                        <div>
                          <h4 className="text-[11px] font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                            <Database className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Executive Data Exports (CSV & PDF)</span>
                          </h4>
                          <p className="text-[9px] text-slate-500">Export filtered warehouse records from the governed SQL view <code className="font-mono text-emerald-600">vw_travel</code>:</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <div className="p-2.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-bold text-slate-900 dark:text-white">CSV Analytical Data Export (.csv)</p>
                              <p className="text-[8px] text-slate-500">Raw table dump for Python, SQL, and Analytics</p>
                            </div>
                            <button className="px-2.5 py-1 rounded bg-emerald-600 text-white text-[9px] font-bold shadow-2xs flex items-center gap-1">
                              <Download className="w-2.5 h-2.5" /> Download .CSV
                            </button>
                          </div>
                          <div className="p-2.5 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 flex items-center justify-between">
                            <div>
                              <p className="text-[10px] font-bold text-slate-900 dark:text-white">PDF C-Suite Briefing (.pdf)</p>
                              <p className="text-[8px] text-slate-500">Print-ready executive summary report</p>
                            </div>
                            <button className="px-2.5 py-1 rounded bg-purple-600 text-white text-[9px] font-bold shadow-2xs flex items-center gap-1">
                              <Download className="w-2.5 h-2.5" /> Export .PDF
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card 3: Governed Data Health Auditor */}
                      <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                        <div>
                          <h4 className="text-[10px] font-bold text-slate-900 dark:text-white flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                            <span>Governed Data Health Auditor</span>
                          </h4>
                          <p className="text-[8px] text-slate-500">Live data quality monitoring & automated cleansing</p>
                        </div>
                        <button className="px-3 py-1 rounded-lg bg-blue-600 text-white text-[9px] font-bold shadow-2xs flex items-center gap-1">
                          ⚡ Clean Data Records
                        </button>
                      </div>
                    </div>
                  )}

                  {sec.id === 'forecasting' && (
                    <div className="space-y-3 text-left">
                      {/* Header with Title & Slicers */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 border-b border-slate-200 dark:border-slate-700 gap-2">
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white">Predictive Travel Spend Forecasting</h3>
                          <p className="text-[9px] text-slate-500">Time-series regression model re-calculates dynamically based on date range and quarter selections</p>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-bold">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                            All Quarters (Q1-Q4 2026) ⌄
                          </span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                            01-01-2026 to 31-12-2026
                          </span>
                        </div>
                      </div>

                      {/* Top 3 KPI Forecast Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                          <p className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">FILTERED ACTUAL SPEND</p>
                          <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">₹1,01,33,182</p>
                          <span className="text-[8px] text-slate-400 font-bold block mt-0.5">Historical Ingested Base</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 shadow-2xs">
                          <p className="text-[8px] font-bold uppercase text-blue-600 dark:text-blue-400 tracking-wider">Q3 DYNAMIC FORECAST</p>
                          <p className="text-sm font-black text-blue-700 dark:text-blue-300 mt-0.5">₹1,13,49,163</p>
                          <span className="text-[8px] text-blue-600 font-bold block mt-0.5">Linear Trend (+12.0% QoQ)</span>
                        </div>
                        <div className="p-2.5 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 shadow-2xs">
                          <p className="text-[8px] font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Q4 DYNAMIC FORECAST</p>
                          <p className="text-sm font-black text-indigo-700 dark:text-indigo-300 mt-0.5">₹1,30,51,538</p>
                          <span className="text-[8px] text-indigo-600 font-bold block mt-0.5">Linear Trend (+15.0% QoQ)</span>
                        </div>
                      </div>

                      {/* Grouped Bar Chart Visual Representation */}
                      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 space-y-2">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-slate-800 dark:text-white">Projected Travel Expenses by Business Unit (ALL Dynamic View)</span>
                          <div className="flex items-center gap-2 text-[8px] font-semibold text-slate-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-slate-400 inline-block" /> H1 Actual</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-blue-600 inline-block" /> Q3 Projected</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-xs bg-indigo-600 inline-block" /> Q4 Projected</span>
                          </div>
                        </div>
                        <div className="h-28 flex items-end justify-between gap-2 pt-2 pb-1 border-b border-slate-200 dark:border-slate-700 px-2">
                          {[
                            { name: 'Global Tech', h1: '60%', q3: '75%', q4: '90%' },
                            { name: 'Finance', h1: '35%', q3: '42%', q4: '48%' },
                            { name: 'Ops & Risk', h1: '30%', q3: '36%', q4: '40%' },
                            { name: 'Executive', h1: '18%', q3: '20%', q4: '22%' },
                            { name: 'HR', h1: '32%', q3: '38%', q4: '44%' },
                            { name: 'Sales & Mktg', h1: '40%', q3: '48%', q4: '55%' },
                            { name: 'Legal', h1: '28%', q3: '32%', q4: '36%' },
                          ].map((unit, uIdx) => (
                            <div key={uIdx} className="flex-1 flex flex-col items-center gap-0.5 h-full justify-end">
                              <div className="flex items-end gap-0.5 w-full h-full justify-center">
                                <div className="w-1.5 bg-slate-400 rounded-t-xs" style={{ height: unit.h1 }} />
                                <div className="w-1.5 bg-blue-600 rounded-t-xs" style={{ height: unit.q3 }} />
                                <div className="w-1.5 bg-indigo-600 rounded-t-xs" style={{ height: unit.q4 }} />
                              </div>
                              <span className="text-[7px] text-slate-500 font-semibold truncate w-full text-center">{unit.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {sec.id === 'powerbi' && (
                    <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 border border-slate-800 space-y-3 text-left">
                      {/* Power BI Header */}
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                            PBI
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-white">Power BI Governed Analytical Query Engine</h3>
                            <p className="text-[8px] text-slate-400">Interactive live metric query builder bound to <code className="text-amber-400 font-mono">vw_travel</code></p>
                          </div>
                        </div>
                        <button className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[9px]">
                          Executive C-Suite Report (.PDF)
                        </button>
                      </div>

                      {/* Interactive Control Panel */}
                      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-[8px] font-bold text-slate-400 tracking-wider">
                          <span>⚙ INTERACTIVE POWER BI METRIC QUERY CONTROL PANEL</span>
                          <span className="text-emerald-400 font-mono">● Direct SQL View Linked</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px]">
                          <div>
                            <span className="text-[7px] text-slate-400 block uppercase font-bold">TARGET METRIC</span>
                            <span className="p-1 rounded bg-slate-900 border border-slate-800 text-amber-300 font-bold block truncate">Total Spend (INR ₹)</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-400 block uppercase font-bold">GROUP DIMENSION</span>
                            <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-medium block truncate">By Business Unit</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-400 block uppercase font-bold">DIVISION FILTER</span>
                            <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-medium block truncate">All Business Units</span>
                          </div>
                          <div>
                            <span className="text-[7px] text-slate-400 block uppercase font-bold">STATUS SLICER</span>
                            <span className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-200 font-medium block truncate">All Ticket Statuses</span>
                          </div>
                        </div>
                      </div>

                      {/* Dual Grid: Preview Bar Chart & Query Results */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                        {/* Chart */}
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                            <span>DYNAMIC BAR CHART PREVIEW</span>
                            <span className="font-mono text-[7px] text-slate-500">VW_TRAVEL AGGREGATE</span>
                          </div>
                          <div className="h-24 flex items-end justify-between gap-1.5 pt-2 pb-1 px-1">
                            {[
                              { label: 'Tech', height: '90%', color: 'bg-blue-500' },
                              { label: 'Finance', height: '35%', color: 'bg-emerald-500' },
                              { label: 'Ops', height: '55%', color: 'bg-amber-500' },
                              { label: 'Exec', height: '42%', color: 'bg-purple-500' },
                              { label: 'HR', height: '15%', color: 'bg-rose-500' },
                              { label: 'Sales', height: '65%', color: 'bg-cyan-500' },
                              { label: 'Legal', height: '25%', color: 'bg-slate-600' }
                            ].map((bar, bI) => (
                              <div key={bI} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                                <div className={`w-full ${bar.color} rounded-t-xs`} style={{ height: bar.height }} />
                                <span className="text-[7px] text-slate-400 truncate">{bar.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Query Results Table */}
                        <div className="p-2 rounded bg-slate-950 border border-slate-800 space-y-1">
                          <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold">
                            <span>LIVE GOVERNED QUERY RESULTS</span>
                            <span className="px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[8px]">Export CSV</span>
                          </div>
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-[8px]">
                              <thead className="border-b border-slate-800 text-slate-500 uppercase font-bold">
                                <tr>
                                  <th className="pb-1">Business Unit</th>
                                  <th className="pb-1 text-right">Total Spend (INR)</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-900 font-mono text-slate-300">
                                <tr>
                                  <td className="py-0.5 font-sans font-semibold text-slate-200">Global Technology</td>
                                  <td className="py-0.5 text-right font-bold text-amber-400">₹4,92,850</td>
                                </tr>
                                <tr>
                                  <td className="py-0.5 font-sans text-slate-300">Finance & Actuarial</td>
                                  <td className="py-0.5 text-right">₹1,40,860</td>
                                </tr>
                                <tr>
                                  <td className="py-0.5 font-sans text-slate-300">Operations & Risk</td>
                                  <td className="py-0.5 text-right">₹2,48,800</td>
                                </tr>
                                <tr>
                                  <td className="py-0.5 font-sans text-slate-300">Executive Leadership</td>
                                  <td className="py-0.5 text-right">₹1,88,200</td>
                                </tr>
                                <tr>
                                  <td className="py-0.5 font-sans text-slate-300">Sales & Marketing</td>
                                  <td className="py-0.5 text-right">₹3,20,500</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {sec.id === 'assistant' && (
                    <div className="space-y-3 text-left">
                      {/* Top Header Banner */}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shadow-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-600/80 border border-blue-400/40 text-white flex items-center justify-center shrink-0">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-xs font-bold text-white">Corporate AI Query & Support Desk</h3>
                            <p className="text-[8px] text-blue-200">Connected to live <code className="font-mono text-blue-300">vw_travel</code> warehouse database</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded bg-blue-950/80 border border-blue-800 text-[8px] font-mono text-blue-200 flex items-center gap-1">
                          ✉ Official Email: complaints@travelintelligence.com 📋
                        </span>
                      </div>

                      {/* Split Grid: AI Chat Assistant Desk & Register Compliance Complaint */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
                        {/* Left Column: Chat Assistant Desk (7 cols) */}
                        <div className="md:col-span-7 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col justify-between space-y-3 shadow-2xs">
                          <div className="flex items-start gap-2.5 pt-1">
                            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                              AI
                            </div>
                            <div className="p-2.5 rounded-2xl rounded-tl-none bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[10px] text-slate-700 dark:text-slate-200 leading-normal font-medium">
                              Hello! I am your Corporate Travel AI Assistant. Ask me anything about travel spend, employee expenses, department budgets, flight routes, or carpooling savings.
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 pt-2">
                            <div className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-[9px] text-slate-400">
                              Ask a question (e.g. What is total spend? Which department spent the most?)
                            </div>
                            <button className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[9px] font-bold flex items-center gap-1 shrink-0 shadow-2xs">
                              ✈ Send
                            </button>
                          </div>
                        </div>

                        {/* Right Column: Register Compliance Complaint (5 cols) */}
                        <div className="md:col-span-5 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2 shadow-2xs">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white pb-1 border-b border-slate-100 dark:border-slate-700">
                            <span className="text-rose-600">✉</span>
                            <span>Register Compliance Complaint</span>
                          </div>

                          <div className="space-y-1 text-[9px]">
                            <span className="text-slate-500 font-bold uppercase text-[7px] tracking-wider block">ISSUE SUBJECT</span>
                            <div className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400">
                              e.g., Booking Policy Variance
                            </div>
                          </div>

                          <div className="space-y-1 text-[9px]">
                            <span className="text-slate-500 font-bold uppercase text-[7px] tracking-wider block">COMPLAINT DETAILS</span>
                            <div className="p-1.5 rounded border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-400 h-10">
                              Describe your issue or policy complaint...
                            </div>
                          </div>

                          <button className="w-full py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[9px] shadow-2xs">
                            Submit Official Complaint
                          </button>

                          <p className="text-[7px] text-slate-400 text-center font-mono">
                            Official Support: complaints@travelintelligence.com
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Working Functionality & Execution Details */}
                  {sec.functionality && (
                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-slate-700/80 text-left bg-slate-50/70 dark:bg-slate-900/50 p-3 rounded-lg">
                      <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <Cpu className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>Working Functionality & Execution Flow</span>
                      </div>
                      <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                        {sec.functionality.map((item, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-1.5">
                            <span className="text-blue-500 font-bold shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Final CTA at the end of service 7 */}
              {isLast && isPublic && onOpenAuth && (
                <div className="pt-2">
                  <button
                    onClick={onOpenAuth}
                    className="px-5 py-2 rounded-lg bg-gradient-to-r from-blue-600 via-indigo-600 to-slate-900 text-white font-bold text-xs transition-all shadow-md hover:scale-105 flex items-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Ready to Get Started? Sign In or Sign Up Now</span>
                  </button>
                </div>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
};
