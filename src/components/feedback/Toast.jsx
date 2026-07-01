import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { X, CheckCircle2, AlertCircle, Info, XCircle } from "lucide-react"
import { cn } from "../../utils/cn.js"

const ToastProvider = ToastPrimitives.Provider
const ToastViewport = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-[calc(var(--topbar-height)+16px)] z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

const Toast = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-[var(--radius-neo-md)] border p-4 pr-8 shadow-[var(--shadow-neo-floating)] transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
        variant === "default" && "border-[var(--color-neo-surface)] bg-[var(--color-neo-bg)] text-[var(--color-neo-text-primary)]",
        variant === "destructive" && "destructive group border-[var(--color-neo-danger)] bg-[var(--color-neo-danger)] text-white",
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

const ToastAction = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-[var(--color-neo-text-secondary)] opacity-0 transition-opacity hover:text-[var(--color-neo-text-primary)] focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName


// Global Toast Manager
let memoryState = []
let listeners = []

export function showToast(type, title, message) {
  const id = Date.now().toString()
  const toast = { id, type, title, message }
  memoryState = [...memoryState, toast]
  listeners.forEach((l) => l(memoryState))

  setTimeout(() => {
    memoryState = memoryState.filter((t) => t.id !== id)
    listeners.forEach((l) => l(memoryState))
  }, 4000)
}

export default function ToastContainer() {
  const [toasts, setToasts] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setToasts)
    return () => {
      listeners = listeners.filter((l) => l !== setToasts)
    }
  }, [])

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, message, type, ...props }) {
        let Icon = Info
        let iconColor = "text-[var(--color-neo-info)]"
        
        if (type === 'success') {
          Icon = CheckCircle2
          iconColor = "text-[var(--color-neo-success)]"
        } else if (type === 'error' || type === 'destructive') {
          Icon = XCircle
          iconColor = "text-[var(--color-neo-danger)]"
        } else if (type === 'warning') {
          Icon = AlertCircle
          iconColor = "text-[var(--color-neo-warning)]"
        }

        return (
          <Toast key={id} {...props}>
            <div className="flex gap-3">
              <Icon className={cn("h-5 w-5 mt-0.5", iconColor)} />
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {message && <ToastDescription>{message}</ToastDescription>}
              </div>
            </div>
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
