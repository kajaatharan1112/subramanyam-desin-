import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus } from "lucide-react";
import type { Bill, WorkflowTemplate } from '../../../types';
import type { UserRole } from '../../../types/permissions';
import { mockBillingRepository } from '../../../services/billing/mock-billing.repository';
import { MOCK_WORKFLOWS } from '../../../constants/mockData';
import { canViewAdminControls } from '../../../utils/permissions';
// @ts-ignore
import PrimaryButton from '../../buttons/PrimaryButton';
// @ts-ignore
import { showToast } from '../../feedback/Toast';

import BillCard from './BillCard';
import BillDetailsModal from './BillDetailsModal';

interface BillListProps {
  role: UserRole | null;
  onNavigate?: (_view: string) => void;
}

export default function BillList({ role, onNavigate: _onNavigate = () => {} }: BillListProps) {
  const [bills, setBills] = useState<Bill[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [viewingDetails, setViewingDetails] = useState(false);

  const showAdminControls = canViewAdminControls(role);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        const data = await mockBillingRepository.getBills();
        setBills(data);
      } catch (error) {
        showToast('error', 'Error', 'Failed to load bills.');
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const filtered = bills.filter((b) => {
    const billNum = b.billNumber.toLowerCase();
    const custName = b.customerName.toLowerCase();
    const searchTerm = search.toLowerCase();
    
    // Check if the user is a customer, they can only see their bills (mocking with customerId)
    if (role === 'customer' && b.customerId !== 'cust-001') { 
        // Note: For this demo, we assume the logged-in customer is cust-001
        // In a real app, we'd filter by the actual logged-in user's ID
        return false;
    }
    
    return billNum.includes(searchTerm) || custName.includes(searchTerm);
  });

  const getWorkflowForBill = (workflowId: string): WorkflowTemplate | null => {
    return MOCK_WORKFLOWS.find(w => w.id === workflowId) || null;
  };

  const handleView = (bill: Bill) => {
    setSelectedBill(bill);
    setViewingDetails(true);
  };

  const handleEdit = (bill: Bill) => {
    showToast('info', 'Edit Mode', `Editing functionality for ${bill.billNumber} will open the form here.`);
  };

  const handleDelete = async (bill: Bill) => {
    if (confirm(`Are you sure you want to delete ${bill.billNumber}?`)) {
        try {
            await mockBillingRepository.deleteBill(bill.id);
            setBills(bills.filter(b => b.id !== bill.id));
            showToast('success', 'Deleted', 'Bill deleted successfully.');
        } catch (error) {
            showToast('error', 'Error', 'Failed to delete bill.');
        }
    }
  };
  
  const handleDownload = (bill: Bill) => {
      showToast('info', 'Downloading', `Generating PDF document for ${bill.billNumber}...`);
      setTimeout(() => {
          showToast('success', 'Download Complete', `${bill.billNumber}.pdf has been saved.`);
      }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 md:p-8 max-w-7xl mx-auto space-y-6"
    >
      {/* Header & Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--color-neo-text-primary)]">
            {role === 'customer' ? 'My Bills' : 'Bills'} 
            {!loading && <span className="text-base text-[var(--color-neo-text-secondary)] ml-1">({filtered.length})</span>}
          </h1>
          <p className="text-[var(--color-neo-text-secondary)] text-sm font-medium mt-1">
             {role === 'customer' ? 'Track your active orders and invoices' : 'Manage your customer bills and invoices'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-neo-text-secondary)]" size={16} />
            <input
              type="text"
              placeholder="Search bills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-[var(--radius-neo-pill)] bg-[var(--color-neo-bg)] pl-10 pr-4 text-sm text-[var(--color-neo-text-primary)] shadow-[var(--shadow-neo-pressed)] outline-none transition-all placeholder:text-[var(--color-neo-text-secondary)] focus:ring-2 focus:ring-[var(--color-neo-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-neo-bg)]"
            />
          </div>
          {showAdminControls && (
            <PrimaryButton icon={<Plus size={16} />} onClick={() => showToast('info', 'Create Bill', 'Form opening soon')}>
              Add
            </PrimaryButton>
          )}
        </div>
      </div>

      {/* Bill Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch">
        <AnimatePresence>
          {loading ? (
             <div className="col-span-full py-16 text-center text-[var(--color-neo-text-secondary)] font-medium w-full animate-pulse">
                Loading bills...
             </div>
          ) : filtered.map((b) => (
            <BillCard
              key={b.id}
              bill={b}
              workflow={getWorkflowForBill(b.workflowId)}
              role={role}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </AnimatePresence>
      </div>

      {!loading && filtered.length === 0 && (
        <div className="py-16 text-center text-[var(--color-neo-text-secondary)] font-medium w-full">
          No bills found matching your search.
        </div>
      )}

      {/* Modals */}
      <AnimatePresence>
        {viewingDetails && selectedBill && (
          <BillDetailsModal
            bill={selectedBill}
            workflow={getWorkflowForBill(selectedBill.workflowId)}
            role={role}
            onClose={() => setViewingDetails(false)}
            onEditBill={handleEdit}
            onDownload={handleDownload}
            onAddWork={() => showToast('info', 'Add Work', 'Opening add work form...')}
            onEditWork={() => showToast('info', 'Edit Work', 'Opening edit work form...')}
            onDeleteWork={() => showToast('info', 'Delete Work', 'Deleting work...')}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
