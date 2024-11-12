import i18n from '@/shared/plugins/i18n'
import { z } from 'zod'

const securePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export const loginFormSchema = z.object({
  email: z.string().email({ message: i18n.t('auth:login.errors.email') }),
  password: z.string().regex(securePassword, i18n.t('auth:login.errors.password')),
  remember: z.boolean().optional(),
})

export type LoginFormInputs = z.infer<typeof loginFormSchema>

export const registerFormSchema = loginFormSchema.merge(
  z.object({
    name: z.string().min(2, {
      message: i18n.t('auth:register.errors.name'),
    }),
  })
)

export type RegisterFormInputs = z.infer<typeof registerFormSchema>
