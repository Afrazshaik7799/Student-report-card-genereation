"use client"

import { motion } from "framer-motion"
import { GraduationCap, ArrowLeft, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { LoginData } from "@/lib/types"
import { useState } from "react"

interface LoginPageProps {
  role: 'teacher' | 'student'
  loginData: LoginData
  onLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLogin: (e: React.FormEvent) => void
  loginError: string
  onBack: () => void
}

export function LoginPage({
  role,
  loginData,
  onLoginChange,
  onLogin,
  loginError,
  onBack,
}: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await onLogin(e)
    setIsLoading(false)
  }

  const isTeacher = role === 'teacher'

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative"
      >
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>

        {/* Login Card */}
        <div className="glass-card rounded-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
              className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                isTeacher ? 'bg-primary/20' : 'bg-chart-2/20'
              }`}
            >
              <GraduationCap className={`w-8 h-8 ${isTeacher ? 'text-primary' : 'text-chart-2'}`} />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isTeacher ? 'Teacher Login' : 'Student Login'}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                {isTeacher 
                  ? 'Access teacher dashboard to manage student marks'
                  : 'View and download your report card'
                }
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-muted-foreground">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={loginData.username}
                onChange={onLoginChange}
                required
                className="bg-input border-border focus:border-primary h-11"
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-muted-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={loginData.password}
                  onChange={onLoginChange}
                  required
                  className="bg-input border-border focus:border-primary h-11 pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg p-3"
              >
                <AlertCircle className="w-4 h-4" />
                {loginError}
              </motion.div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full h-11 ${
                isTeacher 
                  ? 'bg-primary hover:bg-primary/90' 
                  : 'bg-chart-2 hover:bg-chart-2/90'
              } text-primary-foreground font-medium`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-center text-muted-foreground mb-3">
              Demo Credentials
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="font-medium text-foreground mb-1">Teacher</div>
                <div className="text-muted-foreground">
                  <div>Username: teacher</div>
                  <div>Password: teacher123</div>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="font-medium text-foreground mb-1">Student</div>
                <div className="text-muted-foreground">
                  <div>Username: student</div>
                  <div>Password: student123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
