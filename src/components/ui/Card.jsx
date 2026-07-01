import * as React from "react"
import { cn } from "../../utils/cn.js"

const Card = React.forwardRef(({ className, variant = "soft", ...props }, ref) => {
  const variantStyles = {
    soft: "bg-[var(--color-neo-card)] shadow-[var(--shadow-neo-soft)] border border-white/40",
    inset: "bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-pressed)]",
    floating: "bg-[var(--color-neo-card)] shadow-[var(--shadow-neo-floating)] border border-white/60",
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[var(--radius-neo-large)] text-[var(--color-neo-text-primary)]",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  )
})
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-[var(--color-neo-text-secondary)]", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
