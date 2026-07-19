import { motion } from 'framer-motion';
import { X, Download, Plus, Edit2 } from 'lucide-react';
import type { Bill, WorkflowTemplate } from '../../../types';
import type { UserRole } from '../../../types/permissions';
import { MOCK_BILL_STATUSES } from '../../../constants/bill-statuses';
import { canDownloadBill, canViewAdminControls } from '../../../utils/permissions';
import { calcBillWorkProgress } from '../../../utils/billCalculations';
import BillSummarySection from './BillSummarySection';
import WorkAccordion from './WorkAccordion';
import BillProgressBar from './BillProgressBar';

interface BillDetailsModalProps {
  bill: Bill;
  workflow: WorkflowTemplate | null;
  role: UserRole | null;
  onClose: () => void;
  onEditBill?: (bill: Bill) => void;
  onAddWork?: (billId: string) => void;
  onEditWork?: (work: any) => void;
  onDeleteWork?: (work: any) => void;
  onDownload?: (bill: Bill) => void;
}

export default function BillDetailsModal({
  bill,
  workflow,
  role,
  onClose,
  onEditBill,
  onAddWork,
  onEditWork,
  onDeleteWork,
  onDownload
}: BillDetailsModalProps) {
  const statusDef = MOCK_BILL_STATUSES.find(s => s.id === bill.billStatusId);
  const statusColor = statusDef?.colorToken || 'neutral';
  const statusName = statusDef?.name || 'Unknown';
  
  const showAdminControls = canViewAdminControls(role);
  const showDownload = canDownloadBill(role);
  
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

  const overallProgress = calcBillWorkProgress(bill, workflow);
  const completedWorksCount = bill.works.filter(w => {
    const stage = workflow?.stages.find(s => s.id === w.currentStageId);
    return stage?.isFinal;
  }).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/30 backdrop-blur-sm" role="dialog" aria-modal="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="flex flex-col bg-[var(--color-neo-bg)] w-full h-full md:h-auto md:max-h-[90vh] md:max-w-4xl md:rounded-3xl shadow-[var(--shadow-neo-floating)] overflow-hidden"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 md:px-6 py-4 bg-[var(--color-neo-bg)]/90 backdrop-blur-md border-b border-[var(--color-neo-secondary)]/10">
          <div className="flex items-center gap-3">
             <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[var(--color-neo-text-primary)]">{bill.billNumber}</h2>
                  <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${badgeClasses}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${dotClasses}`} />
                    {statusName}
                  </span>
                </div>
                <div className="text-sm font-medium text-[var(--color-neo-text-secondary)] mt-0.5">{bill.customerName}</div>
             </div>
          </div>
          
          <div className="flex items-center gap-2">
            {showDownload && (
              <button
                type="button"
                onClick={() => onDownload?.(bill)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--color-neo-surface)] text-[var(--color-neo-text-primary)] font-semibold text-xs shadow-[var(--shadow-neo-soft)] hover:shadow-[var(--shadow-neo-pressed)] transition-all"
              >
                <Download size={14} /> Download
              </button>
            )}
            {showAdminControls && onEditBill && (
              <button
                type="button"
                onClick={() => onEditBill(bill)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--color-neo-warning)]/10 text-[var(--color-neo-warning)] font-semibold text-xs hover:bg-[var(--color-neo-warning)]/20 transition-all"
              >
                <Edit2 size={14} /> Edit
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-neo-surface)] text-[var(--color-neo-text-secondary)] shadow-[var(--shadow-neo-soft)] hover:shadow-[var(--shadow-neo-pressed)] transition-all"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BillSummarySection bill={bill} />

            <div className="rounded-2xl bg-[var(--color-neo-surface)] p-4 shadow-[var(--shadow-neo-pressed)] flex flex-col justify-between">
              <div>
                 <h3 className="text-sm font-bold text-[var(--color-neo-text-primary)] mb-4 uppercase tracking-wider">Work Progress</h3>
                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Workflow</span>
                      <span className="block text-sm font-medium text-[var(--color-neo-text-primary)] mt-1 truncate">{workflow?.name || 'None'}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Completed</span>
                      <span className="block text-sm font-medium text-[var(--color-neo-text-primary)] mt-1">{completedWorksCount} of {bill.works.length} Works</span>
                    </div>
                 </div>
              </div>
              <BillProgressBar progress={overallProgress} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[var(--color-neo-text-primary)] uppercase tracking-wider">Works</h3>
              {showAdminControls && onAddWork && (
                <button
                  type="button"
                  onClick={() => onAddWork(bill.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-neo-primary)] text-white font-semibold text-xs shadow-sm hover:brightness-110 transition-all"
                >
                  <Plus size={14} /> Add Work
                </button>
              )}
            </div>
            <WorkAccordion
              works={bill.works}
              workflow={workflow}
              role={role}
              onEditWork={onEditWork}
              onDeleteWork={onDeleteWork}
            />
          </div>

          {bill.notes && (
            <div className="rounded-2xl bg-[var(--color-neo-surface)] p-4 shadow-[var(--shadow-neo-soft)] border border-white/40">
              <h3 className="text-sm font-bold text-[var(--color-neo-text-primary)] mb-2 uppercase tracking-wider">Notes</h3>
              <p className="text-sm text-[var(--color-neo-text-secondary)] whitespace-pre-wrap">{bill.notes}</p>
            </div>
          )}
        </div>
        
        {/* Mobile Action Footer (Sticky) */}
        <div className="md:hidden sticky bottom-0 border-t border-[var(--color-neo-secondary)]/10 bg-[var(--color-neo-bg)]/90 backdrop-blur-md p-4 flex gap-3">
          {showDownload && (
            <button
              type="button"
              onClick={() => onDownload?.(bill)}
              className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl bg-[var(--color-neo-surface)] text-[var(--color-neo-text-primary)] font-bold text-sm shadow-[var(--shadow-neo-soft)] active:shadow-[var(--shadow-neo-pressed)]"
            >
              <Download size={16} /> Download
            </button>
          )}
          {showAdminControls && onEditBill && (
             <button
              type="button"
              onClick={() => onEditBill(bill)}
              className="flex-1 flex justify-center items-center gap-2 py-3 rounded-xl bg-[var(--color-neo-warning)]/10 text-[var(--color-neo-warning)] font-bold text-sm active:bg-[var(--color-neo-warning)]/20"
            >
              <Edit2 size={16} /> Edit Bill
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}
