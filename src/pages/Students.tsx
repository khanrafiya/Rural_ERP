import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search,
  Plus,
  Users,
  ArrowLeft,
  Eye,
  Edit,
  Trash2,
  GraduationCap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '@/components/StudentForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

// Updated student interface
interface Student {
  id: string;
  name: string;
  nameEnglish: string;
  class: string;
  rollNo: string;
  fatherName: string;
  phone: string;
  village: string;
  status: string;
  dateOfBirth?: string;
  address?: string;
  motherName?: string;
  gender?: string;
  category?: string;
}

// Mock student data with enhanced fields
const mockStudents: Student[] = [
  {
    id: 'STU001',
    name: 'Arjun Singh',
    class: '10th A',
    rollNo: '001',
    fatherName: 'Jasbir Singh',
    motherName: 'Kulwinder Kaur',
    phone: '9876543210',
    village: 'Bathinda',
    address: 'House No. 123, Gali No. 5, Bathinda',
    status: 'Active',
    dateOfBirth: '2007-05-15',
    gender: 'Male',
    category: 'General'
  },
  {
    id: 'STU002', 
    name: 'Simran Kaur',
    class: '9th B',
    rollNo: '015',
    fatherName: 'Harpreet Singh',
    motherName: 'Rajinder Kaur',
    phone: '9876543211',
    village: 'Patiala',
    address: 'Village Patiala, Tehsil Patiala',
    status: 'Active',
    dateOfBirth: '2008-08-22',
    gender: 'Female',
    category: 'OBC'
  },
  {
    id: 'STU003',
    name: 'Rajveer Singh',
    class: '8th C',
    rollNo: '023',
    fatherName: 'Kuldeep Singh',
    motherName: 'Manpreet Kaur',
    phone: '9876543212',
    village: 'Amritsar',
    address: 'Near Gurudwara, Amritsar Rural',
    status: 'Active',
    dateOfBirth: '2009-12-10',
    gender: 'Male',
    category: 'SC'
  }
];

const Students = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<Student[]>(() => {
    const stored = localStorage.getItem('students');
    if (stored) { try { return JSON.parse(stored); } catch {} }
    return mockStudents;
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | undefined>();
  const [formMode, setFormMode] = useState<'add' | 'edit'>('add');
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [classFilter, setClassFilter] = useState<string>('');
  const navigate = useNavigate();
  const { toast } = useToast();
  const role = localStorage.getItem('userRole') || '';
  const canEdit = ['admin', 'principal', 'teacher'].includes(role);

  useEffect(() => {
    if (!localStorage.getItem('userRole')) navigate('/');
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  const classes = Array.from(new Set(students.map(s => s.class)));

  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.includes(searchTerm) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !classFilter || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = () => {
    setFormMode('add');
    setSelectedStudent(undefined);
    setIsFormOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setFormMode('edit');
    setSelectedStudent(student);
    setIsFormOpen(true);
  };

  const handleDeleteStudent = (studentId: string) => {
    const studentToDelete = students.find(s => s.id === studentId);
    if (window.confirm(`Are you sure you want to delete ${studentToDelete?.name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== studentId));
      toast({
        title: "Student Deleted",
        description: `${studentToDelete?.name} has been removed from the system.`,
        variant: "destructive"
      });
    }
  };

  const handleSaveStudent = (studentData: Student) => {
    if (formMode === 'add') {
      setStudents(prev => [...prev, studentData]);
    } else {
      setStudents(prev => 
        prev.map(s => s.id === studentData.id ? studentData : s)
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/dashboard')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">Student Management</h1>
                  <p className="text-xs text-muted-foreground">Manage student profiles and admissions</p>
                </div>
              </div>
            </div>
            
            {canEdit && (
              <Button 
                className="bg-gradient-to-r from-primary to-primary-glow gap-2"
                onClick={handleAddStudent}
              >
                <Plus className="w-4 h-4" />
                Add New Student
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Students</p>
                  <p className="text-2xl font-bold mt-1">1,247</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Present Today</p>
                  <p className="text-2xl font-bold mt-1">1,154</p>
                </div>
                <GraduationCap className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">New Admissions</p>
                  <p className="text-2xl font-bold mt-1">23</p>
                </div>
                <Plus className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-medium transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Attendance Rate</p>
                  <p className="text-2xl font-bold mt-1">92.5%</p>
                </div>
                <Badge className="bg-success text-success-foreground">
                  Excellent
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6 shadow-medium">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, student ID, roll number, or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="border rounded-md px-3 py-2 bg-background text-sm"
              >
                <option value="">All Classes</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Student Records ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredStudents.map((student) => (
                <div 
                  key={student.id} 
                  className="border rounded-lg p-4 hover:border-primary/30 transition-all duration-300 bg-card"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-lg">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">Name: {student.nameEnglish}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Student ID:</span>
                          <p className="font-medium">{student.id}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Class:</span>
                          <p className="font-medium">{student.class}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Roll No:</span>
                          <p className="font-medium">{student.rollNo}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Village:</span>
                          <p className="font-medium">{student.village}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Father's Name:</span>
                          <p className="font-medium">{student.fatherName}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Phone:</span>
                          <p className="font-medium">{student.phone}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant={student.status === 'Active' ? 'default' : 'secondary'}>
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-2 hover-scale" onClick={() => setViewStudent(student)}>
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      {canEdit && (
                        <>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2 hover-scale"
                            onClick={() => handleEditStudent(student)}
                          >
                            <Edit className="w-4 h-4" />
                            Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-2 text-destructive hover:text-destructive hover-scale"
                            onClick={() => handleDeleteStudent(student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No students found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Student Form Modal */}
        <StudentForm
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveStudent}
          student={selectedStudent}
          mode={formMode}
        />

        {/* View Modal */}
        <Dialog open={!!viewStudent} onOpenChange={() => setViewStudent(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Student Details</DialogTitle></DialogHeader>
            {viewStudent && (
              <div className="space-y-2 text-sm">
                {Object.entries(viewStudent).map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground capitalize">{k}</span>
                    <span className="font-medium">{String(v)}</span>
                  </div>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Students;