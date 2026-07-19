export interface WorkflowStage {
  id: string;
  name: string;
  order: number;
  description: string | null;
  colorToken: string;
  isFinal: boolean;
  
  // Old compat
  isFinalStage?: boolean;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  stages: WorkflowStage[];
  createdAt: string;
  updatedAt: string;
  
  // Old compat
  workType?: string;
  status?: string;
}

export interface WorkCustomAttribute {
  id: string;
  label: string;
  value: string;
  displayOrder: number;
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
  name: string;
  serviceCategory: string;
  description: string | null;
  unitLabel: string;
  unitCost: number;
  totalUnits: number;
  completedUnits: number | null;
  currentStageId: string;
  startDate: string | null;
  deadline: string | null;
  customAttributes: WorkCustomAttribute[];
  notes: string | null;
  createdAt: string;
  
  // Old compat
  workName?: string;
  workflowTemplateId?: string;
  workflowName?: string;
  stageStatuses?: WorkStageStatus[];
  amount?: number | null;
  paymentStatus?: string;
}

export interface BillAmountStatus {
  hasAllAmounts: boolean;
  totalAmount: number | null;
  pendingWorks: string[];
}
