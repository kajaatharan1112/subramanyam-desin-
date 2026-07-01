import { LayoutDashboard, Users, FileText, Package, BarChart3, Settings } from "lucide-react"
import { VIEWS } from "../../constants/routes.js"
import { cn } from "../../utils/cn.js"

const ICONS = {
  grid: <LayoutDashboard size={20} />,
  users: <Users size={20} />,
  'file-text': <FileText size={20} />,
  package: <Package size={20} />,
  'bar-chart': <BarChart3 size={20} />,
  settings: <Settings size={20} />,
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
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-[var(--color-neo-bg)] transition-transform duration-300 md:translate-x-0 shadow-[var(--shadow-neo-floating)] border-r border-white/50",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Brand */}
      <div className="flex items-center gap-4 border-b border-[var(--color-neo-secondary)]/10 p-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-neo-md)] bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] font-bold text-white shadow-[var(--shadow-neo-soft)]">
          O
        </div>
        <div className="flex flex-col">
          <h3 className="bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] bg-clip-text text-lg font-bold text-transparent">
            ONEVO
          </h3>
          <span className="text-[10px] font-medium uppercase tracking-widest text-[var(--color-neo-text-secondary)]">
            Billing System
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {navItems.map((item) => {
          const isActive = currentView === item.view
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => onNavigate(item.view)}
              className={cn(
                "flex w-full items-center gap-3 rounded-[var(--radius-neo-md)] px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-[var(--color-neo-surface)] text-[var(--color-neo-primary)] shadow-[var(--shadow-neo-pressed)]"
                  : "text-[var(--color-neo-text-secondary)] hover:bg-[var(--color-neo-surface)] hover:text-[var(--color-neo-text-primary)] hover:shadow-[var(--shadow-neo-soft)]"
              )}
            >
              <div className={cn("transition-opacity", isActive ? "opacity-100" : "opacity-70")}>
                {ICONS[item.icon]}
              </div>
              {item.label}
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-[var(--color-neo-secondary)]/10 p-4">
        <button
          type="button"
          onClick={onRoleSwitch}
          className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-surface)] px-4 py-2 text-xs font-medium text-[var(--color-neo-text-secondary)] shadow-[var(--shadow-neo-soft)] transition-all hover:text-[var(--color-neo-primary)] hover:shadow-[var(--shadow-neo-floating)] active:shadow-[var(--shadow-neo-pressed)]"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21.5 2v6h-6M2.13 15.57a9 9 0 1 0 3.12-11.23M2.5 22v-6h6M21.87 8.43a9 9 0 1 0-3.12 11.23"/>
          </svg>
          Switch to {role === 'admin' ? 'Customer' : 'Admin'} View
        </button>
        
        <div className="mt-4 flex items-center gap-3 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-surface)] p-3 shadow-[var(--shadow-neo-inset)]">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-xs font-bold text-white shadow-sm">
            {role === 'admin' ? 'AD' : 'AK'}
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-[var(--color-neo-text-primary)]">
              {role === 'admin' ? 'Admin User' : 'Arun Kumar'}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-[var(--color-neo-text-secondary)]">
              {role}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
