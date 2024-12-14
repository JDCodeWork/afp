
import { FC, PropsWithChildren } from "react"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui"
import { SideMenu } from "./SideMenu"

export const Sidebar: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <SideMenu />
      <SidebarInset>
        <SidebarTrigger />
        <div className="ml-4">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

