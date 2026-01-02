import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Server,
  History,
  Settings as SettingsIcon,
  Menu,
  X
} from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Get user on mount
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        navigate('/login')
        return
      }
      setUser(user)
    }
    getUser()
  }, [navigate])

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-background border-b z-50 p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Triage</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-card border-r z-40
        transform transition-transform duration-200 ease-in-out
        lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8">Triage</h1>

          <nav className="space-y-2">
            <NavLink
              to="/dashboard"
              icon={<LayoutDashboard className="w-5 h-5" />}
              onClick={() => setIsSidebarOpen(false)}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/dashboard/services"
              icon={<Server className="w-5 h-5" />}
              onClick={() => setIsSidebarOpen(false)}
            >
              Services
            </NavLink>

            <NavLink
              to="/dashboard/actions"
              icon={<History className="w-5 h-5" />}
              onClick={() => setIsSidebarOpen(false)}
            >
              Actions
            </NavLink>

            <NavLink
              to="/dashboard/settings"
              icon={<SettingsIcon className="w-5 h-5" />}
              onClick={() => setIsSidebarOpen(false)}
            >
              Settings
            </NavLink>
          </nav>
        </div>

        {/* User section at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t">
          <div className="text-sm text-muted-foreground mb-2">
            {user?.email}
          </div>
          <Button
            variant="outline"
            className="w-full"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 p-8">
        {children}
      </main>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}

// NavLink component
function NavLink({ to, icon, children, onClick }: any) {
  const navigate = useNavigate()
  const isActive = window.location.pathname === to

  return (
    <button
      onClick={() => {
        navigate(to)
        onClick?.()
      }}
      className={`
        w-full flex items-center gap-3 px-4 py-3 rounded-lg
        transition-colors
        ${isActive
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted text-muted-foreground'
        }
      `}
    >
      {icon}
      <span>{children}</span>
    </button>
  )
}
