import ProgressBar from '../../ui/ProgressBar';

interface BillProgressBarProps {
  progress: number;
}

export default function BillProgressBar({ progress }: BillProgressBarProps) {
  return (
    <div className="w-full mt-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-neo-text-secondary)]">
          Work Progress
        </span>
        <span className="text-xs font-semibold text-[var(--color-neo-text-primary)]">
          {progress}%
        </span>
      </div>
      <ProgressBar value={progress} />
    </div>
  );
}
