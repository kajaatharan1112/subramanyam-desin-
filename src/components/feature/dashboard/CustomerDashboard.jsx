import { motion } from "framer-motion"
import { FileText, Hourglass, CheckCircle, IndianRupee, BellRing } from "lucide-react"
import { MOCK_BILLS, MOCK_NOTIFICATIONS } from '../../../constants/mockData.js'
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

export default function CustomerDashboard({ onNavigate }) {
  const myBills = MOCK_BILLS.filter((b) => b.customerId === 'cust-001')
  const activeBills = myBills.filter((b) => !['completed', 'delivered'].includes(b.status))
  const completedBills = myBills.filter((b) => b.status === 'completed')

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-6 md:p-8 max-w-6xl mx-auto space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden bg-gradient-to-br from-[var(--color-neo-surface)] to-[var(--color-neo-bg)]">
          <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[var(--radius-neo-full)] bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-2xl font-bold text-white shadow-[var(--shadow-neo-soft)] border-4 border-[var(--color-neo-bg)]">
              AK
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold tracking-tight text-[var(--color-neo-text-primary)] mb-2">
                Welcome back, Arun Kumar!
              </h1>
              <p className="text-[var(--color-neo-text-secondary)] font-medium">
                Track your active orders, view recent bills, and manage notifications in one place.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="group transition-transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-neo-full)] bg-[var(--color-neo-bg)] shadow-[var(--shadow-neo-pressed)] text-[var(--color-neo-primary)]">
              <FileText size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[var(--color-neo-text-primary)]">{myBills.length}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Total Bills</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="group transition-transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-neo-full)] bg-[var(--color-neo-bg)] shadow-[var(--shadow-neo-pressed)] text-[var(--color-neo-warning)]">
              <Hourglass size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[var(--color-neo-text-primary)]">{activeBills.length}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Active Orders</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-neo-full)] bg-[var(--color-neo-bg)] shadow-[var(--shadow-neo-pressed)] text-[var(--color-neo-success)]">
              <CheckCircle size={24} />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[var(--color-neo-text-primary)]">{completedBills.length}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Completed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group transition-transform hover:-translate-y-1">
          <CardContent className="p-6 flex flex-col items-center text-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-neo-full)] bg-[var(--color-neo-bg)] shadow-[var(--shadow-neo-pressed)] text-[#8b5cf6]">
              <IndianRupee size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[var(--color-neo-text-primary)] mt-1">{formatCurrency(myBills.reduce((s, b) => s + b.totalAmount, 0))}</h3>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)] mt-1">Total Amount</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <BellRing size={20} className="text-[var(--color-neo-primary)]" />
              Notifications
            </CardTitle>
            <PrimaryButton variant="ghost" size="sm">Mark All Read</PrimaryButton>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MOCK_NOTIFICATIONS.map((n) => (
                <div 
                  key={n.id} 
                  className={`flex items-start gap-4 rounded-[var(--radius-neo-md)] p-4 transition-all ${
                    !n.read 
                      ? 'bg-[var(--color-neo-bg)] shadow-[var(--shadow-neo-pressed)]' 
                      : 'hover:bg-[var(--color-neo-surface)] hover:shadow-[var(--shadow-neo-soft)]'
                  }`}
                >
                  <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${n.read ? 'bg-[var(--color-neo-secondary)]/30' : 'bg-[var(--color-neo-primary)] shadow-[0_0_8px_var(--color-neo-primary)]'}`} />
                  <div className="flex-1 space-y-1">
                    <p className={`text-sm font-semibold ${!n.read ? 'text-[var(--color-neo-text-primary)]' : 'text-[var(--color-neo-text-secondary)]'}`}>
                      {n.title}
                    </p>
                    <p className="text-xs font-medium text-[var(--color-neo-text-secondary)]">{n.message}</p>
                  </div>
                  <span className="text-xs font-semibold text-[var(--color-neo-text-secondary)]">{n.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
