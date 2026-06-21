import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  Bell, 
  Settings,
  LogOut,
  GraduationCap,
  ClipboardList,
  CreditCard,
  Bus,
  Library,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const user = localStorage.getItem('username');
    
    if (!role || !user) {
      navigate('/');
      return;
    }
    
    setUserRole(role);
    setUsername(user);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const dashboardStats = [
    { title: 'Total Students', value: '1247', icon: Users, color: 'text-primary' },
    { title: 'Active Teachers', value: '30', icon: BookOpen, color: 'text-secondary' },
    { title: 'Classes Today', value: '32', icon: Calendar, color: 'text-accent' },
    { title: 'Attendance Rate', value: '92.5%', icon: TrendingUp, color: 'text-success' },
  ];

  const quickActions = [
    { title: 'Student Management', desc: 'Manage student profiles & admissions', icon: Users, path: '/students' },
    { title: 'Academic Planning', desc: 'Classes, subjects & timetables', icon: BookOpen, path: '/academics' },
    { title: 'Examination System', desc: 'Marks entry & report cards', icon: ClipboardList, path: '/exams' },
    { title: 'Fee Management', desc: 'Collect fees & track payments', icon: CreditCard, path: '/fees' },
    { title: 'Library System', desc: 'Book management & tracking', icon: Library, path: '/library' },
    { title: 'Transport Management', desc: 'Bus routes & driver details', icon: Bus, path: '/transport' },
  ];

  const recentNotices = [
    { title: 'Annual Day Celebration', date: 'Dec 15, 2026', priority: 'high' },
    { title: 'Parent-Teacher Meeting', date: 'Dec 10, 2026', priority: 'medium' },
    { title: 'Winter Holidays Schedule', date: 'Dec 5, 2026', priority: 'low' },
    {title: 'New Library Books Arrived', date: 'Nov 30, 2026', priority: 'medium' },
    {title: 'School Reopening Post Holidays', date: 'Jan 5, 2027', priority: 'high' },
    {title: 'Sports Day Announcement', date: 'Jan 20, 2027', priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Header */}
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">GrowLead Public School </h1>
                <p className="text-xs text-muted-foreground">Government School Management System</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden sm:flex">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Welcome, {username}
              </span>
              <Button variant="ghost" size="sm" onClick={() => navigate('/notifications')}>
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-medium transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <Card 
                      key={action.title} 
                      className="border-2 hover:border-primary/30 transition-all duration-300 cursor-pointer group"
                      onClick={() => action.path && navigate(action.path)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <action.icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{action.title}</h3>
                            <p className="text-xs text-muted-foreground mt-1">{action.desc}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notices */}
          <div>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Recent Notices
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentNotices.map((notice, index) => (
                  <div key={index} className="border-l-4 border-primary/20 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium">{notice.title}</h4>
                      <Badge 
                        variant={notice.priority === 'high' ? 'destructive' : notice.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {notice.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{notice.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;