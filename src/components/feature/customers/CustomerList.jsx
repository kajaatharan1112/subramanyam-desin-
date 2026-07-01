import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Search, Plus, Edit2, Trash2, FileText, Phone, Mail, Building2, Calendar, ChevronDown, ChevronUp } from "lucide-react"
import { MOCK_CUSTOMERS } from '../../../constants/mockData.js'
import { getInitials, formatDate } from '../../../utils/formatters.js'
import { VIEWS } from '../../../constants/routes.js'
import PrimaryButton from '../../buttons/PrimaryButton.jsx'
import Modal from '../../feedback/Modal.jsx'
import { showToast } from '../../feedback/Toast.jsx'
import { Card, CardContent } from '../../ui/Card.jsx'

/* ─── Mobile Customer Card ────────────────────────────────────────── */
function CustomerCard({ customer, onNavigate, onEdit, onDelete, onAddBill }) {
  const [expanded, setExpanded] = useState(false)
  const c = customer

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl bg-[var(--color-neo-card)] border border-white/40 shadow-[var(--shadow-neo-soft)] overflow-hidden"
    >
      {/* Card Header – always visible */}
      <div
        className="flex items-center gap-3 p-4 cursor-pointer md:cursor-default select-none"
        onClick={() => {
          if (window.innerWidth < 768) setExpanded((v) => !v);
        }}
      >
        {/* Avatar */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] font-bold text-white text-sm shadow-sm">
          {getInitials(c.name)}
        </div>

        {/* Name + Company */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--color-neo-text-primary)] text-sm truncate">{c.name}</div>
          <div className="text-xs text-[var(--color-neo-text-secondary)] truncate flex items-center gap-1 mt-0.5">
            <Building2 size={11} className="shrink-0" />
            {c.company}
          </div>
        </div>

        {/* Status badge */}
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
          c.active
            ? 'bg-[var(--color-neo-success)]/12 text-[var(--color-neo-success)]'
            : 'bg-gray-400/12 text-gray-400'
        }`}>
          <span className={`h-1.5 w-1.5 rounded-full ${c.active ? 'bg-[var(--color-neo-success)]' : 'bg-gray-400'}`} />
          {c.active ? 'Active' : 'Inactive'}
        </span>

        {/* Expand toggle (Mobile only) */}
        <span className="text-[var(--color-neo-text-secondary)] ml-1 md:hidden">
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </span>
      </div>

      {/* Detail tabs – small chips */}
      {(() => {
        const detailContent = (
          <div className="px-4 pb-3 space-y-2 border-t border-[var(--color-neo-secondary)]/10 pt-3">
            {/* Phone */}
            <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                <Phone size={13} />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Phone</div>
                <div className="text-sm font-medium text-[var(--color-neo-text-primary)] truncate">{c.phone}</div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                <Mail size={13} />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Email</div>
                <div className="text-sm font-medium text-[var(--color-neo-text-primary)] truncate">{c.email}</div>
              </div>
            </div>

            {/* Joined */}
            <div className="flex items-center gap-2.5 rounded-xl bg-[var(--color-neo-surface)] px-3 py-2.5 shadow-[var(--shadow-neo-pressed)]">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-neo-bg)] text-[var(--color-neo-primary)] shadow-sm shrink-0">
                <Calendar size={13} />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Joined</div>
                <div className="text-sm font-medium text-[var(--color-neo-text-primary)]">{formatDate(c.createdAt)}</div>
              </div>
            </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-3 gap-2 px-4 pb-4 pt-1">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onAddBill(c); }}
                className="flex flex-col items-center gap-1 rounded-xl bg-[var(--color-neo-primary)]/10 py-2.5 text-[var(--color-neo-primary)] transition-all active:scale-95 hover:bg-[var(--color-neo-primary)]/18"
              >
                <FileText size={16} />
                <span className="text-[10px] font-semibold">Add Bill</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onEdit(c); }}
                className="flex flex-col items-center gap-1 rounded-xl bg-[var(--color-neo-warning)]/10 py-2.5 text-[var(--color-neo-warning)] transition-all active:scale-95 hover:bg-[var(--color-neo-warning)]/18"
              >
                <Edit2 size={16} />
                <span className="text-[10px] font-semibold">Edit</span>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onDelete(c); }}
                className="flex flex-col items-center gap-1 rounded-xl bg-[var(--color-neo-danger)]/10 py-2.5 text-[var(--color-neo-danger)] transition-all active:scale-95 hover:bg-[var(--color-neo-danger)]/18"
              >
                <Trash2 size={16} />
                <span className="text-[10px] font-semibold">Delete</span>
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
            <div className="hidden md:block">
              {detailContent}
            </div>
          </>
        );
      })()}


    </motion.div>
  )
}

/* ─── Main CustomerList Component ─────────────────────────────────── */
export default function CustomerList({ onNavigate }) {
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editCustomer, setEditCustomer] = useState(null)
  const [deleteCustomer, setDeleteCustomer] = useState(null)

  const filtered = MOCK_CUSTOMERS.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  )

  const handleEdit = (c) => {
    setEditCustomer(c)
  }

  const handleDelete = (c) => {
    setDeleteCustomer(c)
  }

  const handleAddBill = (c) => {
    showToast('info', 'Add Bill', `Creating bill for ${c.name}`)
    onNavigate(VIEWS.BILL_CREATE)
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
            Customers <span className="text-base text-[var(--color-neo-text-secondary)] ml-1">({MOCK_CUSTOMERS.length})</span>
          </h1>
          <p className="text-[var(--color-neo-text-secondary)] text-sm font-medium mt-1">Manage your client database</p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neo-text-secondary)]" size={16} />
            <input
              type="text"
              placeholder="Search customers..."
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

      {/* ── Customer Cards List ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <AnimatePresence>
          {filtered.map((c) => (
            <CustomerCard
              key={c.id}
              customer={c}
              onNavigate={onNavigate}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAddBill={handleAddBill}
            />
          ))}
        </AnimatePresence>
      </div>
      
      {filtered.length === 0 && (
        <div className="py-16 text-center text-[var(--color-neo-text-secondary)] font-medium w-full">
          No customers found matching your search.
        </div>
      )}

      {/* ── Add Customer Modal ── */}
      {showAddModal && (
        <Modal
          title="Add New Customer"
          onClose={() => setShowAddModal(false)}
          footer={
            <div className="flex w-full gap-3 justify-end">
              <PrimaryButton variant="ghost" onClick={() => setShowAddModal(false)}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => {
                setShowAddModal(false)
                showToast('success', 'Customer Created', 'New customer has been added successfully.')
              }}>
                Create Customer
              </PrimaryButton>
            </div>
          }
        >
          <div className="space-y-5">
            {['Name', 'Email', 'Phone Number', 'Company Name'].map((label) => (
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

      {/* ── Edit Customer Modal ── */}
      {editCustomer && (
        <Modal
          title={`Edit — ${editCustomer.name}`}
          onClose={() => setEditCustomer(null)}
          footer={
            <div className="flex w-full gap-3 justify-end">
              <PrimaryButton variant="ghost" onClick={() => setEditCustomer(null)}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => {
                setEditCustomer(null)
                showToast('success', 'Customer Updated', `${editCustomer.name} has been updated.`)
              }}>
                Save Changes
              </PrimaryButton>
            </div>
          }
        >
          <div className="space-y-5">
            {[
              { label: 'Name', value: editCustomer.name },
              { label: 'Email', value: editCustomer.email },
              { label: 'Phone Number', value: editCustomer.phone },
              { label: 'Company Name', value: editCustomer.company },
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
      {deleteCustomer && (
        <Modal
          title="Delete Customer"
          onClose={() => setDeleteCustomer(null)}
          footer={
            <div className="flex w-full gap-3 justify-end">
              <PrimaryButton variant="ghost" onClick={() => setDeleteCustomer(null)}>Cancel</PrimaryButton>
              <PrimaryButton onClick={() => {
                setDeleteCustomer(null)
                showToast('error', 'Customer Deleted', `${deleteCustomer.name} has been removed.`)
              }}>
                Confirm Delete
              </PrimaryButton>
            </div>
          }
        >
          <p className="text-sm text-[var(--color-neo-text-secondary)]">
            Are you sure you want to delete <span className="font-semibold text-[var(--color-neo-text-primary)]">{deleteCustomer.name}</span>?
            This action cannot be undone.
          </p>
        </Modal>
      )}
    </motion.div>
  )
}
