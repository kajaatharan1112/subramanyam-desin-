import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { VIEWS } from './constants/routes.js'
import Sidebar from './components/navigation/Sidebar.jsx'
import TopBar from './components/navigation/TopBar.jsx'
import MobileBottomBar from './components/navigation/MobileBottomBar.jsx'
import LoginPage from './components/feature/auth/LoginPage.jsx'
import AdminDashboard from './components/feature/dashboard/AdminDashboard.jsx'
import CustomerDashboard from './components/feature/dashboard/CustomerDashboard.jsx'
import CustomerList from './components/feature/customers/CustomerList.jsx'
import BillList from './components/feature/bills/BillList.jsx'
import ToastContainer from './components/feedback/Toast.jsx'
import { useLocalStorage } from './hooks/useLocalStorage.js'

export default function App() {
  const [role, setRole] = useLocalStorage('app_role', null)
  const [currentView, setCurrentView] = useState(VIEWS.LOGIN)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = (selectedRole) => {
    setRole(selectedRole)
    setCurrentView(selectedRole === 'admin' ? VIEWS.ADMIN_DASHBOARD : VIEWS.CUST_DASHBOARD)
  }

  const handleLogout = () => {
    setRole(null)
    setCurrentView(VIEWS.LOGIN)
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
    setSidebarOpen(false)
  }

  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  // Switch role for demo purposes
  const handleRoleSwitch = () => {
    const newRole = role === 'admin' ? 'customer' : 'admin'
    setRole(newRole)
    setCurrentView(newRole === 'admin' ? VIEWS.ADMIN_DASHBOARD : VIEWS.CUST_DASHBOARD)
  }

  if (currentView === VIEWS.LOGIN || !role) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="flex h-dvh overflow-hidden bg-[var(--color-neo-bg)] md:bg-[var(--color-neo-text-primary)]">
      <Sidebar
        currentView={currentView}
        onNavigate={handleNavigate}
        role={role}
        onRoleSwitch={handleRoleSwitch}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden md:pl-[72px] pt-[64px] pb-[calc(54px+3mm+env(safe-area-inset-bottom,0px))] md:pb-0">
        <TopBar
          currentView={currentView}
          onToggleSidebar={toggleSidebar}
          onLogout={handleLogout}
        />

        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 overflow-y-auto min-h-0 bg-[var(--color-neo-bg)] md:rounded-tl-[40px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === VIEWS.ADMIN_DASHBOARD && <AdminDashboard onNavigate={handleNavigate} />}
              {currentView === VIEWS.CUSTOMER_LIST && <CustomerList onNavigate={handleNavigate} />}
              {currentView === VIEWS.CUST_DASHBOARD && <CustomerDashboard onNavigate={handleNavigate} />}
              {currentView === VIEWS.BILL_LIST && <BillList onNavigate={handleNavigate} />}

              {/* Placeholders for unbuilt routes */}
              {[VIEWS.CUSTOMER_DETAIL, VIEWS.BILL_CREATE, VIEWS.BILL_DETAIL, VIEWS.ORDER_TRACKING, VIEWS.REPORTS, VIEWS.SETTINGS, VIEWS.CUST_BILLS, VIEWS.CUST_ORDER_STATUS].includes(currentView) && (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <h2 className="mb-2 text-2xl font-bold text-[var(--color-neo-text-primary)]">Coming Soon</h2>
                    <p className="text-[var(--color-neo-text-secondary)]">This page is under construction.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      <MobileBottomBar currentView={currentView} onNavigate={handleNavigate} role={role} />
      <ToastContainer />
    </div>
  )
}
