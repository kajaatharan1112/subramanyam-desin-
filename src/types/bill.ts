import type { BillWork } from './workflow';

export interface BillItem {
  name: string;
  qty: number;
  price: number;
  total: number;
}

export interface BillAdjustment {
  id: string;
  label: string;
  operation: 'ADD' | 'SUBTRACT';
  amount: number;
  displayOrder: number;
}

export interface Bill {
  id: string;
  billNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string | null;
  customerPhone: string | null;
  billStatusId: string;
  workflowId: string;
  orderDate: string;
  deadline: string;
  works: BillWork[];
  adjustments: BillAdjustment[];
  paidAmount: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  
  // Backwards compatibility for old data
  totalAmount?: number | null;
  totalAmountStatus?: 'hidden' | 'visible';
  status?: string;
  issueDate?: string;
  dueDate?: string;
  description?: string;
  items?: BillItem[];
}
