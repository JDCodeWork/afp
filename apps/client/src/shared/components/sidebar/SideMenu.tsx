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

export const SideMenu = (props: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      {...props}
      collapsible="icon"
      variant="inset"
      className="bg-primary rounded-r-xl">
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
      <SidebarFooter />
    </Sidebar >
  )
}

