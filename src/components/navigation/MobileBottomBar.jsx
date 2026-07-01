import "./MobileBottomBar.css"
import { LayoutDashboard, Users, FileText, Package, BarChart3, Settings } from "lucide-react"
import { ADMIN_NAV, CUSTOMER_NAV } from "../../constants/routes.js"
import { cn } from "../../utils/cn.js"

const ICONS = {
  grid: <LayoutDashboard size={22} />,
  users: <Users size={22} />,
  'file-text': <FileText size={22} />,
  package: <Package size={22} />,
  'bar-chart': <BarChart3 size={22} />,
  settings: <Settings size={22} />,
}

export default function MobileBottomBar({ currentView, onNavigate, role }) {
  const navItems = role === 'admin' ? ADMIN_NAV.slice(0, 5) : CUSTOMER_NAV

  return (
    <div className="mobile-bar">
      <nav className="mobile-bar__nav">
        {navItems.map((item) => {
          const isActive = currentView === item.view
          return (
            <button
              key={item.view}
              type="button"
              onClick={() => onNavigate(item.view)}
              className={cn(
                "mobile-bar__item",
                isActive && "mobile-bar__item--active"
              )}
            >
              <span className="mobile-bar__icon">{ICONS[item.icon]}</span>
              <span className="mobile-bar__label">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
