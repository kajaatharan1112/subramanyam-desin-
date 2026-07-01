import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"
import { cn } from "../../utils/cn.js"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-neo-md)] text-sm font-medium ring-offset-[var(--color-neo-bg)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neo-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--color-neo-surface)] text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-soft)] hover:shadow-[var(--shadow-neo-floating)] active:shadow-[var(--shadow-neo-pressed)]",
        primary:
          "bg-[var(--color-neo-primary)] text-white shadow-[var(--shadow-neo-soft)] hover:shadow-[var(--shadow-neo-floating)] active:shadow-[var(--shadow-neo-pressed)]",
        danger:
          "bg-[var(--color-neo-danger)] text-white shadow-[var(--shadow-neo-soft)] hover:shadow-[var(--shadow-neo-floating)] active:shadow-[var(--shadow-neo-pressed)]",
        ghost:
          "hover:bg-[var(--color-neo-card)] text-[var(--color-neo-text-secondary)] hover:text-[var(--color-neo-text-primary)]",
        inset:
          "bg-[var(--color-neo-surface)] text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-pressed)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[var(--radius-neo-sm)] px-3",
        lg: "h-11 rounded-[var(--radius-neo-lg)] px-8",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const PrimaryButton = React.forwardRef(
  ({ className, variant, size, fullWidth, asChild = false, icon, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const isGhost = variant === "ghost"
    const isInset = variant === "inset"

    // Only apply framer motion scale if not ghost or inset (ghost doesn't have shadow pop)
    const MotionComp = asChild ? motion(Slot) : motion.button

    return (
      <MotionComp
        whileHover={!isGhost && !isInset ? { scale: 1.02 } : {}}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-2 h-4 w-4 shrink-0">{icon}</span>}
        {children}
      </MotionComp>
    )
  }
)
PrimaryButton.displayName = "PrimaryButton"

export default PrimaryButton
