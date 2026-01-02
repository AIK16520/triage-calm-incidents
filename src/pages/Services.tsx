import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Server } from 'lucide-react'

export default function Services() {
  const navigate = useNavigate()
  const [services, setServices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadServices() {
      // RLS auto-filters by customer_id
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('created_at', { ascending: false })

      setServices(data || [])
      setLoading(false)
    }

    loadServices()
  }, [])

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Services</h1>
            <p className="text-muted-foreground">Manage your monitored services</p>
          </div>
          <Button onClick={() => navigate('/dashboard/services/new')}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>

        {services.length === 0 ? (
          <Card className="p-12 text-center">
            <Server className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No services yet</h3>
            <p className="text-muted-foreground mb-4">
              Add your first service to start monitoring
            </p>
            <Button onClick={() => navigate('/dashboard/services/new')}>
              Add Service
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.service_id} service={service} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function ServiceCard({ service }: any) {
  const platformIcons: any = {
    vercel: '▲',
    railway: '🚂',
    render: '🎨',
    netlify: '◆'
  }

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{service.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span>{platformIcons[service.platform] || '📦'}</span>
            {service.platform}
          </p>
        </div>
        <div className={`px-2 py-1 rounded text-xs ${
          service.is_active
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {service.is_active ? 'Active' : 'Inactive'}
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        Added {new Date(service.created_at).toLocaleDateString()}
      </div>
    </Card>
  )
}
