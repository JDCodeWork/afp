
// import { UserElement } from "./UserElement";

import { SidebarProvider, SidebarTrigger } from "../ui"
import { AppSidebar } from "./AppSidebar"

export const Sidebar = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
    </SidebarProvider>
  )
}

