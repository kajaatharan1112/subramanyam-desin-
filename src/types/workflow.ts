export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  isFinalStage: boolean;
}

export interface WorkflowTemplate {
  id: string;
  workType: string;
  name: string;
  stages: WorkflowStage[];
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface WorkStageStatus {
  stageId: string;
  stageName: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedAt: string | null;
}

export interface BillWork {
  id: string;
  billId: string;
  workName: string;
  workflowTemplateId: string;
  workflowName: string;
  currentStageId: string;
  stageStatuses: WorkStageStatus[];
  amount: number | null;
  paymentStatus: 'pending' | 'partial' | 'paid';
  createdAt: string;
}

export interface BillAmountStatus {
  hasAllAmounts: boolean;
  totalAmount: number | null;
  pendingWorks: string[];
}
