import { useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface FieldDef {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'date';
  required?: boolean;
}

interface ModulePageProps {
  title: string;
  subtitle: string;
  storageKey: string;
  icon: ReactNode;
  fields: FieldDef[];
  seed: Record<string, any>[];
  primaryKey?: string;
  allowedRoles?: string[]; // roles that can add/edit/delete
}

const ModulePage = ({ title, subtitle, storageKey, icon, fields, seed, primaryKey = 'id', allowedRoles }: ModulePageProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const role = localStorage.getItem('userRole') || '';
  const canEdit = !allowedRoles || allowedRoles.includes(role);

  const [items, setItems] = useState<Record<string, any>[]>([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [viewItem, setViewItem] = useState<Record<string, any> | null>(null);
  const [editing, setEditing] = useState<Record<string, any> | null>(null);
  const [form, setForm] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!localStorage.getItem('userRole')) { navigate('/'); return; }
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try { setItems(JSON.parse(stored)); return; } catch {}
    }
    setItems(seed);
    localStorage.setItem(storageKey, JSON.stringify(seed));
  }, [storageKey]);

  const persist = (next: Record<string, any>[]) => {
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const openAdd = () => {
    const blank: Record<string, any> = {};
    fields.forEach(f => (blank[f.key] = ''));
    blank[primaryKey] = blank[primaryKey] || `${storageKey.toUpperCase()}-${Date.now().toString().slice(-5)}`;
    setForm(blank);
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (item: Record<string, any>) => {
    setForm({ ...item });
    setEditing(item);
    setOpen(true);
  };

  const save = () => {
    for (const f of fields) {
      if (f.required && !form[f.key]) {
        toast({ title: 'Missing field', description: `${f.label} is required`, variant: 'destructive' });
        return;
      }
    }
    if (editing) {
      persist(items.map(i => (i[primaryKey] === editing[primaryKey] ? form : i)));
      toast({ title: 'Updated', description: `${title} record updated.` });
    } else {
      persist([...items, form]);
      toast({ title: 'Added', description: `New ${title} record added.` });
    }
    setOpen(false);
  };

  const remove = (item: Record<string, any>) => {
    if (!window.confirm('Delete this record?')) return;
    persist(items.filter(i => i[primaryKey] !== item[primaryKey]));
    toast({ title: 'Deleted', description: 'Record removed.', variant: 'destructive' });
  };

  const filtered = items.filter(i =>
    Object.values(i).some(v => String(v).toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      <header className="bg-card border-b shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center text-white">
                  {icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold">{title}</h1>
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
              </div>
            </div>
            {canEdit && (
              <Button onClick={openAdd} className="bg-gradient-to-r from-primary to-primary-glow gap-2">
                <Plus className="w-4 h-4" /> Add New
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6 shadow-medium">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-medium">
          <CardHeader><CardTitle>Records ({filtered.length})</CardTitle></CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No records found.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map(item => (
                  <div key={item[primaryKey]} className="border rounded-lg p-4 hover:border-primary/30 transition-all">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm flex-1">
                        {fields.slice(0, 6).map(f => (
                          <div key={f.key}>
                            <span className="text-muted-foreground">{f.label}:</span>
                            <p className="font-medium">{String(item[f.key] ?? '-')}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-2" onClick={() => setViewItem(item)}>
                          <Eye className="w-4 h-4" /> View
                        </Button>
                        {canEdit && (
                          <>
                            <Button variant="outline" size="sm" className="gap-2" onClick={() => openEdit(item)}>
                              <Edit className="w-4 h-4" /> Edit
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 text-destructive" onClick={() => remove(item)}>
                              <Trash2 className="w-4 h-4" /> Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? 'Edit' : 'Add'} {title}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-2">
            {fields.map(f => (
              <div key={f.key} className="space-y-1">
                <Label>{f.label}{f.required && ' *'}</Label>
                <Input
                  type={f.type || 'text'}
                  value={form[f.key] ?? ''}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={save}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={!!viewItem} onOpenChange={() => setViewItem(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{title} Details</DialogTitle></DialogHeader>
          {viewItem && (
            <div className="space-y-2">
              {fields.map(f => (
                <div key={f.key} className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-medium">{String(viewItem[f.key] ?? '-')}</span>
                </div>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setViewItem(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ModulePage;
