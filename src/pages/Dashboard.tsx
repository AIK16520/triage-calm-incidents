import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Server, AlertTriangle, History, TrendingUp } from 'lucide-react'

export default function Dashboard() {
  const [stats, setStats] = useState({
    services: 0,
    incidents: 0,
    actions: 0,
    successRate: 0
  })
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Get user's customer_id
  const [customerId, setCustomerId] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Get user's customer_id
      const { data: userData } = await supabase
        .from('users')
        .select('customer_id')
        .eq('id', user.id)
        .single()

      if (!userData) return
      setCustomerId(userData.customer_id)

      // Load stats (RLS auto-filters by customer_id)
      const [servicesData, incidentsData, actionsData] = await Promise.all([
        supabase.from('services').select('*', { count: 'exact' }),
        supabase.from('incident_outcomes').select('*', { count: 'exact' }),
        supabase.from('commands').select('*', { count: 'exact' })
      ])

      setStats({
        services: servicesData.count || 0,
        incidents: incidentsData.count || 0,
        actions: actionsData.count || 0,
        successRate: 0 // Calculate from actions data
      })

      // Load recent events
      const { data: eventsData } = await supabase
        .from('events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50)

      setEvents(eventsData || [])
      setLoading(false)
    }

    loadData()
  }, [])

  // Real-time subscription for events
  useEffect(() => {
    if (!customerId) return

    const channel = supabase
      .channel('events')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'events'
      }, (payload) => {
        // Prepend new event
        setEvents(prev => [payload.new, ...prev])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [customerId])

  if (loading) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor your services and incidents</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Services"
            value={stats.services}
            icon={<Server className="w-5 h-5" />}
          />
          <StatsCard
            title="Incidents (7d)"
            value={stats.incidents}
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <StatsCard
            title="Actions (7d)"
            value={stats.actions}
            icon={<History className="w-5 h-5" />}
          />
          <StatsCard
            title="Success Rate"
            value={`${stats.successRate}%`}
            icon={<TrendingUp className="w-5 h-5" />}
          />
        </div>

        {/* Recent Events Timeline */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>

          {events.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No events yet. Add a service to start monitoring.
            </div>
          ) : (
            <div className="space-y-3">
              {events.map((event) => (
                <EventCard key={event.event_id} event={event} />
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}

function StatsCard({ title, value, icon }: any) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon}
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </Card>
  )
}

function EventCard({ event }: any) {
  const severityColor = {
    critical: 'bg-red-500',
    error: 'bg-orange-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  }[event.severity] || 'bg-gray-500'

  return (
    <div className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
      <div className={`w-2 h-2 rounded-full mt-2 ${severityColor}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{event.service_name}</span>
          <span className="text-xs text-muted-foreground">
            {new Date(event.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate">{event.message}</p>
      </div>
    </div>
  )
}
