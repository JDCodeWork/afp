import axios from "axios"
import i18next from "i18next"

export const createApi = (baseUrl = "") => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_URL}${baseUrl}`,
  })

  api.interceptors.request.use(cfg => {
    const currentLanguage = i18next.language

    cfg.headers["accept-language"] = currentLanguage

    return cfg
 })

  return api 
}