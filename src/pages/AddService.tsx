import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Check } from 'lucide-react'

export default function AddService() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const [name, setName] = useState('')
  const [platform, setPlatform] = useState('')
  const [projectId, setProjectId] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdService, setCreatedService] = useState<any>(null)
  const [copiedWebhook, setCopiedWebhook] = useState(false)
  const [copiedLogDrain, setCopiedLogDrain] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setIsSubmitting(true)

      // Get user's customer_id
      const { data: { user } } = await supabase.auth.getUser()
      const { data: userData } = await supabase
        .from('users')
        .select('customer_id')
        .eq('id', user!.id)
        .single()

      if (!userData?.customer_id) {
        throw new Error('User is not associated with a customer')
      }

      // Generate webhook secret
      const webhookSecret = crypto.randomUUID()

      // Insert service with customer_id
      const { data: service, error } = await supabase
        .from('services')
        .insert({
          customer_id: userData.customer_id,
          name,
          platform,
          platform_service_id: projectId,
          webhook_secret: webhookSecret,
          is_active: true
        })
        .select()
        .single()

      if (error) throw error

      // Store credentials in Supabase Vault (encrypted storage)
      if (apiToken) {
        const { error: vaultError } = await supabase.rpc(
          'store_service_credentials',
          {
            p_service_id: service.id,
            p_api_token: apiToken,
            p_team_id: null // Add teamID field to form later if needed
          }
        )

        if (vaultError) {
          console.error('Failed to store credentials in vault:', vaultError)
          // Don't fail the whole operation, but warn the user
          toast({
            title: "Warning",
            description: "Service created but credentials storage had an issue. You may need to re-add the API token.",
            variant: "default"
          })
        }
      }

      setCreatedService(service)

      toast({
        title: "Success!",
        description: "Service and credentials configured successfully"
      })

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || 'Failed to create service'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Platform-specific configuration
  const getPlatformFields = () => {
    switch (platform) {
      case 'vercel':
        return {
          projectIdLabel: 'Vercel Project ID',
          projectIdPlaceholder: 'prj_abc123xyz',
          projectIdHelp: 'Find this in your Vercel project settings',
          needsApiToken: true,
          apiTokenLabel: 'Vercel API Token',
          apiTokenPlaceholder: 'Enter your Vercel API token',
          apiTokenHelp: 'Required for executing rollbacks. Create at vercel.com/account/tokens',
          hasLogDrain: true
        }
      case 'railway':
        return {
          projectIdLabel: 'Railway Project ID',
          projectIdPlaceholder: 'abc-123-xyz',
          projectIdHelp: 'Find this in your Railway project settings',
          needsApiToken: true,
          apiTokenLabel: 'Railway API Token',
          apiTokenPlaceholder: 'Enter your Railway API token',
          apiTokenHelp: 'Required for executing actions. Generate in Railway account settings',
          hasLogDrain: false
        }
      case 'render':
        return {
          projectIdLabel: 'Render Service ID',
          projectIdPlaceholder: 'srv-abc123xyz',
          projectIdHelp: 'Find this in your Render service settings',
          needsApiToken: true,
          apiTokenLabel: 'Render API Key',
          apiTokenPlaceholder: 'Enter your Render API key',
          apiTokenHelp: 'Required for executing actions. Generate in Render account settings',
          hasLogDrain: false
        }
      case 'netlify':
        return {
          projectIdLabel: 'Netlify Site ID',
          projectIdPlaceholder: 'abc-123-xyz',
          projectIdHelp: 'Find this in your Netlify site settings',
          needsApiToken: true,
          apiTokenLabel: 'Netlify Access Token',
          apiTokenPlaceholder: 'Enter your Netlify access token',
          apiTokenHelp: 'Required for executing actions. Generate in Netlify user settings',
          hasLogDrain: false
        }
      default:
        return {
          projectIdLabel: 'Project ID',
          projectIdPlaceholder: 'Enter project ID',
          projectIdHelp: '',
          needsApiToken: false,
          apiTokenLabel: 'API Token',
          apiTokenPlaceholder: '',
          apiTokenHelp: '',
          hasLogDrain: false
        }
    }
  }

  const platformConfig = getPlatformFields()

  // Get listener URL from environment variable
  // Use dev URL when in development mode, production URL otherwise
  const listenerBaseUrl = import.meta.env.DEV
    ? (import.meta.env.VITE_DEV_LISTENER_URL || 'http://localhost:8080')
    : (import.meta.env.VITE_LISTENER_URL || 'https://listener.triage.com')

  const webhookUrl = createdService
    ? `${listenerBaseUrl}/webhooks/${createdService.platform}`
    : ''

  const logDrainUrl = createdService && platformConfig.hasLogDrain
    ? `${listenerBaseUrl}/webhooks/${createdService.platform}/logs`
    : ''

  const copyToClipboard = (text: string, setCopiedState: (val: boolean) => void, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedState(true)
    setTimeout(() => setCopiedState(false), 2000)
    toast({
      description: `${label} copied to clipboard`
    })
  }

  if (createdService) {
    const config = getPlatformFields()

    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="p-6 bg-green-50 border-green-200">
            <h2 className="text-xl font-semibold mb-4">✓ Service Created!</h2>
            <p className="text-muted-foreground mb-6">
              Your service <strong>{createdService.name}</strong> has been registered. Follow the steps below to complete the integration.
            </p>

            <div className="space-y-4">
              {/* Webhook URL */}
              <div className="space-y-2">
                <Label>Webhook URL</Label>
                <div className="flex gap-2">
                  <Input
                    value={webhookUrl}
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(webhookUrl, setCopiedWebhook, 'Webhook URL')}
                  >
                    {copiedWebhook ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Log Drain URL (Vercel only) */}
              {config.hasLogDrain && logDrainUrl && (
                <div className="space-y-2">
                  <Label>Log Drain URL (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      value={logDrainUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(logDrainUrl, setCopiedLogDrain, 'Log Drain URL')}
                    >
                      {copiedLogDrain ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Configure this in Vercel → Settings → Log Drains for enhanced error detection
                  </p>
                </div>
              )}

              {/* Webhook Secret */}
              <div className="space-y-2">
                <Label>Webhook Secret</Label>
                <div className="flex gap-2">
                  <Input
                    value={createdService.webhook_secret}
                    readOnly
                    type="password"
                    className="font-mono text-sm"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(createdService.webhook_secret, setCopiedSecret, 'Webhook secret')}
                  >
                    {copiedSecret ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this to verify webhook signatures in {createdService.platform}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">Setup Instructions for {createdService.platform}:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Go to your {createdService.platform} project settings</li>
                <li>Navigate to "Webhooks" or "Integrations" section</li>
                <li>Add a new webhook with the Webhook URL above</li>
                <li>Paste the Webhook Secret for signature verification</li>
                <li>Select events: deployment errors, build failures, runtime errors</li>
                {config.hasLogDrain && <li>Optional: Configure Log Drain URL for enhanced monitoring</li>}
                <li>Save and test the webhook connection</li>
              </ol>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={() => navigate('/dashboard/services')}
            >
              Back to Services
            </Button>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Add Service</h1>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Name */}
            <div>
              <Label htmlFor="name">Service Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="my-api-service"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                A friendly name to identify this service
              </p>
            </div>

            {/* Platform Selection */}
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select value={platform} onValueChange={setPlatform} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vercel">Vercel</SelectItem>
                  <SelectItem value="railway">Railway</SelectItem>
                  <SelectItem value="render">Render</SelectItem>
                  <SelectItem value="netlify">Netlify</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Choose your hosting platform
              </p>
            </div>

            {/* Dynamic Platform-Specific Fields */}
            {platform && (
              <>
                {/* Project ID */}
                <div>
                  <Label htmlFor="projectId">{platformConfig.projectIdLabel}</Label>
                  <Input
                    id="projectId"
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    placeholder={platformConfig.projectIdPlaceholder}
                    required
                  />
                  {platformConfig.projectIdHelp && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {platformConfig.projectIdHelp}
                    </p>
                  )}
                </div>

                {/* API Token (if needed) */}
                {platformConfig.needsApiToken && (
                  <div>
                    <Label htmlFor="apiToken">{platformConfig.apiTokenLabel}</Label>
                    <Input
                      id="apiToken"
                      type="password"
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      placeholder={platformConfig.apiTokenPlaceholder}
                      required
                    />
                    {platformConfig.apiTokenHelp && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {platformConfig.apiTokenHelp}
                      </p>
                    )}
                  </div>
                )}

                {/* Info Box for Platform */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-sm mb-2">What happens next?</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• We'll generate a unique webhook URL for your service</li>
                    <li>• You'll configure it in your {platform} project settings</li>
                    <li>• Triage will monitor for errors and incidents</li>
                    <li>• We'll automatically take action when issues are detected</li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/dashboard/services')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={isSubmitting || !platform}
              >
                {isSubmitting ? 'Creating...' : 'Create Service'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  )
}
