import { useTranslation } from "react-i18next"
import { Outlet } from "react-router-dom"

export function AuthLayout() {
  const [t] = useTranslation("auth")

  return (
    <div className="w-full h-screen bg-primary-foreground/30 flex flex-col">
      <div className="size-full flex justify-center items-center gap-16">
        <Outlet />
      </div>
      <p className="hidden md:text-xs md:text-primary/75 md:text-center md:pb-2">
        {t("attribution") + " "}
        <a href="https://storyset.com/app" className="underline decoration-1 underline-offset-2 decoration-primary/50 italic">Storyset</a>
      </p>
    </div>
  )
}
