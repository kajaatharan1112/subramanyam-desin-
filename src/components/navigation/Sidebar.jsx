import { LayoutDashboard, Users, FileText, Package, BarChart3, Settings } from "lucide-react"
import { VIEWS } from "../../constants/routes.js"
import { cn } from "../../utils/cn.js"

const ICONS = {
  grid: LayoutDashboard,
  users: Users,
  'file-text': FileText,
  package: Package,
  'bar-chart': BarChart3,
  settings: Settings,
}

const ADMIN_NAV = [
  { view: VIEWS.ADMIN_DASHBOARD, label: 'Dashboard', icon: 'grid' },
  { view: VIEWS.CUSTOMER_LIST, label: 'Customers', icon: 'users' },
  { view: VIEWS.BILL_LIST, label: 'Bills', icon: 'file-text' },
  { view: VIEWS.SETTINGS, label: 'Settings', icon: 'settings' },
]

const CUSTOMER_NAV = [
  { view: VIEWS.CUST_DASHBOARD, label: 'Dashboard', icon: 'grid' },
  { view: VIEWS.CUST_BILLS, label: 'My Bills', icon: 'file-text' },
]

export default function Sidebar({ currentView, onNavigate, role, onRoleSwitch, sidebarOpen }) {
  const navItems = role === 'admin' ? ADMIN_NAV : CUSTOMER_NAV

  return (
    <>
      {/* ── DESKTOP: Icon rail only (with labels below icons) ── */}
      <aside className="hidden md:flex fixed inset-y-0 left-0 z-50 w-[72px] flex-col items-center bg-[var(--color-neo-text-primary)] py-4">

        {/* Logo */}
        <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-white shadow-lg">
          <Package size={18} />
        </div>

        {/* Nav items — icon + tiny label */}
        <nav className="flex flex-1 flex-col items-center gap-1 w-full px-2">
          {navItems.map((item) => {
            const Icon = ICONS[item.icon]
            const isActive = currentView === item.view
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={cn(
                  "flex w-full flex-col items-center gap-0.5 rounded-xl py-2.5 px-1 transition-all duration-200",
                  isActive
                    ? "bg-white/15 text-white"
                    : "text-white/45 hover:bg-white/10 hover:text-white/80"
                )}
              >
                <Icon size={18} />
                <span className="text-[9px] font-semibold leading-none tracking-wide">
                  {item.label === 'Dashboard' ? 'Home' : item.label}
                </span>
              </button>
            )
          })}
        </nav>

        {/* Bottom avatar */}
        <div className="mt-auto flex flex-col items-center gap-0.5">
          <button
            type="button"
            title={`Switch to ${role === 'admin' ? 'Customer' : 'Admin'}`}
            onClick={onRoleSwitch}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-[10px] font-bold text-white shadow-sm hover:opacity-80 transition-opacity"
          >
            {role === 'admin' ? 'AD' : 'AK'}
          </button>
          <span className="text-[8px] font-semibold text-white/40 tracking-wide">
            {role === 'admin' ? 'Admin' : 'User'}
          </span>
        </div>
      </aside>

      {/* ── MOBILE: Slide-over drawer ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[var(--color-neo-bg)] transition-transform duration-300 md:hidden shadow-[var(--shadow-neo-floating)] border-r border-white/50",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-[var(--color-neo-secondary)]/10 px-5 py-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-white shadow-[var(--shadow-neo-soft)]">
            <Package size={18} />
          </div>
          <h3 className="text-base font-bold text-[var(--color-neo-text-primary)]">Billing System</h3>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 p-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = ICONS[item.icon]
            const isActive = currentView === item.view
            return (
              <button
                key={item.view}
                type="button"
                onClick={() => onNavigate(item.view)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[var(--color-neo-primary)]/10 text-[var(--color-neo-primary)]"
                    : "text-[var(--color-neo-text-secondary)] hover:bg-[var(--color-neo-surface)] hover:text-[var(--color-neo-text-primary)]"
                )}
              >
                <Icon size={16} className={isActive ? "text-[var(--color-neo-primary)]" : "opacity-60"} />
                {item.label}
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-[var(--color-neo-secondary)]/10 p-3 space-y-2">
          <button
            type="button"
            onClick={onRoleSwitch}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2 text-xs font-medium text-[var(--color-neo-text-secondary)] shadow-[var(--shadow-neo-soft)] transition-all hover:text-[var(--color-neo-primary)]"
          >
            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.12-11.23M2.5 22v-6h6M21.87 8.43a9 9 0 1 0-3.12 11.23"/>
            </svg>
            Switch to {role === 'admin' ? 'Customer' : 'Admin'}
          </button>

          <div className="flex items-center gap-3 rounded-xl bg-[var(--color-neo-surface)] p-3 shadow-[var(--shadow-neo-pressed)]">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-[10px] font-bold text-white">
              {role === 'admin' ? 'AD' : 'AK'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-semibold text-[var(--color-neo-text-primary)]">
                {role === 'admin' ? 'Admin User' : 'Arun Kumar'}
              </div>
              <div className="text-[10px] uppercase tracking-wider text-[var(--color-neo-text-secondary)]">{role}</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
