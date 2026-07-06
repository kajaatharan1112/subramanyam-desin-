import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Edit2, Trash2, Calendar, FileText, ChevronDown, ChevronUp, Package, IndianRupee, CheckCircle2, Clock } from "lucide-react"
import { MOCK_BILLS } from '../../../constants/mockData.js'
import { formatDate } from '../../../utils/formatters.js'
import { VIEWS } from '../../../constants/routes.js'
import PrimaryButton from '../../buttons/PrimaryButton.jsx'
import Modal from '../../feedback/Modal.jsx'
import { showToast } from '../../feedback/Toast.jsx'

/* ─── Mobile Bill Card ────────────────────────────────────────── */
function BillCard({ bill, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)
  const b = bill

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl bg-[var(--color-neo-card)] border border-white/40 shadow-[var(--shadow-neo-soft)] overflow-hidden flex flex-col"
    >
      {/* Card Header – always visible */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer md:cursor-default select-none"
        onClick={() => {
          if (window.innerWidth < 768) setExpanded((v) => !v);
        }}
      >
        {/* Bill Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-white shadow-sm">
          <FileText size={20} />
        </div>

        {/* Bill Number + Customer */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--color-neo-text-primary)] text-sm truncate">{b.billNumber}</div>
          <div className="text-xs text-[var(--color-neo-text-secondary)] truncate flex items-center gap-1 mt-0.5">
            {b.customerName}
          </div>
        </div>

        {/* Payment Status badge */}
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${b.paymentStatus === 'payed'
            ? 'bg-[var(--color-neo-success)]/12 text-[var(--color-neo-success)]'
            : 'bg-[var(--color-neo-danger)]/12 text-[var(--color-neo-danger)]'
          }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${b.paymentStatus === 'payed' ? 'bg-[var(--color-neo-success)]' : 'bg-[var(--color-neo-danger)]'}`} />
          {b.paymentStatus === 'payed' ? 'Paid' : 'Unpaid'}
        </span>

        {/* Expand toggle (Mobile only) */}
        <span className="text-[var(--color-neo-text-secondary)] ml-1 md:hidden">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>

      {/* Detail tabs */}
      {(() => {
        const detailContent = (
          <>
            <div className="px-4 pb-3 space-y-2 border-t border-[var(--color-neo-secondary)]/10 pt-3">

              {/* Stage and Total */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                    <Package size={13} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Stage</div>
                    <div className="text-sm font-medium text-[var(--color-neo-text-primary)] truncate capitalize">{b.stage}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                    <IndianRupee size={13} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Total</div>
                    <div className="text-sm font-medium text-[var(--color-neo-text-primary)] truncate">₹{b.totalAmount.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                    <Calendar size={13} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Bill Date</div>
                    <div className="text-sm font-medium text-[var(--color-neo-text-primary)]">{formatDate(b.createdAt)}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                    <Clock size={13} />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Delivery</div>
                    <div className="text-sm font-medium text-[var(--color-neo-text-primary)]">{formatDate(b.deliveryDate)}</div>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="rounded-xl bg-[var(--color-neo-surface)] p-3 shadow-[var(--shadow-neo-pressed)]">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)] mb-2">Items ({b.items.length})</div>
                <div className="space-y-1.5 max-h-[80px] overflow-y-auto">
                  {b.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-[var(--color-neo-text-primary)] truncate mr-2" title={item.name}>
                        {item.qty}x {item.name}
                      </span>
                      <span className="font-medium text-[var(--color-neo-text-primary)] shrink-0">₹{item.total.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-2 px-4 pb-4 pt-1 mt-auto">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEdit(b); }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-neo-warning)]/10 py-2.5 text-[var(--color-neo-warning)] transition-all active:scale-95 hover:bg-[var(--color-neo-warning)]/18"
              >
                <Edit2 size={15} />
                <span className="text-xs font-semibold">Edit</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete(b); }}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-neo-danger)]/10 py-2.5 text-[var(--color-neo-danger)] transition-all active:scale-95 hover:bg-[var(--color-neo-danger)]/18"
              >
                <Trash2 size={15} />
                <span className="text-xs font-semibold">Delete</span>
              </button>
            </div>
          </>
        );

        return (
          <>
            {/* Mobile (collapsible) */}
            <div className="md:hidden">
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="details"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{ overflow: 'hidden' }}
                  >
                    {detailContent}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop (always visible) */}
            <div className="hidden md:flex flex-col flex-1 h-full">
              {detailContent}
            </div>
          </>
        );
      })()}
    </motion.div>
  )
}

/* ─── Main BillList Component ─────────────────────────────────── */
export default function BillList({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editBill, setEditBill] = useState(null)
  const [deleteBill, setDeleteBill] = useState(null)

  const filtered = MOCK_BILLS.filter((b) =>
    b.billNumber.toLowerCase().includes(search.toLowerCase()) ||
    b.customerName.toLowerCase().includes(search.toLowerCase()) ||
    b.stage.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (b) => {
    setEditBill(b)
  }

  const handleDelete = (b) => {
    setDeleteBill(b)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-6"
    >
      {/* ── Header & Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-neo-text-primary)]">
            Bills <span className="text-base text-[var(--color-neo-text-secondary)] ml-1">({MOCK_BILLS.length})</span>
          </h1>
          <p className="text-[var(--color-neo-text-secondary)] text-sm font-medium mt-1">Manage your customer bills and invoices</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neo-text-secondary)]" size={16} />
            <input
              type="text"
              placeholder="Search bills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-[var(--radius-neo-pill)] bg-[var(--color-neo-bg)] pl-10 pr-4 text-sm text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-pressed)] outline-none transition-all placeholder:text-[var(--color-neo-text-secondary)] focus:ring-2 focus:ring-[var(--color-neo-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-neo-bg)]"
            />
          </div>
          <PrimaryButton icon={<Plus size={16} />} onClick={() => setShowAddModal(true)}>
            Add
          </PrimaryButton>
        </div>
      </div>

      {/* ── Bill Cards List ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
        <AnimatePresence>
          {filtered.map((b) => (
            <BillCard
              key={b.id}
              bill={b}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-[var(--color-neo-text-secondary)] font-medium w-full">
          No bills found matching your search.
        </div>
      )}

      {/* ── Add Bill Modal ── */}
      {showAddModal && (
        <Modal
          title="Add New Bill"
          onClose={() => setShowAddModal(false)}
          footer={
            <div className="flex w-full gap-3 justify-end">
              <PrimaryButton variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => {
                setShowAddModal(false)
                showToast('success', 'Bill Created', 'New bill has been created successfully.')
              }}>
                Create Bill
              </PrimaryButton>
            </div>
          }
        >
          <div className="space-y-5">
            {['Customer Name', 'Total Amount', 'Bill Stage'].map((label) => (
              <div key={label}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">{label}</label>
                <input
                  type="text"
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className="w-full rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)] px-4 py-3 text-sm font-medium text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-pressed)] outline-none transition-all placeholder:text-[var(--color-neo-text-secondary)]/60 focus:ring-2 focus:ring-[var(--color-neo-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-neo-card)]"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ── Edit Bill Modal ── */}
      {editBill && (
        <Modal
          title={`Edit — ${editBill.billNumber}`}
          onClose={() => setEditBill(null)}
          footer={
            <div className="flex w-full gap-3 justify-end">
              <PrimaryButton variant="ghost" onClick={() => setEditBill(null)}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => {
                setEditBill(null)
                showToast('success', 'Bill Updated', `${editBill.billNumber} has been updated.`)
              }}>
                Save Changes
              </PrimaryButton>
            </div>
          }
        >
          <div className="space-y-5">
            {[
              { label: 'Customer Name', value: editBill.customerName },
              { label: 'Total Amount', value: editBill.totalAmount },
              { label: 'Bill Stage', value: editBill.stage },
            ].map(({ label, value }) => (
              <div key={label}>
                <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">{label}</label>
                <input
                  type="text"
                  defaultValue={value}
                  className="w-full rounded-[var(--radius-neo-md)] bg-[var(--color-neo-bg)] px-4 py-3 text-sm font-medium text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-pressed)] outline-none transition-all placeholder:text-[var(--color-neo-text-secondary)]/60 focus:ring-2 focus:ring-[var(--color-neo-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-neo-card)]"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteBill && (
        <Modal
          title="Delete Bill"
          onClose={() => setDeleteBill(null)}
          footer={
            <div className="flex w-full gap-3 justify-end">
              <PrimaryButton variant="ghost" onClick={() => setDeleteBill(null)}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => {
                setDeleteBill(null)
                showToast('error', 'Bill Deleted', `${deleteBill.billNumber} has been removed.`)
              }}>
                Confirm Delete
              </PrimaryButton>
            </div>
          }
        >
          <p className="text-sm text-[var(--color-neo-text-secondary)]">
            Are you sure you want to delete <span className="font-semibold text-[var(--color-neo-text-primary)]">{deleteBill.billNumber}</span>?
            This action cannot be undone.
          </p>
        </Modal>
      )}
    </motion.div>
  )
}
