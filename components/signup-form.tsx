"use client"

import { motion } from "framer-motion"
import { SignupData } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { useState } from "react"

interface SignupFormProps {
  signupData: SignupData
  onSignupChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSignup: (e: React.FormEvent) => void
  signupMessage: string
  signupError: string
}

export function SignupForm({
  signupData,
  onSignupChange,
  onSignup,
  signupMessage,
  signupError,
}: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await onSignup(e)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm text-muted-foreground">
            Full Name
          </Label>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={signupData.fullName}
            onChange={onSignupChange}
            required
            className="bg-input border-border focus:border-primary"
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm text-muted-foreground">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={signupData.email}
            onChange={onSignupChange}
            required
            className="bg-input border-border focus:border-primary"
            placeholder="john@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm text-muted-foreground">
            Phone
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={signupData.phone}
            onChange={onSignupChange}
            required
            className="bg-input border-border focus:border-primary"
            placeholder="+1 234 567 8901"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username" className="text-sm text-muted-foreground">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={signupData.username}
            onChange={onSignupChange}
            required
            className="bg-input border-border focus:border-primary"
            placeholder="johndoe"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm text-muted-foreground">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={signupData.password}
            onChange={onSignupChange}
            required
            className="bg-input border-border focus:border-primary"
            placeholder="••••••••"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className="text-sm text-muted-foreground">
            Role
          </Label>
          <select
            id="role"
            name="role"
            value={signupData.role}
            onChange={onSignupChange}
            className="w-full h-9 px-3 rounded-md bg-input border border-border text-foreground text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>

      {signupMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-green-400 bg-green-400/10 rounded-lg p-3"
        >
          <CheckCircle className="w-4 h-4" />
          {signupMessage}
        </motion.div>
      )}

      {signupError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3"
        >
          <AlertCircle className="w-4 h-4" />
          {signupError}
        </motion.div>
      )}
    </form>
  )
}
