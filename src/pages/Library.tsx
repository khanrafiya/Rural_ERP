import { Library as LibIcon } from 'lucide-react';
import ModulePage from '@/components/ModulePage';

const Library = () => (
  <ModulePage
    title="Library System"
    subtitle="Book management & tracking"
    storageKey="library"
    icon={<LibIcon className="w-6 h-6" />}
    allowedRoles={['admin', 'principal', 'teacher']}
    fields={[
      { key: 'id', label: 'Book ID', required: true },
      { key: 'title', label: 'Title', required: true },
      { key: 'author', label: 'Author' },
      { key: 'category', label: 'Category' },
      { key: 'copies', label: 'Copies', type: 'number' },
      { key: 'status', label: 'Status' },
    ]}
    seed={[
      { id: 'BK-001', title: 'Mathematics Class 10', author: 'NCERT', category: 'Textbook', copies: 50, status: 'Available' },
      { id: 'BK-002', title: 'Science Class 10', author: 'NCERT', category: 'Textbook', copies: 45, status: 'Available' },
      { id: 'BK-003', title: 'English Literature Class 10', author: 'NCERT', category: 'Textbook', copies: 40, status: 'Available' },
      { id: 'BK-004', title: 'Social Science Class 10', author: 'NCERT', category: 'Textbook', copies: 38, status: 'Available' },
      { id: 'BK-005', title: 'Hindi Class 10', author: 'NCERT', category: 'Textbook', copies: 42, status: 'Available' },
      { id: 'BK-006', title: 'Mathematics Class 9', author: 'NCERT', category: 'Textbook', copies: 48, status: 'Available' },
      { id: 'BK-007', title: 'Science Class 9', author: 'NCERT', category: 'Textbook', copies: 44, status: 'Available' },
      { id: 'BK-008', title: 'English Grammar & Composition', author: 'Wren & Martin', category: 'Reference', copies: 25, status: 'Available' },
      { id: 'BK-009', title: 'The Diary of a Young Girl', author: 'Anne Frank', category: 'Literature', copies: 15, status: 'Available' },
      { id: 'BK-010', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', copies: 20, status: 'Available' },
      { id: 'BK-011', title: 'The Alchemist', author: 'Paulo Coelho', category: 'Fiction', copies: 12, status: 'Available' },
      { id: 'BK-012', title: 'General Knowledge 2025', author: 'Manohar Pandey', category: 'Reference', copies: 30, status: 'Available' },
      { id: 'BK-013', title: 'Computer Science Class 11', author: 'NCERT', category: 'Textbook', copies: 35, status: 'Available' },
      { id: 'BK-014', title: 'Physics Class 11', author: 'NCERT', category: 'Textbook', copies: 40, status: 'Available' },
      { id: 'BK-015', title: 'Chemistry Class 11', author: 'NCERT', category: 'Textbook', copies: 38, status: 'Available' },
      { id: 'BK-016', title: 'Biology Class 11', author: 'NCERT', category: 'Textbook', copies: 36, status: 'Available' },
      { id: 'BK-017', title: 'Atlas & Map Work', author: 'Oxford', category: 'Reference', copies: 18, status: 'Available' },
      { id: 'BK-018', title: 'Hindi Sahit', author: 'Bhai Vir Singh', category: 'Literature', copies: 20, status: 'Available' },
      { id: 'BK-019', title: 'My Experiments with Truth', author: 'Mahatma Gandhi', category: 'Biography', copies: 10, status: 'Available' },
      { id: 'BK-020', title: 'The Jungle Book', author: 'Rudyard Kipling', category: 'Fiction', copies: 14, status: 'Available' },
    ]}
  />
);
export default Library;