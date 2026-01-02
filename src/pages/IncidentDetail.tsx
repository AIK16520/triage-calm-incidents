import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function IncidentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [incident, setIncident] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadIncident() {
      const { data } = await supabase
        .from('incident_outcomes')
        .select(`
          *,
          services (*)
        `)
        .eq('id', id)
        .single()

      setIncident(data)
      setLoading(false)
    }

    loadIncident()
  }, [id])

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>
  if (!incident) return <DashboardLayout><div>Incident not found</div></DashboardLayout>

  const isResolved = incident.incident_resolved

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/dashboard/incidents')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Incidents
        </Button>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{incident.services?.name}</h1>
            <span className={`px-3 py-1 rounded ${
              isResolved
                ? 'bg-green-100 text-green-800'
                : 'bg-orange-100 text-orange-800'
            }`}>
              {isResolved ? 'Resolved' : 'Ongoing'}
            </span>
          </div>
          <p className="text-muted-foreground">
            {new Date(incident.created_at).toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Action Taken</div>
            <div className="text-2xl font-semibold">{incident.action_taken}</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Confidence</div>
            <div className="text-2xl font-semibold">
              {incident.llm_confidence ? `${Math.round(incident.llm_confidence * 100)}%` : 'N/A'}
            </div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Resolution Time</div>
            <div className="text-2xl font-semibold">
              {incident.time_to_resolution ? `${incident.time_to_resolution}s` : 'N/A'}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Root Cause Analysis</h2>
          <p className="text-muted-foreground">
            {incident.root_cause || 'Analysis in progress...'}
          </p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Outcome</h2>
          <p className="text-muted-foreground">
            {incident.outcome || 'Waiting for resolution...'}
          </p>
        </Card>
      </div>
    </DashboardLayout>
  )
}
