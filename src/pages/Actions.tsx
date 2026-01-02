import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Card } from '@/components/ui/card'
import { History } from 'lucide-react'

export default function Actions() {
  const [actions, setActions] = useState<any[]>([])
  const [stats, setStats] = useState({ total: 0, successRate: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadActions() {
      const { data, error } = await supabase
        .from('commands')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error loading actions:', error)
      }

      const total = data?.length || 0
      const completed = data?.filter(a => a.status === 'completed').length || 0

      setActions(data || [])
      setStats({
        total,
        successRate: total > 0 ? Math.round((completed / total) * 100) : 0
      })
      setLoading(false)
    }

    loadActions()
  }, [])

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
          <Card className="overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4">Service</th>
                  <th className="text-left p-4">Action</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Time</th>
                </tr>
              </thead>
              <tbody>
                {actions.map((action) => (
                  <tr key={action.command_id || action.id} className="border-t">
                    <td className="p-4">{action.service_name || 'Unknown Service'}</td>
                    <td className="p-4 font-medium">{action.action}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        action.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : action.status === 'processing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {action.status}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(action.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
