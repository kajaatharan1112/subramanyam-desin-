import * as React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cn } from "../../utils/cn.js"

export default function Modal({ title, children, onClose, footer }) {
  // We use open=true because our current architecture conditionally renders the Modal component
  return (
    <Dialog.Root open={true} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-[var(--radius-neo-large)] bg-[var(--color-neo-bg)] border border-white/60 p-6 shadow-[var(--shadow-neo-floating)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
          
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-lg font-semibold leading-none tracking-tight text-[var(--color-neo-text-primary)]">
              {title}
            </Dialog.Title>
          </div>

          <div className="py-4">
            {children}
          </div>

          {footer && (
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              {footer}
            </div>
          )}

          <Dialog.Close asChild>
            <button className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--color-neo-bg)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--color-neo-primary)] focus:ring-offset-2 disabled:pointer-events-none text-[var(--color-neo-text-secondary)]">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
