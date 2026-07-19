import type { Bill } from '../../../types';
import { formatLKR } from '../../../utils/currency-format';
import { formatDateDisplay } from '../../../utils/date-format';
import { calcWorksSubtotal, calcTotalAmount, calcPendingAmount } from '../../../utils/billCalculations';

interface BillSummarySectionProps {
  bill: Bill;
}

export default function BillSummarySection({ bill }: BillSummarySectionProps) {
  const subtotal = calcWorksSubtotal(bill.works);
  const total = calcTotalAmount(bill);
  const pending = calcPendingAmount(bill);

  return (
    <div className="rounded-2xl bg-[var(--color-neo-surface)] p-4 shadow-[var(--shadow-neo-pressed)]">
      <h3 className="text-sm font-bold text-[var(--color-neo-text-primary)] mb-4 uppercase tracking-wider">Bill Summary</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Order Date</span>
          <span className="block text-sm font-medium text-[var(--color-neo-text-primary)] mt-1">{formatDateDisplay(bill.orderDate)}</span>
        </div>
        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Deadline</span>
          <span className="block text-sm font-medium text-[var(--color-neo-text-primary)] mt-1">{formatDateDisplay(bill.deadline)}</span>
        </div>
      </div>

      <div className="space-y-2 border-t border-[var(--color-neo-secondary)]/20 pt-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--color-neo-text-secondary)]">Works Subtotal</span>
          <span className="font-medium text-[var(--color-neo-text-primary)]">{formatLKR(subtotal)}</span>
        </div>

        {bill.adjustments.map((adj) => (
          <div key={adj.id} className="flex justify-between items-center text-sm">
            <span className="text-[var(--color-neo-text-secondary)]">{adj.label}</span>
            <span className={`font-medium ${adj.operation === 'ADD' ? 'text-[var(--color-neo-danger)]' : 'text-[var(--color-neo-success)]'}`}>
              {adj.operation === 'ADD' ? '+' : '-'}{formatLKR(adj.amount)}
            </span>
          </div>
        ))}

        <div className="flex justify-between items-center text-sm border-t border-[var(--color-neo-secondary)]/20 pt-2 font-bold">
          <span className="text-[var(--color-neo-text-primary)]">Total Amount</span>
          <span className="text-[var(--color-neo-text-primary)]">{formatLKR(total)}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-[var(--color-neo-text-secondary)]">Paid Amount</span>
          <span className="font-medium text-[var(--color-neo-success)]">{formatLKR(bill.paidAmount)}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-t border-[var(--color-neo-secondary)]/20 pt-2 font-bold">
          <span className="text-[var(--color-neo-text-primary)]">Pending Amount</span>
          <span className={`text-[var(--color-neo-danger)]`}>{formatLKR(pending)}</span>
        </div>
      </div>
    </div>
  );
}
