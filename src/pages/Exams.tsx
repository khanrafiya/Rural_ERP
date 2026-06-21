import { ClipboardList } from 'lucide-react';
import ModulePage from '@/components/ModulePage';

const Exams = () => (
  <ModulePage
    title="Examination System"
    subtitle="Marks entry & report cards"
    storageKey="exams"
    icon={<ClipboardList className="w-6 h-6" />}
    allowedRoles={['admin', 'principal', 'teacher']}
    fields={[
      { key: 'id', label: 'Exam ID', required: true },
      { key: 'examName', label: 'Exam', required: true },
      { key: 'className', label: 'Class', required: true },
      { key: 'subject', label: 'Subject' },
      { key: 'date', label: 'Date', type: 'date' },
      { key: 'maxMarks', label: 'Max Marks', type: 'number' },
    ]}
    seed={[
      { id: 'EX-001', examName: 'Mid Term', className: '10th A', subject: 'Mathematics', date: '2026-07-15', maxMarks: 100 },
      { id: 'EX-002', examName: 'Unit Test', className: '9th B', subject: 'Science', date: '2026-07-10', maxMarks: 50 },
    ]}
  />
);
export default Exams;
