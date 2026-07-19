export interface BillStatusDefinition {
  id: string;
  name: string;
  colorToken: string; // 'success', 'warning', 'danger', 'neutral', 'primary', or custom hex
  isSystemDefault: boolean;
  isActive: boolean;
  sortOrder: number;
}

export const MOCK_BILL_STATUSES: BillStatusDefinition[] = [
  { id: 'status-draft', name: 'Draft', colorToken: 'neutral', isSystemDefault: true, isActive: true, sortOrder: 1 },
  { id: 'status-unpaid', name: 'Unpaid', colorToken: 'warning', isSystemDefault: true, isActive: true, sortOrder: 2 },
  { id: 'status-partially-paid', name: 'Partially Paid', colorToken: 'primary', isSystemDefault: true, isActive: true, sortOrder: 3 },
  { id: 'status-paid', name: 'Paid', colorToken: 'success', isSystemDefault: true, isActive: true, sortOrder: 4 },
  { id: 'status-overdue', name: 'Overdue', colorToken: 'danger', isSystemDefault: true, isActive: true, sortOrder: 5 },
  { id: 'status-cancelled', name: 'Cancelled', colorToken: 'neutral', isSystemDefault: true, isActive: true, sortOrder: 6 },
];
