import { BookOpen } from 'lucide-react';
import ModulePage from '@/components/ModulePage';

const Academics = () => (
  <ModulePage
    title="Academic Planning"
    subtitle="Classes, subjects & timetables"
    storageKey="academics"
    icon={<BookOpen className="w-6 h-6" />}
    allowedRoles={['admin', 'principal', 'teacher']}
    fields={[
      { key: 'id', label: 'Class ID', required: true },
      { key: 'className', label: 'Class', required: true },
      { key: 'subject', label: 'Subject', required: true },
      { key: 'teacher', label: 'Teacher' },
      { key: 'timing', label: 'Timing' },
      { key: 'room', label: 'Room' },
    ]}
    seed={[
      { id: 'CLS-10A', className: '10th A', subject: 'Mathematics', teacher: 'Mr. Sharma', timing: '9:00-10:00 AM', room: 'Room 101' },
      { id: 'CLS-9B', className: '9th B', subject: 'Science', teacher: 'Ms. Kaur', timing: '10:15-11:15 AM', room: 'Lab 1' },
      { id: 'CLS-8C', className: '8th C', subject: 'English', teacher: 'Mr. Singh', timing: '11:30-12:30 PM', room: 'Room 203' },
    ]}
  />
);
export default Academics;
