import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function SignIn() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Welcome to Triage
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor your services and sleep through incidents
          </p>
          <p className="text-sm text-muted-foreground">
            Currently in private beta - access code required for signup
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Button
            size="lg"
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  )
}
