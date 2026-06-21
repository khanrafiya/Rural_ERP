import { CreditCard } from 'lucide-react';
import ModulePage from '@/components/ModulePage';

const Fees = () => (
  <ModulePage
    title="Fee Management"
    subtitle="Collect fees & track payments"
    storageKey="fees"
    icon={<CreditCard className="w-6 h-6" />}
    allowedRoles={['admin', 'principal']}
    fields={[
      { key: 'id', label: 'Receipt ID', required: true },
      { key: 'studentName', label: 'Student', required: true },
      { key: 'className', label: 'Class' },
      { key: 'amount', label: 'Amount', type: 'number', required: true },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'status', label: 'Status' },
    ]}
    seed={[
      { id: 'FEE-001', studentName: 'Arjun Singh', className: '10th A', amount: 5000, date: '2026-06-01', status: 'Paid' },
      { id: 'FEE-002', studentName: 'Simran Kaur', className: '9th B', amount: 4500, date: '2026-06-05', status: 'Pending' },
    ]}
  />
);
export default Fees;
