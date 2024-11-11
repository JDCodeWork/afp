import { Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next"

export const Loader = () => {
  const [t] = useTranslation("auth")

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto" />
        <h2 className="mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200">{t("loading-session.title")}</h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{t("loading-session.description")}</p>
      </div>
    </div>
  )
}
