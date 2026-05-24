export interface User {
  name: string
  username: string
  role: 'teacher' | 'student'
}

export interface Student {
  name: string
  rollNumber: string
  math: number
  science: number
  english: number
  total: number
  average: number
  grade: string
  remarks: string
  className?: string
  section?: string
}

export interface SignupData {
  fullName: string
  email: string
  phone: string
  username: string
  password: string
  role: 'teacher' | 'student'
}

export interface LoginData {
  username: string
  password: string
}

export type View = 'landing' | 'login' | 'dashboard'
