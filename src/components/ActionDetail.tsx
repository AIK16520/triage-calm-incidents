import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertCircle,
  Brain,
  TrendingUp,
  Clock,
  Target,
  Activity,
  Code
} from 'lucide-react'

interface ActionDetailProps {
  action: any
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ActionDetail({ action, open, onOpenChange }: ActionDetailProps) {
  if (!action) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const getSeverityColor = (severity?: string) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'error': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'processing': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'queued': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Action Analysis</DialogTitle>
          <DialogDescription>
            Detailed analysis of how this decision was made
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Overview Section */}
          <Card className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Service</div>
                <div className="font-medium">{action.service_name || 'Unknown'}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Action</div>
                <div className="font-medium uppercase">{action.action}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Status</div>
                <Badge className={getStatusColor(action.status)}>
                  {action.status}
                </Badge>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Timestamp</div>
                <div className="text-sm">{formatDate(action.created_at)}</div>
              </div>
            </div>
          </Card>

          {/* Incident Summary */}
          {action.incident_summary && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="font-semibold text-lg">Incident Summary</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {action.incident_summary}
              </p>

              {action.event_count > 0 && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4" />
                  <span className="font-medium">{action.event_count}</span>
                  <span className="text-muted-foreground">
                    correlated event{action.event_count !== 1 ? 's' : ''} analyzed
                  </span>
                </div>
              )}

              {action.severity && (
                <div className="mt-2">
                  <Badge className={`${getSeverityColor(action.severity)} border`}>
                    Severity: {action.severity}
                  </Badge>
                </div>
              )}
            </Card>
          )}

          {/* Root Cause Analysis */}
          {action.root_cause && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-lg">Root Cause</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {action.root_cause}
              </p>
            </Card>
          )}

          {/* AI Reasoning */}
          {action.llm_reasoning && (
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-lg">AI Analysis</h3>
                {action.confidence_score !== null && action.confidence_score !== undefined && (
                  <Badge variant="outline" className="ml-auto">
                    Confidence: {(action.confidence_score * 100).toFixed(0)}%
                  </Badge>
                )}
              </div>
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {action.llm_reasoning}
                </p>
              </div>
            </Card>
          )}

          {/* Error Details */}
          {action.error_signature && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-red-600" />
                <h3 className="font-semibold text-lg">Error Signature</h3>
              </div>
              <code className="block p-3 bg-muted rounded text-sm font-mono break-all">
                {action.error_signature}
              </code>
            </Card>
          )}

          {/* Execution Result */}
          {action.result && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-lg">Execution Result</h3>
              </div>
              <pre className="p-4 bg-muted rounded text-sm overflow-x-auto">
                {JSON.stringify(action.result, null, 2)}
              </pre>
            </Card>
          )}

          {/* Additional Metadata */}
          {action.analysis_metadata && Object.keys(action.analysis_metadata).length > 0 && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-lg">Analysis Context</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {action.analysis_metadata.recentDeploys !== undefined && (
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Recent Deploys</div>
                    <div className="text-2xl font-bold">{action.analysis_metadata.recentDeploys}</div>
                  </div>
                )}
                {action.analysis_metadata.similarIncidents !== undefined && (
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Similar Incidents</div>
                    <div className="text-2xl font-bold">{action.analysis_metadata.similarIncidents}</div>
                  </div>
                )}
                {action.analysis_metadata.cooldownActive !== undefined && (
                  <div className="p-3 bg-muted rounded">
                    <div className="text-sm text-muted-foreground">Cooldown Active</div>
                    <div className="text-2xl font-bold">
                      {action.analysis_metadata.cooldownActive ? 'Yes' : 'No'}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Timeline */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-lg">Timeline</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-l-2 border-blue-500 pl-4">
                <span className="text-sm font-medium">Queued</span>
                <span className="text-sm text-muted-foreground">
                  {formatDate(action.queued_at || action.created_at)}
                </span>
              </div>
              {action.completed_at && (
                <div className="flex items-center justify-between py-2 border-l-2 border-green-500 pl-4">
                  <span className="text-sm font-medium">Completed</span>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(action.completed_at)}
                  </span>
                </div>
              )}
              {action.completed_at && action.queued_at && (
                <div className="pt-2 pl-4 text-sm text-muted-foreground">
                  Execution time: {Math.round((new Date(action.completed_at).getTime() - new Date(action.queued_at).getTime()) / 1000)}s
                </div>
              )}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
