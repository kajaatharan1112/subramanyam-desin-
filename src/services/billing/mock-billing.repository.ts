import type { Bill, BillWork } from '../../types';
import type { BillingRepository } from './billing.repository';
import { MOCK_BILLS } from '../../constants/mockData';

// In-memory store for the current session
let billsStore = [...MOCK_BILLS];

const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

export const mockBillingRepository: BillingRepository = {
  getBills: async () => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...billsStore];
  },
  
  getBillById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const bill = billsStore.find(b => b.id === id);
    return bill ? { ...bill } : null;
  },
  
  createBill: async (billData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newBill: Bill = {
      ...billData,
      id: generateId('bill'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    billsStore.push(newBill);
    return newBill;
  },
  
  updateBill: async (id, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = billsStore.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Bill not found');
    
    billsStore[index] = {
      ...billsStore[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return { ...billsStore[index] };
  },
  
  deleteBill: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    billsStore = billsStore.filter(b => b.id !== id);
  },
  
  addWork: async (billId, workData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const billIndex = billsStore.findIndex(b => b.id === billId);
    if (billIndex === -1) throw new Error('Bill not found');
    
    const newWork: BillWork = {
      ...workData,
      id: generateId('work'),
      createdAt: new Date().toISOString(),
    };
    
    billsStore[billIndex].works.push(newWork);
    billsStore[billIndex].updatedAt = new Date().toISOString();
    return newWork;
  },
  
  updateWork: async (billId, workId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const billIndex = billsStore.findIndex(b => b.id === billId);
    if (billIndex === -1) throw new Error('Bill not found');
    
    const workIndex = billsStore[billIndex].works.findIndex(w => w.id === workId);
    if (workIndex === -1) throw new Error('Work not found');
    
    billsStore[billIndex].works[workIndex] = {
      ...billsStore[billIndex].works[workIndex],
      ...updates,
    };
    billsStore[billIndex].updatedAt = new Date().toISOString();
    return { ...billsStore[billIndex].works[workIndex] };
  },
  
  deleteWork: async (billId, workId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const billIndex = billsStore.findIndex(b => b.id === billId);
    if (billIndex === -1) throw new Error('Bill not found');
    
    billsStore[billIndex].works = billsStore[billIndex].works.filter(w => w.id !== workId);
    billsStore[billIndex].updatedAt = new Date().toISOString();
  }
};
