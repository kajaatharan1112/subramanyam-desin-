import { Bell, Menu, LogOut } from "lucide-react"

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

export default function TopBar({ currentView, onToggleSidebar, onLogout }) {
  const title = VIEW_TITLES[currentView] || 'Dashboard'

  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[64px] items-center justify-between border-b border-[var(--color-neo-secondary)]/10 bg-[var(--color-neo-bg)] px-5 md:left-[260px]">

      {/* Left – hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-neo-text-secondary)] transition-colors hover:bg-[var(--color-neo-surface)] hover:text-[var(--color-neo-text-primary)] md:hidden"
        >
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-base font-bold tracking-tight text-[var(--color-neo-text-primary)]">
            {title}
          </h2>
        </div>
      </div>

      {/* Right – notifications + avatar + logout */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-neo-text-secondary)] transition-colors hover:bg-[var(--color-neo-surface)] hover:text-[var(--color-neo-text-primary)]"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-neo-danger)] ring-[1.5px] ring-[var(--color-neo-bg)]" />
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-6 w-px bg-[var(--color-neo-secondary)]/20 md:block" />

        {/* User avatar + logout (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-[10px] font-bold text-white shadow-sm">
            AD
          </div>
          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-neo-text-secondary)] transition-colors hover:bg-[var(--color-neo-surface)] hover:text-[var(--color-neo-danger)]"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  )
}
