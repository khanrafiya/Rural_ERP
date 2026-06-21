import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [schoolName, setSchoolName] = useState('GroeLead Public School');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem('username');
    const r = localStorage.getItem('userRole');
    if (!u || !r) { navigate('/'); return; }
    setUsername(u); setRole(r);
    setSchoolName(localStorage.getItem('schoolName') || 'GrowLead Public School');
    setNotifications(localStorage.getItem('notifications') !== 'false');
    const dm = localStorage.getItem('darkMode') === 'true';
    setDarkMode(dm);
    document.documentElement.classList.toggle('dark', dm);
  }, [navigate]);

  const save = () => {
    localStorage.setItem('username', username);
    localStorage.setItem('schoolName', schoolName);
    localStorage.setItem('notifications', String(notifications));
    localStorage.setItem('darkMode', String(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
    toast({ title: 'Settings saved', description: 'Your preferences have been updated.' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white">
                <SettingsIcon className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Settings</h1>
                <p className="text-xs text-muted-foreground">Manage your account & preferences</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <Card>
          <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Username</Label><Input value={username} onChange={e => setUsername(e.target.value)} /></div>
            <div><Label>Role</Label><Input value={role} disabled /></div>
            <div><Label>School Name</Label><Input value={schoolName} onChange={e => setSchoolName(e.target.value)} /></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div><Label>Email Notifications</Label><p className="text-sm text-muted-foreground">Receive updates and alerts</p></div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex justify-between items-center">
              <div><Label>Dark Mode</Label><p className="text-sm text-muted-foreground">Toggle dark theme</p></div>
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={save} className="bg-gradient-to-r from-primary to-primary-glow">Save Changes</Button>
        </div>
      </main>
    </div>
  );
};
export default Settings;
