import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  LogOut,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui"
import { FC } from "react"
import { cn } from "@/shared/lib"

interface Props {
  name: string
}

const avatarTextFallback = (name: string) => {
  const names = name.split(" ")

  return `${names[0][0].toUpperCase()}${names[1][0].toUpperCase() || ""}`
}

export const SideUser: FC<Props> = ({ name }) => {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="transition-transform group/icon duration-500 hover:bg-transparent data-[state=open]:scale-105 "
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="rounded-lg text-primary transition-colors bg-primary-foreground font-bold group-hover/icon:bg-secondary group-hover/icon:text-primary/80 group-data-[state=open]/icon:text-primary/80 group-data-[state=open]/icon:bg-secondary">{avatarTextFallback(name)}</AvatarFallback>
              </Avatar>
              <p className="text-base pl-1 font-semibold text-primary-foreground">
                {name}
              </p>
              <ChevronsUpDown className="ml-auto size-4 text-primary-foreground group-hover/icon:text-secondary group-data-[state=open]/icon:text-secondary" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className={cn("w-[--radix-dropdown-menu-trigger-width] px-2 max-w-56 md:max-w-max md:min-w-40 rounded-lg bg-primary text-primary-foreground border-secondary/25", isMobile ? "border-b-4 border-b-secondary" : "border-l-4 border-l-secondary")}
            side={isMobile ? "bottom" : "right"}
            align="end"
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg text-primary">{avatarTextFallback(name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{name}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-secondary/50" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="cursor-pointer focus:bg-secondary">
                <BadgeCheck />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-secondary">
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-secondary/50" />
            <DropdownMenuItem className="cursor-pointer focus:bg-red-600 focus:text-primary-foreground">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}