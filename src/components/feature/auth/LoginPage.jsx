import { motion } from "framer-motion"
import { CheckCircle2, ShieldCheck, FileText, Bell } from "lucide-react"

export default function LoginPage({ onLogin }) {
  const features = [
    { icon: <ShieldCheck size={20} className="text-[var(--color-neo-primary)]" />, text: "Enterprise SaaS Security" },
    { icon: <FileText size={20} className="text-[var(--color-neo-primary)]" />, text: "Manage bills & orders seamlessly" },
    { icon: <CheckCircle2 size={20} className="text-[var(--color-neo-primary)]" />, text: "Real-time order tracking" },
    { icon: <Bell size={20} className="text-[var(--color-neo-primary)]" />, text: "Automated email notifications" },
  ]

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-[var(--color-neo-bg)] p-6">
      
      {/* Soft Background Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ x: [0, 30, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--color-neo-primary)]/10 blur-[80px]"
        />
        <motion.div 
          animate={{ x: [0, -40, 20, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-[var(--color-neo-warning)]/10 blur-[80px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-[var(--radius-neo-large)] bg-[var(--color-neo-surface)] p-8 shadow-[var(--shadow-neo-floating)] border border-white/50"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[var(--radius-neo-lg)] bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-soft)] text-3xl font-bold text-[var(--color-neo-primary)] border border-white/40">
            O
          </div>
          <h1 className="mb-2 text-2xl font-bold text-[var(--color-neo-text-primary)] tracking-tight">
            Welcome to ONEVO
          </h1>
          <p className="text-sm font-medium text-[var(--color-neo-text-secondary)]">
            Premium Billing & Order Management
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('admin')}
            className="flex w-full items-center justify-center gap-3 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-surface)] px-4 py-3.5 text-sm font-semibold text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-soft)] transition-shadow hover:shadow-[var(--shadow-neo-floating)] active:shadow-[var(--shadow-neo-pressed)]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.44 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Sign in with Google
          </motion.button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-neo-secondary)]/20 shadow-[0_1px_0_rgba(255,255,255,1)]"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--color-neo-surface)] px-2 text-[var(--color-neo-text-secondary)] tracking-wider font-semibold">
                Demo Access
              </span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('admin')}
            className="flex w-full items-center justify-center gap-3 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-primary)] px-4 py-3.5 text-sm font-semibold text-white shadow-[var(--shadow-neo-soft)] transition-shadow hover:shadow-[var(--shadow-neo-floating)] active:shadow-[var(--shadow-neo-pressed)]"
          >
            Log in as Admin
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onLogin('customer')}
            className="flex w-full items-center justify-center gap-3 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)] px-4 py-3.5 text-sm font-semibold text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-inset)] border border-transparent transition-all hover:shadow-[var(--shadow-neo-soft)] active:shadow-[var(--shadow-neo-pressed)]"
          >
            Log in as Customer
          </motion.button>
        </div>

        <div className="mt-8 space-y-3 rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)]/50 p-5 shadow-[var(--shadow-neo-pressed)]">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-[var(--color-neo-text-secondary)] font-medium">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-neo-sm)] bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-soft)]">
                {feature.icon}
              </div>
              {feature.text}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
