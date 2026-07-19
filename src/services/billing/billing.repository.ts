import type { Bill, BillWork } from '../../types';

export interface BillingRepository {
  getBills(): Promise<Bill[]>;
  getBillById(id: string): Promise<Bill | null>;
  createBill(bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>): Promise<Bill>;
  updateBill(id: string, updates: Partial<Bill>): Promise<Bill>;
  deleteBill(id: string): Promise<void>;
  
  addWork(billId: string, work: Omit<BillWork, 'id' | 'createdAt'>): Promise<BillWork>;
  updateWork(billId: string, workId: string, updates: Partial<BillWork>): Promise<BillWork>;
  deleteWork(billId: string, workId: string): Promise<void>;
}
