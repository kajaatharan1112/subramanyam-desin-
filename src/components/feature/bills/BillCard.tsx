import { motion } from 'framer-motion';
import { FileText, Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import type { Bill, WorkflowTemplate } from '../../../types';
import type { UserRole } from '../../../types/permissions';
import { MOCK_BILL_STATUSES } from '../../../constants/bill-statuses';
import { formatLKR } from '../../../utils/currency-format';
import { formatDateDisplay } from '../../../utils/date-format';
import { calcPendingAmount, calcTotalAmount, calcBillWorkProgress } from '../../../utils/billCalculations';
import { canEditBill, canDeleteBill } from '../../../utils/permissions';
import BillProgressBar from './BillProgressBar';

interface BillCardProps {
  bill: Bill;
  workflow: WorkflowTemplate | null;
  role: UserRole | null;
  onView: (bill: Bill) => void;
  onEdit?: (bill: Bill) => void;
  onDelete?: (bill: Bill) => void;
}

export default function BillCard({ bill, workflow, role, onView, onEdit, onDelete }: BillCardProps) {
  const totalAmount = calcTotalAmount(bill);
  const pendingAmount = calcPendingAmount(bill);
  const progress = calcBillWorkProgress(bill, workflow);

  const statusDef = MOCK_BILL_STATUSES.find(s => s.id === bill.billStatusId);
  const statusColor = statusDef?.colorToken || 'neutral';
  const statusName = statusDef?.name || 'Unknown';

  const showEdit = canEditBill(role) && onEdit;
  const showDelete = canDeleteBill(role) && onDelete;

  // Determine badge styling based on colorToken
  const badgeClasses = {
    'primary': 'bg-[var(--color-neo-primary)]/12 text-[var(--color-neo-primary)]',
    'success': 'bg-[var(--color-neo-success)]/12 text-[var(--color-neo-success)]',
    'warning': 'bg-[var(--color-neo-warning)]/12 text-[var(--color-neo-warning)]',
    'danger': 'bg-[var(--color-neo-danger)]/12 text-[var(--color-neo-danger)]',
    'neutral': 'bg-[var(--color-neo-text-secondary)]/12 text-[var(--color-neo-text-secondary)]'
  }[statusColor] || 'bg-[var(--color-neo-text-secondary)]/12 text-[var(--color-neo-text-secondary)]';

  const dotClasses = {
    'primary': 'bg-[var(--color-neo-primary)]',
    'success': 'bg-[var(--color-neo-success)]',
    'warning': 'bg-[var(--color-neo-warning)]',
    'danger': 'bg-[var(--color-neo-danger)]',
    'neutral': 'bg-[var(--color-neo-text-secondary)]'
  }[statusColor] || 'bg-[var(--color-neo-text-secondary)]';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="rounded-2xl bg-[var(--color-neo-card)] border border-white/40 shadow-[var(--shadow-neo-soft)] overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="flex items-start gap-3 p-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-neo-primary)] to-[#8b5cf6] text-white shadow-sm mt-1">
          <FileText size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[var(--color-neo-text-primary)] text-sm truncate">
            {bill.billNumber}
          </div>
          <div className="text-xs text-[var(--color-neo-text-secondary)] truncate mt-0.5">
            {bill.customerName}
          </div>
        </div>
        <span className={`flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${badgeClasses}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${dotClasses}`} />
          {statusName}
        </span>
      </div>

      {/* Body Section */}
      <div className="px-4 pb-3 flex-1 flex flex-col border-t border-[var(--color-neo-secondary)]/10 pt-4 gap-4">
        {/* Financial Metrics */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col rounded-xl bg-[var(--color-neo-surface)] px-3 py-2 shadow-[var(--shadow-neo-pressed)]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Total Amount</span>
            <span className="text-sm font-semibold text-[var(--color-neo-text-primary)] truncate mt-0.5">{formatLKR(totalAmount)}</span>
          </div>
          <div className="flex flex-col rounded-xl bg-[var(--color-neo-surface)] px-3 py-2 shadow-[var(--shadow-neo-pressed)]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Pending</span>
            <span className={`text-sm font-semibold truncate mt-0.5 ${pendingAmount > 0 ? 'text-[var(--color-neo-danger)]' : 'text-[var(--color-neo-success)]'}`}>
              {formatLKR(pendingAmount)}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 text-xs text-[var(--color-neo-text-secondary)]">
            <Calendar size={13} className="shrink-0" />
            <span className="truncate">Ord: {formatDateDisplay(bill.orderDate)}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--color-neo-text-secondary)]">
            <Clock size={13} className="shrink-0" />
            <span className="truncate">Due: {formatDateDisplay(bill.deadline)}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-auto">
          <BillProgressBar progress={progress} />
        </div>
      </div>

      {/* Action Footer */}
      <div className="grid gap-2 px-4 pb-4 pt-2" style={{ gridTemplateColumns: showEdit && showDelete ? 'repeat(3, 1fr)' : '1fr' }}>
        <button
          type="button"
          onClick={() => onView(bill)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-neo-primary)]/10 py-2.5 text-[var(--color-neo-primary)] transition-all active:scale-95 hover:bg-[var(--color-neo-primary)]/18"
        >
          <FileText size={15} />
          <span className="text-xs font-semibold">View</span>
        </button>
        
        {showEdit && (
          <button
            type="button"
            onClick={() => onEdit(bill)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-neo-warning)]/10 py-2.5 text-[var(--color-neo-warning)] transition-all active:scale-95 hover:bg-[var(--color-neo-warning)]/18"
          >
            <Edit2 size={15} />
            <span className="text-xs font-semibold">Edit</span>
          </button>
        )}
        
        {showDelete && (
          <button
            type="button"
            onClick={() => onDelete(bill)}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--color-neo-danger)]/10 py-2.5 text-[var(--color-neo-danger)] transition-all active:scale-95 hover:bg-[var(--color-neo-danger)]/18"
          >
            <Trash2 size={15} />
            <span className="text-xs font-semibold">Delete</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
