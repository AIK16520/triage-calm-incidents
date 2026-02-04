import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { History, ChevronRight, AlertCircle, CheckCircle, Clock } from 'lucide-react'
import ActionDetail from '@/components/ActionDetail'

export default function Actions() {
  const [actions, setActions] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, successRate: 0 })
  const [loading, setLoading] = useState(true)
  const [selectedAction, setSelectedAction] = useState<any>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  useEffect(() => {
    async function loadActions() {
      console.log('Loading actions...')

      // Fetch commands
      const { data: commandsData, error: commandsError } = await supabase
        .from('commands')
        .select('*')
        .order('created_at', { ascending: false })

      if (commandsError) {
        console.error('Error loading actions:', commandsError)
        console.error('Error details:', JSON.stringify(commandsError, null, 2))
        setLoading(false)
        return
      }

      console.log('Raw commands from Supabase:', commandsData)
      console.log('Number of commands fetched:', commandsData?.length || 0)

      if (!commandsData || commandsData.length === 0) {
        setActions([])
        setStats({ total: 0, successRate: 0 })
        setLoading(false)
        return
      }

      // Try to fetch services (but don't fail if it errors)
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')

      if (servicesError) {
        console.error('Error loading services:', servicesError)
        console.error('Services error details:', JSON.stringify(servicesError, null, 2))
        console.warn('Continuing without service mapping...')
      }

      console.log('Services data:', servicesData)
      console.log('Number of services fetched:', servicesData?.length || 0)

      // Create maps for both service_id and platform_service_id (if services loaded)
      const servicesByIdMap = new Map()
      const servicesByPlatformIdMap = new Map()

      if (servicesData) {
        servicesData.forEach(service => {
          // Map by service_id (could be 'id' or 'service_id')
          const serviceId = service.service_id || service.id
          if (serviceId) {
            servicesByIdMap.set(serviceId, service)
          }
          // Also map by platform_service_id for fallback
          if (service.platform_service_id) {
            servicesByPlatformIdMap.set(service.platform_service_id, service)
          }
        })
      }

      console.log('Service mappings created:', {
        byId: servicesByIdMap.size,
        byPlatformId: servicesByPlatformIdMap.size
      })

      // Enrich commands with service data (fallback chain)
      const flattenedData = commandsData.map(action => {
        // Try to find service by service_id first
        let service = action.service_id ? servicesByIdMap.get(action.service_id) : null

        // Fallback: try to match by platform_service_id if service_name looks like a platform ID
        if (!service && action.service_name && action.service_name.startsWith('prj_')) {
          service = servicesByPlatformIdMap.get(action.service_name)
        }

        console.log('Mapping action:', action.command_id, 'service_id:', action.service_id, 'service_name:', action.service_name, 'found service:', service?.name)

        return {
          ...action,
          service_name: service?.name || action.service_name || 'Unknown Service',
          platform: service?.platform || action.platform || 'unknown'
        }
      })

      const total = flattenedData?.length || 0
      const completed = flattenedData?.filter(a => a.status === 'completed').length || 0

      setActions(flattenedData || [])
      setStats({
        total,
        successRate: total > 0 ? Math.round((completed / total) * 100) : 0
      })
      setLoading(false)
    }

    loadActions()
  }, [])

  const handleRowClick = (action: any) => {
    setSelectedAction(action)
    setDetailOpen(true)
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'processing': return <Clock className="w-4 h-4 text-blue-600 animate-spin" />
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-600" />
      default: return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'error': return 'bg-orange-100 text-orange-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Actions</h1>
          <p className="text-muted-foreground">History of all automated actions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Total Actions</div>
            <div className="text-3xl font-bold">{stats.total}</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
            <div className="text-3xl font-bold">{stats.successRate}%</div>
          </Card>

          <Card className="p-6">
            <div className="text-sm text-muted-foreground mb-1">This Week</div>
            <div className="text-3xl font-bold">
              {actions.filter(a => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(a.created_at) > weekAgo
              }).length}
            </div>
          </Card>
        </div>

        {actions.length === 0 ? (
          <Card className="p-12 text-center">
            <History className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">No actions yet</h3>
            <p className="text-muted-foreground">
              Automated actions will appear here when incidents are detected
            </p>
          </Card>
        ) : (
          <>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4">Service</th>
                      <th className="text-left p-4">Action</th>
                      <th className="text-left p-4">Severity</th>
                      <th className="text-left p-4">Root Cause</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Events</th>
                      <th className="text-left p-4">Time</th>
                      <th className="text-left p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {actions.map((action) => (
                      <tr
                        key={action.command_id || action.id}
                        className="border-t hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => handleRowClick(action)}
                      >
                        <td className="p-4">
                          <div className="font-medium">{action.service_name}</div>
                          <div className="text-xs text-muted-foreground">{action.platform}</div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="font-medium uppercase">
                            {action.action}
                          </Badge>
                        </td>
                        <td className="p-4">
                          {action.severity ? (
                            <Badge className={getSeverityColor(action.severity)}>
                              {action.severity}
                            </Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4 max-w-xs">
                          <div className="truncate text-sm">
                            {action.root_cause || action.incident_summary || '-'}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(action.status)}
                            <Badge className={getStatusColor(action.status)}>
                              {action.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          {action.event_count > 0 ? (
                            <Badge variant="outline">{action.event_count}</Badge>
                          ) : (
                            <span className="text-xs text-muted-foreground">-</span>
                          )}
                        </td>
                        <td className="p-4 text-sm text-muted-foreground whitespace-nowrap">
                          {new Date(action.created_at).toLocaleString()}
                        </td>
                        <td className="p-4">
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Action Detail Modal */}
            <ActionDetail
              action={selectedAction}
              open={detailOpen}
              onOpenChange={setDetailOpen}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
