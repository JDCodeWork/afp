import { FC } from "react";
import { Control } from "react-hook-form";
import { IoHelp } from "react-icons/io5";
import { RegisterFormInputs } from "../schemas/auth-schema";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui";
import { useTranslation } from "react-i18next";

interface Props {
  control: Control<RegisterFormInputs>
}

interface PropsWithMobile extends Props {
  isMobile?: boolean
}

export const RegisterFirstStep: FC<Props> = ({ control }) => {
  const [t] = useTranslation('auth')

  return (
    <>
      <FormField
        control={control}
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
        control={control}
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
    </>
  )
}

export const RegisterSecondStep: FC<PropsWithMobile> = ({ control, isMobile = false }) => {
  const [t] = useTranslation('auth')

  return (
    <>
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              {t('login.inputs.password.label')}
              {
                isMobile ? "" : <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger disabled>
                      <IoHelp className="text-primary/50" />
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={15} className="max-w-[280px] text-xs text-primary/75 pl-4 py-2">
                      {
                        t('register.inputs.password.description')
                      }
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            </FormLabel>
            <FormControl>
              <Input type="password" placeholder={t('login.inputs.password.placeholder')} {...field} />
            </FormControl>
            {
              isMobile
                ? <FormDescription className="text-xs text-primary/75">
                  {
                    t('register.inputs.password.description')
                  }
                </FormDescription>
                : ""
            }
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="flex items-center gap-1">
              {t('register.inputs.confirm-password.label')}
            </FormLabel>
            <FormControl>
              <Input type="password" placeholder={t('login.inputs.password.placeholder')} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
