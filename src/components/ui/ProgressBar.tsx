import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0 to 100
  height?: number;
  colorClass?: string;
  trackClass?: string;
}

export default function ProgressBar({
  value,
  height = 8,
  colorClass = 'bg-[var(--color-neo-primary)]',
  trackClass = 'bg-[var(--color-neo-surface)] shadow-[var(--shadow-neo-pressed)]'
}: ProgressBarProps) {
  // Clamp between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div 
      className={`w-full overflow-hidden rounded-full ${trackClass}`} 
      style={{ height: `${height}px` }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clampedValue}
    >
      <motion.div
        className={`h-full rounded-full ${colorClass}`}
        initial={{ width: 0 }}
        animate={{ width: `${clampedValue}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}
