import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export default function Signup() {
  const navigate = useNavigate()
  const { toast } = useToast()

  // State for form fields
  const [accessCode, setAccessCode] = useState('')
  const [organizationName, setOrganizationName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // State for access code validation
  const [validatedAccessCode, setValidatedAccessCode] = useState<any>(null)
  const [codeError, setCodeError] = useState<string | null>(null)

  // State for loading states
  const [isValidating, setIsValidating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateAccessCode = async (code: string) => {
    try {
      setIsValidating(true)

      const { data: accessCode, error } = await supabase
        .from('access_codes')
        .select('*')
        .eq('code', code.toUpperCase().trim())
        .eq('is_active', true)
        .single()

      if (error) {
        console.error('Access code validation error:', error)
        setCodeError(`Error: ${error.message || 'Invalid access code'}`)
        return
      }

      if (!accessCode) {
        setCodeError('Invalid access code')
        return
      }

      if (accessCode.current_users >= accessCode.max_users) {
        setCodeError(`This access code is full (max ${accessCode.max_users} users)`)
        return
      }

      if (accessCode.expires_at && new Date(accessCode.expires_at) < new Date()) {
        setCodeError('This access code has expired')
        return
      }

      // Success!
      setValidatedAccessCode(accessCode)
      setCodeError(null)
      setOrganizationName(accessCode.company_name)
      toast({
        title: "Valid code",
        description: `✓ Valid code for ${accessCode.company_name}`
      })

    } catch (error) {
      setCodeError('Failed to validate code')
    } finally {
      setIsValidating(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match"
      })
      return
    }

    try {
      setIsSubmitting(true)

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password: password
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Failed to create user')

      // 2. Create customer record
      const { data: customer, error: customerError } = await supabase
        .from('customers')
        .insert({
          name: validatedAccessCode.company_name,
          email: email.trim().toLowerCase(),
          tier: 'free',
          access_code_id: validatedAccessCode.id
        })
        .select()
        .single()

      if (customerError) throw customerError

      // 3. Create user record
      const { error: userError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          customer_id: customer.id,
          email: email.trim().toLowerCase(),
          name: name.trim(),
          role: 'owner'
        })

      if (userError) throw userError

      // 4. Increment access code usage
      await supabase
        .from('access_codes')
        .update({ current_users: validatedAccessCode.current_users + 1 })
        .eq('id', validatedAccessCode.id)

      // 5. Success! Redirect
      toast({
        title: "Success!",
        description: "Account created! Redirecting to dashboard..."
      })

      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error.message || 'Failed to create account. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create Your Account
          </h1>
          <p className="text-muted-foreground">
            Enter your access code to get started
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Access Code Field */}
          <div className="space-y-2">
            <Label htmlFor="accessCode">
              Access Code
            </Label>
            <div className="flex gap-2">
              <Input
                id="accessCode"
                type="text"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value.toUpperCase())
                  setCodeError(null)
                }}
                disabled={!!validatedAccessCode}
                className={!!validatedAccessCode ? "flex-1 bg-muted cursor-not-allowed" : "flex-1"}
              />
              <Button
                type="button"
                onClick={() => validateAccessCode(accessCode)}
                disabled={!accessCode || isValidating || !!validatedAccessCode}
                variant="outline"
              >
                {isValidating ? 'Validating...' : validatedAccessCode ? '✓ Valid' : 'Validate Code'}
              </Button>
            </div>
            {codeError && (
              <p className="text-sm text-destructive">{codeError}</p>
            )}
          </div>

          {/* Organization Name (auto-filled) */}
          {validatedAccessCode && (
            <div className="space-y-2">
              <Label htmlFor="organization">
                Organization
              </Label>
              <Input
                id="organization"
                type="text"
                value={organizationName}
                disabled
                className="bg-muted cursor-not-allowed"
              />
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!validatedAccessCode}
              className={!validatedAccessCode ? "bg-muted cursor-not-allowed" : ""}
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!validatedAccessCode}
              className={!validatedAccessCode ? "bg-muted cursor-not-allowed" : ""}
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!validatedAccessCode}
              className={!validatedAccessCode ? "bg-muted cursor-not-allowed" : ""}
              minLength={8}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={!validatedAccessCode}
              className={!validatedAccessCode ? "bg-muted cursor-not-allowed" : ""}
              minLength={8}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={!validatedAccessCode || isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>

        {/* No Access Code Section */}
        <div className="mt-8 p-6 bg-muted rounded-lg text-center space-y-4">
          <div>
            <h3 className="font-semibold text-foreground mb-2">
              Don't have an access code?
            </h3>
            <p className="text-sm text-muted-foreground">
              Triage is currently in private beta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="default"
              onClick={() => {
                navigate('/')
                setTimeout(() => {
                  document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
            >
              Join the Waitlist
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.href = 'mailto:triage076@gmail.com'}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
