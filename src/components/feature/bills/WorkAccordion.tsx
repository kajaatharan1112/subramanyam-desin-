import { useState } from 'react';
import type { BillWork, WorkflowTemplate } from '../../../types';
import type { UserRole } from '../../../types/permissions';
import WorkAccordionItem from './WorkAccordionItem';

interface WorkAccordionProps {
  works: BillWork[];
  workflow: WorkflowTemplate | null;
  role: UserRole | null;
  onEditWork?: (work: BillWork) => void;
  onDeleteWork?: (work: BillWork) => void;
}

export default function WorkAccordion({ works, workflow, role, onEditWork, onDeleteWork }: WorkAccordionProps) {
  const [openId, setOpenId] = useState<string | null>(works.length > 0 ? works[0].id : null);

  const handleToggle = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  if (works.length === 0) {
    return (
      <div className="py-8 text-center text-sm font-medium text-[var(--color-neo-text-secondary)] bg-[var(--color-neo-surface)] rounded-2xl border border-[var(--color-neo-secondary)]/10 border-dashed">
        No works added yet.
      </div>
    );
  }

  return (
    <div className="w-full">
      {works.map((work) => (
        <WorkAccordionItem
          key={work.id}
          work={work}
          workflow={workflow}
          role={role}
          isOpen={openId === work.id}
          onToggle={() => handleToggle(work.id)}
          onEdit={onEditWork}
          onDelete={onDeleteWork}
        />
      ))}
    </div>
  );
}
