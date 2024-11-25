import { useState } from "react"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

export interface FormSteps<T extends FieldValues> {
  fields: (keyof T)[]
}

interface Props<T extends FieldValues> {
  formSteps: FormSteps<T>[],
  form: UseFormReturn<T>,
  onSubmit: (values: T) => void
}

export const useMultiStepForm = <T extends FieldValues>({ formSteps, form, onSubmit }: Props<T>) => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = async () => {
    const fields = formSteps[currentStep].fields as Path<T>[]
    const output = await form.trigger(fields, { shouldFocus: true })

    if (!output) return

    if (currentStep == formSteps.length - 1) return await form.handleSubmit(onSubmit)()

    setCurrentStep(currentStep + 1)
  }

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  return { currentStep, handleNext, handlePrev }
}
