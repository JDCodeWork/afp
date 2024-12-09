import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from "@/shared/components/ui"
import { navElements } from "@/shared/constants/nav-elements.constant"
import { SideItem } from "./SideItem"
import { SideUser } from "./SideUser"
import { useAuth } from "@/features/auth"

export const SideMenu = (props: React.ComponentProps<typeof Sidebar>) => {
  const { authState: { user } } = useAuth()

  return (
    <Sidebar
      {...props}
      collapsible="icon"
      variant="inset"
      className="bg-primary rounded-r-lg">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup >
          <SidebarGroupLabel className="text-primary-foreground">Applications</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-2 pr-8">
              {
                navElements.map(element => (
                  <SideItem key={element.label} {...element} />
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SideUser name={user?.name || ""} />
      </SidebarFooter>
    </Sidebar >
  )
}

