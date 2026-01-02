import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

export default function Incidents() {
  const navigate = useNavigate()
  const [incidents, setIncidents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadIncidents() {
      const { data, error } = await supabase
        .from('incident_outcomes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading incidents:', error)
      }

      setIncidents(data || [])
      setLoading(false)
    }

    loadIncidents()
  }, [])

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Incidents</h1>
          <p className="text-muted-foreground">Track detected incidents and resolutions</p>
        </div>

        {incidents.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No incidents detected</h3>
            <p className="text-muted-foreground">
              Your services are healthy! Incidents will appear here when detected.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {incidents.map((incident) => (
              <IncidentCard
                key={incident.id}
                incident={incident}
                onClick={() => navigate(`/dashboard/incidents/${incident.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function IncidentCard({ incident, onClick }: any) {
  const isResolved = incident.incident_resolved

  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="font-semibold">{incident.service_name || 'Unknown Service'}</h3>
            <span className={`px-2 py-1 rounded text-xs ${
              isResolved
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {isResolved ? 'Resolved' : 'Ongoing'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-2">
            {incident.root_cause || 'Analyzing...'}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>Action: {incident.action_taken}</span>
            {incident.time_to_resolution_seconds && (
              <span>Resolved in {incident.time_to_resolution_seconds}s</span>
            )}
            <span>{new Date(incident.created_at).toLocaleString()}</span>
          </div>
        </div>
        {incident.llm_confidence && (
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Confidence</div>
            <div className="text-lg font-semibold">{Math.round(incident.llm_confidence * 100)}%</div>
          </div>
        )}
      </div>
    </Card>
  )
}
