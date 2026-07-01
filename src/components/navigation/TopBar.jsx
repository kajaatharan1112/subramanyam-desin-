import { Search, Bell, Menu, LogOut } from "lucide-react"

const VIEW_TITLES = {
  admin_dashboard: 'Dashboard',
  customer_list: 'Customers',
  customer_detail: 'Customer Detail',
  bill_list: 'Bills',
  bill_create: 'Create Bill',
  bill_detail: 'Bill Detail',
  order_tracking: 'Order Tracking',
  reports: 'Reports',
  settings: 'Settings',
  cust_dashboard: 'My Dashboard',
  cust_bills: 'My Bills',
  cust_order_status: 'Order Status',
}

export default function TopBar({ currentView, onToggleSidebar, onLogout, onSearch }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[72px] items-center justify-between bg-[var(--color-neo-bg)]/80 px-6 backdrop-blur-xl md:left-[260px]">
      <div className="flex items-center gap-4">

        <h2 className="text-xl font-bold tracking-tight text-[var(--color-neo-text-primary)]">
          {VIEW_TITLES[currentView] || 'Dashboard'}
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neo-text-secondary)]" size={18} />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="h-11 w-72 rounded-[var(--radius-neo-pill)] bg-[var(--color-neo-surface)] pl-11 pr-4 text-sm text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-pressed)] outline-none transition-all placeholder:text-[var(--color-neo-text-secondary)] focus:ring-2 focus:ring-[var(--color-neo-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-neo-bg)]"
          />
        </div>

        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-[var(--radius-neo-md)] bg-[var(--color-neo-surface)] text-[var(--color-neo-text-secondary)] shadow-[var(--shadow-neo-soft)] transition-all hover:text-[var(--color-neo-text-primary)] active:shadow-[var(--shadow-neo-pressed)]"
        >
          <Bell size={20} />
          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[var(--color-neo-danger)] ring-2 ring-[var(--color-neo-surface)]" />
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="hidden md:flex h-11 w-11 items-center justify-center rounded-[var(--radius-neo-md)] bg-[var(--color-neo-surface)] text-[var(--color-neo-text-secondary)] shadow-[var(--shadow-neo-soft)] transition-all hover:text-[var(--color-neo-danger)] active:shadow-[var(--shadow-neo-pressed)]"
        >
          <LogOut size={20} />
        </button>
      </div>
    </header>
  )
}
