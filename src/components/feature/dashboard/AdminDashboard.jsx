import { motion } from "framer-motion"
import { Users, FileText, Hourglass, CheckCircle, IndianRupee, ClipboardList, Plus, Package } from "lucide-react"
import { MOCK_BILLS, MOCK_CUSTOMERS, MOCK_ACTIVITY } from '../../../constants/mockData.js'
import { formatCurrency } from '../../../utils/formatters.js'
import { VIEWS } from '../../../constants/routes.js'
import PrimaryButton from '../../buttons/PrimaryButton.jsx'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card.jsx'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function AdminDashboard({ onNavigate }) {
  const totalRevenue = MOCK_BILLS.reduce((sum, b) => sum + b.totalAmount, 0)
  const pendingOrders = MOCK_BILLS.filter((b) => !['completed', 'delivered'].includes(b.status)).length
  const completedOrders = MOCK_BILLS.filter((b) => b.status === 'completed').length
  const todaysOrders = MOCK_BILLS.filter((b) => b.createdAt === '2026-06-29').length || 2

  const stats = [
    { label: 'Total Customers', value: MOCK_CUSTOMERS.length, icon: <Users size={22} className="text-[var(--color-neo-primary)]" /> },
    { label: 'Total Bills', value: MOCK_BILLS.length, icon: <FileText size={22} className="text-[#8b5cf6]" /> },
    { label: 'Pending Orders', value: pendingOrders, icon: <Hourglass size={22} className="text-[var(--color-neo-warning)]" /> },
    { label: 'Completed', value: completedOrders, icon: <CheckCircle size={22} className="text-[var(--color-neo-success)]" /> },
    { label: 'Revenue', value: formatCurrency(totalRevenue), icon: <IndianRupee size={22} className="text-[var(--color-neo-info)]" /> },
    { label: "Today's Orders", value: todaysOrders, icon: <ClipboardList size={22} className="text-[var(--color-neo-danger)]" /> },
  ]

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-neo-text-primary)]">Overview</h1>
        <p className="text-[var(--color-neo-text-secondary)] font-medium">Welcome back! Here's what's happening today.</p>
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
        <PrimaryButton icon={<Plus size={18} />} onClick={() => onNavigate(VIEWS.BILL_CREATE)}>
          New Bill
        </PrimaryButton>
        <PrimaryButton variant="default" icon={<Users size={18} />} onClick={() => onNavigate(VIEWS.CUSTOMER_LIST)}>
          New Customer
        </PrimaryButton>
        <PrimaryButton variant="ghost" icon={<Package size={18} />} onClick={() => onNavigate(VIEWS.ORDER_TRACKING)}>
          Track Orders
        </PrimaryButton>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Card key={i} className="group transition-transform hover:-translate-y-1">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)] mb-1">
                  {s.label}
                </p>
                <h3 className="text-3xl font-bold text-[var(--color-neo-text-primary)]">
                  {s.value}
                </h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)] shadow-[var(--shadow-neo-pressed)]">
                {s.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Activity Log */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <PrimaryButton variant="ghost" size="sm">View All</PrimaryButton>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)] p-5 shadow-[var(--shadow-neo-pressed)]">
                {MOCK_ACTIVITY.slice(0, 5).map((a, i) => (
                  <div key={a.id} className="flex items-start gap-4">
                    <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--color-neo-primary)] shadow-[0_0_8px_var(--color-neo-primary)]" />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none text-[var(--color-neo-text-primary)]">{a.message}</p>
                      <p className="text-xs text-[var(--color-neo-text-secondary)]">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Bills */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Recent Bills</CardTitle>
              <PrimaryButton variant="ghost" size="sm" onClick={() => onNavigate(VIEWS.BILL_LIST)}>
                View All
              </PrimaryButton>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_BILLS.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    onClick={() => onNavigate(VIEWS.BILL_DETAIL, { billId: b.id })}
                    className="flex cursor-pointer items-center justify-between rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)] p-4 shadow-[var(--shadow-neo-pressed)] transition-all hover:bg-[var(--color-neo-surface)] hover:shadow-[var(--shadow-neo-soft)]"
                  >
                    <div>
                      <p className="font-semibold text-[var(--color-neo-text-primary)]">{b.billNumber}</p>
                      <p className="text-xs font-medium text-[var(--color-neo-text-secondary)]">{b.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[var(--color-neo-primary)]">{formatCurrency(b.totalAmount)}</p>
                      <p className="text-xs font-semibold capitalize text-[var(--color-neo-text-secondary)]">{b.status.replace('_', ' ')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </motion.div>
  )
}
