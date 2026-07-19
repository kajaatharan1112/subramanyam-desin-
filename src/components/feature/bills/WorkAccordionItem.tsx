import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Edit2, Trash2, Calendar, Clock } from 'lucide-react';
import type { BillWork, WorkflowTemplate } from '../../../types';
import type { UserRole } from '../../../types/permissions';
import { formatLKR } from '../../../utils/currency-format';
import { calcWorkTotalCost, calcWorkStageProgress } from '../../../utils/billCalculations';
import { formatDateDisplay } from '../../../utils/date-format';
import { canViewAdminControls } from '../../../utils/permissions';
import WorkflowStepper from './WorkflowStepper';

interface WorkAccordionItemProps {
  work: BillWork;
  workflow: WorkflowTemplate | null;
  role: UserRole | null;
  isOpen: boolean;
  onToggle: () => void;
  onEdit?: (work: BillWork) => void;
  onDelete?: (work: BillWork) => void;
}

export default function WorkAccordionItem({
  work,
  workflow,
  role,
  isOpen,
  onToggle,
  onEdit,
  onDelete
}: WorkAccordionItemProps) {
  const totalCost = calcWorkTotalCost(work);
  const progress = workflow ? calcWorkStageProgress(work, workflow) : 0;
  const stageName = workflow?.stages.find(s => s.id === work.currentStageId)?.name || 'Unknown';
  
  const showAdminControls = canViewAdminControls(role);

  return (
    <div className="rounded-2xl bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-soft)] border border-white/40 overflow-hidden mb-3 last:mb-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-transparent outline-none cursor-pointer focus:bg-[var(--color-neo-card)]"
        aria-expanded={isOpen}
      >
        <div className="flex-1 min-w-0 pr-4 text-left flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-sm text-[var(--color-neo-text-primary)] truncate">{work.name}</h4>
            <div className="text-xs text-[var(--color-neo-text-secondary)] truncate mt-0.5">{work.serviceCategory}</div>
          </div>
          
          <div className="hidden md:flex flex-col items-end shrink-0 mr-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">{stageName}</span>
            <span className="text-xs font-semibold text-[var(--color-neo-primary)] mt-0.5">{progress}%</span>
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-sm font-bold text-[var(--color-neo-text-primary)]">{formatLKR(totalCost)}</span>
          </div>
        </div>
        
        <div className={`shrink-0 text-[var(--color-neo-text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-[var(--color-neo-secondary)]/10 mt-1">
              
              <div className="mt-4 mb-5">
                <WorkflowStepper workflow={workflow} currentStageId={work.currentStageId} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {work.description && (
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Description</span>
                      <p className="text-xs text-[var(--color-neo-text-primary)] mt-0.5">{work.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[var(--color-neo-bg)] p-2 rounded-lg shadow-[var(--shadow-neo-pressed)]">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Cost</span>
                      <span className="block text-xs font-semibold text-[var(--color-neo-text-primary)]">{formatLKR(work.unitCost)} / {work.unitLabel}</span>
                    </div>
                    <div className="bg-[var(--color-neo-bg)] p-2 rounded-lg shadow-[var(--shadow-neo-pressed)]">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">Quantity</span>
                      <span className="block text-xs font-semibold text-[var(--color-neo-text-primary)]">
                        {work.completedUnits !== null ? `${work.completedUnits} / ` : ''}{work.totalUnits}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                     <div className="flex items-center gap-1.5 text-xs text-[var(--color-neo-text-secondary)]">
                        <Calendar size={13} className="shrink-0" />
                        <span className="truncate">{formatDateDisplay(work.startDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[var(--color-neo-text-secondary)]">
                        <Clock size={13} className="shrink-0" />
                        <span className="truncate">{formatDateDisplay(work.deadline)}</span>
                      </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {work.customAttributes.length > 0 && (
                    <div className="bg-[var(--color-neo-bg)] p-3 rounded-xl shadow-[var(--shadow-neo-pressed)]">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)] mb-2">Attributes</span>
                      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        {work.customAttributes.map(attr => (
                          <div key={attr.id}>
                            <span className="block text-[10px] text-[var(--color-neo-text-secondary)] truncate">{attr.label}</span>
                            <span className="block text-xs font-medium text-[var(--color-neo-text-primary)] truncate">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {work.notes && (
                    <div className="bg-[var(--color-neo-bg)] p-3 rounded-xl shadow-[var(--shadow-neo-pressed)]">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)] mb-1">Notes</span>
                      <p className="text-xs text-[var(--color-neo-text-primary)]">{work.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              {showAdminControls && (
                <div className="mt-5 flex justify-end gap-2 border-t border-[var(--color-neo-secondary)]/10 pt-4">
                   <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onEdit?.(work); }}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-[var(--color-neo-warning)]/10 text-[var(--color-neo-warning)] transition-all hover:bg-[var(--color-neo-warning)]/20 active:scale-95"
                  >
                    <Edit2 size={14} />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); onDelete?.(work); }}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold bg-[var(--color-neo-danger)]/10 text-[var(--color-neo-danger)] transition-all hover:bg-[var(--color-neo-danger)]/20 active:scale-95"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
