import { motion } from 'framer-motion';
import type { WorkflowTemplate } from '../../../types';

interface WorkflowStepperProps {
  workflow: WorkflowTemplate | null;
  currentStageId: string;
}

export default function WorkflowStepper({ workflow, currentStageId }: WorkflowStepperProps) {
  if (!workflow || !workflow.stages) return null;

  const currentIndex = workflow.stages.findIndex(s => s.id === currentStageId);

  return (
    <div className="flex w-full overflow-x-auto py-2 hide-scrollbar">
      <div className="flex min-w-max items-center gap-2">
        {workflow.stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          let bgClass = 'bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-pressed)] text-[var(--color-neo-text-secondary)]';
          if (isCompleted) bgClass = 'bg-[var(--color-neo-success)] text-white shadow-sm';
          if (isCurrent) bgClass = 'bg-[var(--color-neo-primary)] text-white shadow-[var(--shadow-neo-soft)]';

          return (
            <div key={stage.id} className="flex items-center">
              <motion.div
                className={`flex h-8 px-3 rounded-full items-center justify-center text-xs font-semibold ${bgClass} whitespace-nowrap transition-colors`}
                initial={false}
                animate={{ scale: isCurrent ? 1.05 : 1 }}
              >
                {stage.name}
              </motion.div>
              {index < workflow.stages.length - 1 && (
                <div className={`h-1 w-6 mx-1 rounded-full ${isCompleted ? 'bg-[var(--color-neo-success)]/40' : 'bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-pressed)]'}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
