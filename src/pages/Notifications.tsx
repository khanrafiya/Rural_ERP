import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Bell, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notice { id: string; title: string; message: string; date: string; priority: 'high' | 'medium' | 'low'; read: boolean; }

const seed: Notice[] = [
  { id: 'N1', title: 'Annual Day Celebration', message: 'Annual day celebration on Dec 15. All staff & students must attend.', date: '2026-06-18', priority: 'high', read: false },
  { id: 'N2', title: 'Parent-Teacher Meeting', message: 'PTM scheduled for next Saturday.', date: '2026-06-15', priority: 'medium', read: false },
  { id: 'N3', title: 'Winter Holidays Schedule', message: 'School closes Dec 25 - Jan 5.', date: '2026-06-10', priority: 'low', read: true },
];

const Notifications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    if (!localStorage.getItem('userRole')) { navigate('/'); return; }
    const stored = localStorage.getItem('notices');
    if (stored) { try { setNotices(JSON.parse(stored)); return; } catch {} }
    setNotices(seed);
    localStorage.setItem('notices', JSON.stringify(seed));
  }, [navigate]);

  const persist = (next: Notice[]) => { setNotices(next); localStorage.setItem('notices', JSON.stringify(next)); };

  const markRead = (id: string) => persist(notices.map(n => n.id === id ? { ...n, read: true } : n));
  const markAll = () => { persist(notices.map(n => ({ ...n, read: true }))); toast({ title: 'All marked as read' }); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white">
                  <Bell className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Notifications</h1>
                  <p className="text-xs text-muted-foreground">{notices.filter(n => !n.read).length} unread</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={markAll} className="gap-2"><Check className="w-4 h-4" /> Mark all read</Button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader><CardTitle>All Notices</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {notices.map(n => (
              <div key={n.id} className={`border-l-4 pl-4 py-3 rounded ${n.read ? 'border-muted bg-muted/30' : 'border-primary bg-primary/5'}`}>
                <div className="flex justify-between items-start gap-3 mb-1">
                  <h4 className="font-medium">{n.title}</h4>
                  <Badge variant={n.priority === 'high' ? 'destructive' : n.priority === 'medium' ? 'default' : 'secondary'}>{n.priority}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{n.message}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                  {!n.read && <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}>Mark read</Button>}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
export default Notifications;
