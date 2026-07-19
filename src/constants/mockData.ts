import type { WorkflowTemplate, Bill } from '../types';
import type { OrganizationSettings } from '../types/organization-settings';
export { MOCK_BILL_STATUSES } from './bill-statuses';

export const MOCK_ORG_SETTINGS: OrganizationSettings = {
  organizationId: 'org-1',
  organizationName: 'ONEVO Billing',
  currencyCode: 'LKR',
  currencyLocale: 'en-LK',
  currencyDisplayMode: 'code',
  defaultBillStatusId: 'status-unpaid',
  defaultWorkflowId: 'wf-printing-standard'
};

export const MOCK_WORKFLOWS: WorkflowTemplate[] = [
  {
    id: 'wf-printing-standard',
    name: 'Standard Production Workflow',
    description: 'General 5-stage printing production workflow',
    isActive: true,
    createdAt: '2024-06-15',
    updatedAt: '2024-07-01',
    stages: [
      { id: 'stage-typing', name: 'Typing', order: 1, description: 'Content entry', colorToken: 'neutral', isFinal: false },
      { id: 'stage-proof', name: 'Proof', order: 2, description: 'Review phase', colorToken: 'warning', isFinal: false },
      { id: 'stage-printing', name: 'Printing', order: 3, description: 'Physical printing', colorToken: 'primary', isFinal: false },
      { id: 'stage-packaging', name: 'Packaging', order: 4, description: 'Sorting & packing', colorToken: 'warning', isFinal: false },
      { id: 'stage-ready', name: 'Ready', order: 5, description: 'Ready for pickup', colorToken: 'success', isFinal: true },
    ]
  },
  {
    id: 'wf-simple',
    name: 'Simple 3-Stage Workflow',
    description: 'For quick turnaround items',
    isActive: true,
    createdAt: '2024-06-20',
    updatedAt: '2024-07-01',
    stages: [
      { id: 'stage-prep', name: 'Preparation', order: 1, description: null, colorToken: 'warning', isFinal: false },
      { id: 'stage-exec', name: 'Execution', order: 2, description: null, colorToken: 'primary', isFinal: false },
      { id: 'stage-done', name: 'Done', order: 3, description: null, colorToken: 'success', isFinal: true },
    ]
  }
];

export const MOCK_CUSTOMERS = [
  {
    id: 'cust-001',
    name: 'Arun Kumar',
    email: 'arun@example.com',
    phone: '+94 77 000 0000',
    address: 'Colombo 03',
    company: 'AK Enterprises',
    notes: 'Regular customer',
    createdAt: '2026-01-15',
    active: true,
  },
  {
    id: 'cust-002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+94 71 111 1111',
    address: 'Kandy',
    company: 'Priya Designs',
    notes: 'Always needs rush delivery',
    createdAt: '2026-02-20',
    active: true,
  }
];

export const MOCK_BILLS: Bill[] = [
  {
    id: 'bill-001',
    billNumber: 'INV-001',
    customerId: 'cust-001',
    customerName: 'Arun Kumar',
    customerEmail: 'arun@example.com',
    customerPhone: '+94 77 000 0000',
    billStatusId: 'status-partially-paid',
    workflowId: 'wf-printing-standard',
    orderDate: '2026-07-01T00:00:00Z',
    deadline: '2026-08-01T00:00:00Z',
    paidAmount: 5000,
    notes: 'Deliver all completed papers together.',
    createdAt: '2026-07-01T10:00:00Z',
    updatedAt: '2026-07-02T10:00:00Z',
    adjustments: [
      {
        id: 'adjustment-service',
        label: 'Service Charge',
        operation: 'ADD',
        amount: 500,
        displayOrder: 1
      },
      {
        id: 'adjustment-discount',
        label: 'Special Discount',
        operation: 'SUBTRACT',
        amount: 250,
        displayOrder: 2
      }
    ],
    works: [
      {
        id: 'work-tamil-paper',
        billId: 'bill-001',
        name: 'Tamil Exam Paper Printing',
        serviceCategory: 'Exam Paper Printing',
        description: 'Tamil examination papers for the term assessment.',
        unitLabel: 'copies',
        unitCost: 5,
        totalUnits: 1000,
        completedUnits: 650,
        currentStageId: 'stage-printing',
        startDate: '2026-07-01T00:00:00Z',
        deadline: '2026-07-25T00:00:00Z',
        notes: null,
        createdAt: '2026-07-01T10:00:00Z',
        customAttributes: [
          { id: 'attr-1', label: 'Paper Size', value: 'A4', displayOrder: 1 },
          { id: 'attr-2', label: 'Colour Mode', value: 'Black and White', displayOrder: 2 },
          { id: 'attr-3', label: 'Paper GSM', value: '80 GSM', displayOrder: 3 }
        ]
      },
      {
        id: 'work-history-paper',
        billId: 'bill-001',
        name: 'History Exam Paper Printing',
        serviceCategory: 'Exam Paper Printing',
        description: 'History examination papers.',
        unitLabel: 'copies',
        unitCost: 6,
        totalUnits: 1000,
        completedUnits: 300,
        currentStageId: 'stage-proof',
        startDate: '2026-07-02T00:00:00Z',
        deadline: '2026-07-27T00:00:00Z',
        notes: null,
        createdAt: '2026-07-02T10:00:00Z',
        customAttributes: [
          { id: 'attr-4', label: 'Paper Size', value: 'A4', displayOrder: 1 }
        ]
      }
    ]
  },
  {
    id: 'bill-002',
    billNumber: 'INV-002',
    customerId: 'cust-002',
    customerName: 'Priya Sharma',
    customerEmail: 'priya@example.com',
    customerPhone: '+94 71 111 1111',
    billStatusId: 'status-unpaid',
    workflowId: 'wf-simple',
    orderDate: '2026-07-05T00:00:00Z',
    deadline: '2026-07-15T00:00:00Z',
    paidAmount: 0,
    notes: null,
    createdAt: '2026-07-05T10:00:00Z',
    updatedAt: '2026-07-05T10:00:00Z',
    adjustments: [],
    works: [
      {
        id: 'work-flyers',
        billId: 'bill-002',
        name: 'Promotional Flyers',
        serviceCategory: 'Marketing Materials',
        description: 'A5 color flyers',
        unitLabel: 'items',
        unitCost: 15,
        totalUnits: 2000,
        completedUnits: 0,
        currentStageId: 'stage-prep',
        startDate: '2026-07-06T00:00:00Z',
        deadline: '2026-07-14T00:00:00Z',
        notes: null,
        createdAt: '2026-07-05T10:00:00Z',
        customAttributes: []
      }
    ]
  }
];

export const MOCK_ACTIVITY = [];
export const MOCK_NOTIFICATIONS = [];
export const MOCK_REVENUE = [];

// Backwards compatibility export just in case
export const WORKFLOW_TEMPLATES = MOCK_WORKFLOWS;
