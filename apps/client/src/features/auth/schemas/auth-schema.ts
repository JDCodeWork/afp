import i18n from '@/shared/plugins/i18n'
import { z } from 'zod'

const securePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

export const loginFormSchema = z.object({
  email: z.string().email({ message: i18n.t('auth:login.errors.email') }),
  password: z.string().regex(securePassword, i18n.t('auth:login.errors.password')),
  remember: z.boolean().optional(),
})

export type LoginFormInputs = z.infer<typeof loginFormSchema>

export const registerFormSchema = loginFormSchema.omit({remember: true})
  .merge(
    z.object({
      name: z.string().min(2, {
        message: i18n.t('auth:register.inputs.name.error'),
      }),
      confirmPassword: z.string().optional(),
    })
  )
  .refine((data) => data.password == data.confirmPassword, {
    message: i18n.t('auth:register.inputs.confirm-password.error'),
    path: ['confirmPassword'],
  })

export type RegisterFormInputs = z.infer<typeof registerFormSchema>
