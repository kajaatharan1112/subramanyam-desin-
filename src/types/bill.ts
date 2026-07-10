import type { BillWork } from './workflow';

export interface BillItem {
  name: string;
  qty: number;
  price: number;
  total: number;
}

export interface Bill {
  id: string;
  customerId: string;
  works: BillWork[];
  totalAmount: number | null;
  totalAmountStatus: 'hidden' | 'visible';
  status: 'pending' | 'completed' | 'overdue';
  issueDate: string;
  dueDate: string;
  description?: string;
  items?: BillItem[];
}
