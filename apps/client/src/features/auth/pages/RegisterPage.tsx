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
  FormDescription,
} from "@/shared/components/ui"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from "react-i18next"
import { registerSchema, RegisterSchema } from "../schemas/auth-schema"
import { Link } from "react-router-dom"
import { useAuthStorage } from "../hooks"

import registerImg from '../assets/register-img.svg'

export const RegisterPage = () => {
  const { handleRegister } = useAuthStorage()
  const [t] = useTranslation('auth')

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      remember: true
    },
  })

  function onSubmit(values: RegisterSchema) {
    // TODO: make that remember feature works

    delete values.remember

    handleRegister(values)
  }

  return (
    <>
      <div className="flex flex-col items-center -translate-y-6">
        <img src={registerImg} alt="register-img" className="size-[400px]"  height={400} width={400}/>
        <p className="text-sm text-primary/75 flex flex-col-reverse text-center pr-6"><span className="text-primary">AFP.</span> Aplicación de Finanzas Personales</p>
      </div>
      <Card className="size-full md:size-auto md:w-1/2 lg:w-1/3 md:shadow-lg md:rounded-2xl">
        <CardHeader>
          <CardTitle className="text-4xl text-center">{t('register.form-header')}</CardTitle>
        </CardHeader>
        <CardContent>

          {/* TODO: make multi-step form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('register.inputs.name.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('register.inputs.name.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormDescription className="text-xs pl-1 pb-1">
                      {t('register.inputs.password.description')}
                    </FormDescription>
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
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="pb-2">{t('login.remember-me')}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full">{t('register.submit')}</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-xs text-gray-600">
            {t('register.have-account.label')}{' '}
            <Link to="/auth" className="font-medium text-gray-900">
              {t('register.have-account.link')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </>
  )

}
