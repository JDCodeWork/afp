import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAuth } from "../hooks"
import { useForm } from "react-hook-form"
import { registerFormSchema, RegisterFormInputs } from "../schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Card, CardContent, CardFooter, CardHeader, CardTitle, Form } from "@/shared/components/ui"
import { RegisterFirstStep, RegisterSecondStep } from "./registerFormSteps"
import { Link } from "react-router-dom"

const defaultValues = {
  name: '',
  email: '',
  password: '',
  remember: true
}

const formSteps = [
  {
    fields: ["name", "email"]
  },
  {
    fields: ["password"]
  }
]

type fieldName = keyof RegisterFormInputs




export const RegisterForm = () => {
  const [t] = useTranslation('auth')
  const [currentStep, setCurrentStep] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  const { handleRegister } = useAuth()

  const verifyWidth = () => {
    if (window.innerWidth <= 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    verifyWidth();

    window.addEventListener('resize', verifyWidth);

    return () => window.removeEventListener('resize', verifyWidth);
  }, []);


  const form = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
    defaultValues,
  })

  const handleNext = async () => {
    const fields = formSteps[currentStep].fields
    const output = await form.trigger(fields as fieldName[], { shouldFocus: true })

    if (!output) return

    if (currentStep == formSteps.length - 1) return await form.handleSubmit(onSubmit)()

    setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  function onSubmit(values: RegisterFormInputs) {
    delete values.remember

    handleRegister(values)
  }


  return (
    <Card className="size-full md:size-auto md:w-1/2 lg:w-1/3 md:shadow-lg md:rounded-2xl">
      <CardHeader>
        <CardTitle className="text-4xl text-center">{t('register.form-header')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {
              isMobile ?
                <>
                  <RegisterFirstStep control={form.control} />
                  <RegisterSecondStep control={form.control} isMobile />
                  <Button
                    type="submit"
                    className="w-full">
                    {t('register.navigation.submit')}
                  </Button>
                </>
                : <>
                  {
                    currentStep == 0 && <RegisterFirstStep control={form.control} />
                  }
                  {
                    currentStep == 1 && <RegisterSecondStep control={form.control} />
                  }
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      className="w-full border-2 text-primary/80"
                      variant="outline"
                      disabled={currentStep == 0}
                      onClick={handlePrev}>
                      {t('register.navigation.prev')}
                    </Button>
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full">
                      {
                        currentStep == formSteps.length - 1
                          ? t('register.navigation.submit')
                          : t('register.navigation.next')
                      }
                    </Button>
                  </div>
                </>
            }

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
  )
}
