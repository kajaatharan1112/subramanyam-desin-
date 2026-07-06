import { Bell, LogOut } from "lucide-react"

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
    <header className="fixed left-0 right-0 top-0 z-40 flex h-[64px] items-center justify-between border-b border-white/10 bg-[var(--color-neo-text-primary)] px-5 md:left-[72px] shadow-sm">

      {/* Left – page title */}
      <div className="flex items-center">
        <h2 className="text-base font-bold tracking-tight text-white">
          {title}
        </h2>
      </div>

      {/* Right – notifications + avatar + logout */}
      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-neo-danger)] ring-[1.5px] ring-[var(--color-neo-text-primary)]" />
        </button>

        {/* Divider */}
        <div className="mx-1 hidden h-6 w-px bg-white/20 md:block" />

        {/* User logout (desktop) */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={onLogout}
            title="Logout"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-[var(--color-neo-danger)]"
          >
            <LogOut size={17} />
          </button>
        </div>
      </div>
    </header>
  )
}
