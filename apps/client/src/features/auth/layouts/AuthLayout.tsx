import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="w-full h-screen bg-primary-foreground/30 flex flex-col">
      <div className="size-full flex justify-center items-center gap-16">
        <Outlet />
      </div>
      <p className="text-xs text-primary/75 text-center pb-2">
        App illustrations by {" "}
        <a href="https://storyset.com/app" className="underline decoration-1 underline-offset-2 decoration-primary/50 italic">Storyset</a>
      </p>
    </div>
  )
}
