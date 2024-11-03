import i18n from '@/shared/plugins/i18n'
import { z } from 'zod'

const securePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export const loginSchema = z.object({
  email: z.string().email({ message: i18n.t('auth:login.errors.email') }),
  password: z.string().regex(securePassword, i18n.t('auth:login.errors.password')),
  remember: z.boolean().optional(),
})

export type LoginSchema = z.infer<typeof loginSchema>

export const registerSchema = loginSchema.merge(
  z.object({
    name: z.string().min(2, {
      message: i18n.t('auth:register.errors.name'),
    }),
  })
)

export type RegisterSchema = z.infer<typeof registerSchema>
