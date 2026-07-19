import type { Bill, BillWork, BillAdjustment, WorkflowTemplate } from '../types';

export const calcWorkStageProgress = (work: BillWork, workflow: WorkflowTemplate): number => {
  if (!workflow || !workflow.stages || workflow.stages.length === 0) return 0;
  
  const stage = workflow.stages.find(s => s.id === work.currentStageId);
  if (!stage) return 0;

  const progress = (stage.order / workflow.stages.length) * 100;
  return Math.round(progress);
};

export const calcBillWorkProgress = (bill: Bill, workflow: WorkflowTemplate | null): number => {
  if (!bill.works || bill.works.length === 0 || !workflow) return 0;
  
  const totalProgress = bill.works.reduce((sum, work) => {
    return sum + calcWorkStageProgress(work, workflow);
  }, 0);

  return Math.round(totalProgress / bill.works.length);
};

export const calcWorkTotalCost = (work: BillWork): number => {
  const cost = work.unitCost * work.totalUnits;
  return isNaN(cost) ? 0 : cost;
};

export const calcWorksSubtotal = (works: BillWork[]): number => {
  if (!works || works.length === 0) return 0;
  return works.reduce((sum, work) => sum + calcWorkTotalCost(work), 0);
};

export const calcAdjustmentTotal = (adjustments: BillAdjustment[]): number => {
  if (!adjustments || adjustments.length === 0) return 0;
  return adjustments.reduce((sum, adj) => {
    return adj.operation === 'ADD' ? sum + adj.amount : sum - adj.amount;
  }, 0);
};

export const calcTotalAmount = (bill: Bill): number => {
  const subtotal = calcWorksSubtotal(bill.works || []);
  const adjustments = calcAdjustmentTotal(bill.adjustments || []);
  return subtotal + adjustments;
};

export const calcPendingAmount = (bill: Bill): number => {
  const total = calcTotalAmount(bill);
  const pending = total - (bill.paidAmount || 0);
  return Math.max(0, pending);
};

// Backwards compatibility
export const calculateTotalAmount = (works: any[]): number | null => {
  if (!works || works.length === 0) return null;
  const allHaveAmounts = works.every(work => work.amount !== null && work.amount > 0);
  if (!allHaveAmounts) return null;
  return works.reduce((sum, work) => sum + (work.amount || 0), 0);
};

export const getStageProgress = (stageStatuses: any[]): number => {
  if (!stageStatuses || stageStatuses.length === 0) return 0;
  const completed = stageStatuses.filter(s => s.status === 'completed').length;
  return Math.round((completed / stageStatuses.length) * 100);
};
