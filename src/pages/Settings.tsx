import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'

export default function Settings() {
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [userData, setUserData] = useState<any>(null)
  const [name, setName] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      const { data } = await supabase
        .from('users')
        .select('*, customers (*)')
        .eq('id', user!.id)
        .single()

      setUserData(data)
      setName(data?.name || '')
    }

    loadUser()
  }, [])

  const handleSave = async () => {
    try {
      setIsSaving(true)

      const { error } = await supabase
        .from('users')
        .update({ name })
        .eq('id', user.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Settings saved successfully"
      })

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!userData) return <DashboardLayout><div>Loading...</div></DashboardLayout>

  return (
    <DashboardLayout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings</p>
        </div>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email}
                disabled
                className="bg-muted"
              />
            </div>

            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <Label>Account Created</Label>
              <Input
                value={new Date(userData.created_at).toLocaleDateString()}
                disabled
                className="bg-muted"
              />
            </div>

            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Organization</h2>

          <div className="space-y-4">
            <div>
              <Label>Organization Name</Label>
              <Input
                value={userData.customers?.name || 'N/A'}
                disabled
                className="bg-muted"
              />
            </div>

            <div>
              <Label>Plan</Label>
              <Input
                value={userData.customers?.tier || 'free'}
                disabled
                className="bg-muted"
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
