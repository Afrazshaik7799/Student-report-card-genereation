"use client"

import { motion } from "framer-motion"
import { GraduationCap, Users, Trophy, Building2, Mail, Phone, MapPin } from "lucide-react"
import { SignupForm } from "./signup-form"
import { SignupData } from "@/lib/types"

interface LandingPageProps {
  onRoleSelect: (role: 'teacher' | 'student') => void
  signupData: SignupData
  onSignupChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSignup: (e: React.FormEvent) => void
  signupMessage: string
  signupError: string
}

const stats = [
  { icon: Users, label: "Students", value: "5,000+" },
  { icon: Trophy, label: "Placement Rate", value: "98%" },
  { icon: GraduationCap, label: "Programs", value: "25+" },
]

const achievements = [
  "First place in National Olympiad 2025",
  "98% placement success with top tech firms",
  "Industry-accredited programs and research labs",
  "Startup incubator and mentorship programs",
  "State-of-the-art campus facilities",
  "International faculty exchange programs",
]

export function LandingPage({
  onRoleSelect,
  signupData,
  onSignupChange,
  onSignup,
  signupMessage,
  signupError,
}: LandingPageProps) {
  return (
    <div className="min-h-screen gradient-bg">
      {/* Grid overlay */}
      <div className="fixed inset-0 grid-pattern opacity-30 pointer-events-none" />
      
      <div className="relative">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-border/50 backdrop-blur-xl bg-background/50 sticky top-0 z-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center overflow-hidden">
                <img src="/placeholder-logo.svg" alt="AFRAZ logo" className="w-9 h-9 object-contain" />
              </div>
              <div>
                <h1 className="font-semibold text-foreground">AFRAZ College</h1>
                <p className="text-xs text-muted-foreground">of Technology</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRoleSelect('student')}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Student Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRoleSelect('teacher')}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Teacher Login
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block text-primary font-semibold tracking-wider text-sm uppercase"
                >
                  AFRAZ COLLEGE OF TECHNOLOGY
                </motion.span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                  Engineering excellence, top placements, and national champions.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                  Located in the heart of Tech City, AFRAZ College of Technology delivers world-class education, 
                  strong industry ties, and campus life that shapes future leaders.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="glass-card rounded-xl p-4"
                  >
                    <stat.icon className="w-5 h-5 text-primary mb-2" />
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Leadership */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">NK</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Dr. Nina Kapoor</div>
                    <div className="text-sm text-muted-foreground">Principal</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground">AS</span>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Mr. Arjun Shah</div>
                    <div className="text-sm text-muted-foreground">Vice Principal</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
                  alt="College campus"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center gap-2 text-primary mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-sm font-medium">Campus Location</span>
                    </div>
                    <p className="text-sm text-foreground">451 Innovation Avenue, Tech City, TX 75201</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Achievements Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">Our Achievements</h2>
              </div>
              <ul className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={achievement}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </span>
                    {achievement}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Signup Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="glass-card rounded-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">Join AFRAZ College</h2>
                  <p className="text-sm text-muted-foreground">Create your account to access the portal</p>
                </div>
              </div>
              <SignupForm
                signupData={signupData}
                onSignupChange={onSignupChange}
                onSignup={onSignup}
                signupMessage={signupMessage}
                signupError={signupError}
              />
            </motion.div>
          </div>
        </section>

        {/* Contact & Login Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card rounded-2xl p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Address</div>
                      <div className="text-sm text-muted-foreground">451 Innovation Avenue, Tech City, TX 75201</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Email</div>
                      <div className="text-sm text-muted-foreground">admissions@afraztech.edu</div>
                      <div className="text-sm text-muted-foreground">info@afraztech.edu</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium text-foreground">Phone</div>
                      <div className="text-sm text-muted-foreground">+1 800 123 4567</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Login */}
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-6">Already Registered?</h2>
                <p className="text-muted-foreground mb-6">
                  Choose your role to login and access your personalized dashboard.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRoleSelect('teacher')}
                    className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-5 h-5" />
                    Teacher Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onRoleSelect('student')}
                    className="flex-1 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-all flex items-center justify-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Student Login
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span>AFRAZ College of Technology</span>
              </div>
              <div>&copy; {new Date().getFullYear()} All rights reserved.</div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
