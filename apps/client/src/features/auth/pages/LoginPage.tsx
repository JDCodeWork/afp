import {
  Input,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Checkbox,
} from "@/shared/components/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from "react-i18next"
import { loginSchema, LoginSchema } from "../schemas/auth-schema"
import { Link } from "react-router-dom"

import loginImg from '../assets/login-img.svg'
import { useAuth } from "../hooks"

export const LoginPage = () => {
  const [t] = useTranslation('auth')

  const { handleLogin } = useAuth()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: true
    },
  })

  function onSubmit(values: LoginSchema) {
    delete values.remember

    handleLogin(values)
  }

  return (
    <>
      <div className="hidden md:flex md:flex-col md:items-center md:-translate-y-6">
        <img src={loginImg} alt="login-img" className="size-[400px]" height={400} width={400} />
        <p className="text-sm text-primary/75 flex flex-col-reverse text-center -translate-y-2 pr-6"><span className="text-primary">AFP.</span> Aplicación de Finanzas Personales</p>
      </div>
      <Card className="size-full flex flex-col justify-center md:size-auto md:w-1/2 lg:w-1/3 md:shadow-lg md:rounded-2xl">
        <CardHeader>
          <CardTitle className="text-4xl text-center">{t('login.form-header')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.inputs.email.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('login.inputs.email.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('login.inputs.password.label')}</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder={t('login.inputs.password.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="pb-2">{t('login.remember-me')}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* TODO: make this feature
                <Link to='/' className="text-xs md:text-sm">
                  {t('login.forgot-password')}
                </Link> 
              */}
              </div>
              <Button type="submit" className="w-full">{t('login.submit')}</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-gray-600">
            {t('login.dont-have-account.label')}{' '}
            <Link to='/auth/register' className="font-medium text-gray-900">
              {t('login.dont-have-account.link')}
            </Link>
          </p>
        </CardFooter>
      </Card>

    </>
  )
}