import { Bus } from 'lucide-react';
import ModulePage from '@/components/ModulePage';

const Transport = () => (
  <ModulePage
    title="Transport Management"
    subtitle="Bus routes & driver details"
    storageKey="transport"
    icon={<Bus className="w-6 h-6" />}
    allowedRoles={['admin', 'principal']}
    fields={[
      { key: 'id', label: 'Bus No', required: true },
      { key: 'route', label: 'Route', required: true },
      { key: 'driver', label: 'Driver' },
      { key: 'phone', label: 'Phone' },
      { key: 'capacity', label: 'Capacity', type: 'number' },
      { key: 'status', label: 'Status' },
    ]}
    seed={[
      { id: 'PB-01-1234', route: 'Bathinda - School', driver: 'Gurmeet Singh', phone: '9876500011', capacity: 40, status: 'Active' },
      { id: 'PB-01-5678', route: 'Patiala - School', driver: 'Harjit Singh', phone: '9876500022', capacity: 35, status: 'Active' },
    ]}
  />
);
export default Transport;
