import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  roleType: z.string().optional(),
  interestedIn: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000, 'Message is too long'),
})

export const applySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  role: z.enum(['doctoral', 'faculty', 'leadership', 'other']),
  program: z.string().min(1, 'Please select a program'),
  message: z.string().min(10, 'Please tell us more about your goals').max(2000),
})

export const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  enrolled_service: z.string().optional(),
  calendly_url: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ContactFormData = z.infer<typeof contactSchema>
export type ApplyFormData = z.infer<typeof applySchema>
export type ProfileFormData = z.infer<typeof profileSchema>

export function validateForm<T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: Record<string, string> } {
  const result = schema.safeParse(data)
  
  if (result.success) {
    return { success: true, data: result.data }
  }

  const errors: Record<string, string> = {}
  result.error.issues.forEach((issue) => {
    const path = issue.path.join('.')
    errors[path] = issue.message
  })

  return { success: false, errors }
}