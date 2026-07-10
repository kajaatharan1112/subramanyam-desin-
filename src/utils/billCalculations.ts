import type { BillWork, BillAmountStatus, WorkStageStatus } from '../types';

export const calculateTotalAmount = (works: BillWork[]): number | null => {
  if (!works || works.length === 0) return null;

  // Check if all works have amounts
  const allHaveAmounts = works.every(work => work.amount !== null && work.amount > 0);

  if (!allHaveAmounts) return null;

  return works.reduce((sum, work) => sum + (work.amount || 0), 0);
};

export const getBillAmountStatus = (works: BillWork[]): BillAmountStatus => {
  if (!works || works.length === 0) {
    return {
      hasAllAmounts: false,
      totalAmount: null,
      pendingWorks: [],
    };
  }

  const pendingWorks = works
    .filter(work => work.amount === null || work.amount === 0)
    .map(work => work.workName);

  const hasAllAmounts = pendingWorks.length === 0;
  const totalAmount = calculateTotalAmount(works);

  return {
    hasAllAmounts,
    totalAmount,
    pendingWorks,
  };
};

export const formatCurrency = (amount: number | null): string => {
  if (amount === null) return 'Amount Pending';
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const getStageProgress = (stageStatuses: WorkStageStatus[]): number => {
  if (!stageStatuses || stageStatuses.length === 0) return 0;
  const completed = stageStatuses.filter(s => s.status === 'completed').length;
  return Math.round((completed / stageStatuses.length) * 100);
};
