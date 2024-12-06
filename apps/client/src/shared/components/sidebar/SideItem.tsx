import { NavLink, NavLinkRenderProps, useNavigate } from "react-router-dom"
import { SidebarMenuButton, SidebarMenuItem } from "../ui"
import { cn } from "@/shared/lib"
import { useState } from "react"

interface Props {
  label: string
  url: string
  icon: React.FC
}

export const SideItem: React.FC<Props> = ({ icon: Icon, label, url }) => {
  const [isActivePage, setIsActivePage] = useState(false)

  const navigate = useNavigate()

  const handleClassName = ({ isActive }: NavLinkRenderProps) => {
    setIsActivePage(isActive)

    const baseClass = "flex items-center gap-2 text-xl h-full"

    return cn(baseClass, isActive && "font-bold")
  }

  const handleOnClick = () => navigate(url)

  const tooltipOptions = {
    children: label,
    className:
      cn(
        "bg-primary text-primary-foreground border-l-4 rounded-l",
        isActivePage
          ? "border-l-secondary"
          : "border-l-primary-foreground"
      )
  }


  return (
    <SidebarMenuItem>
      <SidebarMenuButton tooltip={tooltipOptions} onClick={handleOnClick} className={cn(`h-auto transition-colors rounded`, isActivePage ? "hover:bg-secondary text-secondary hover:text-primary" : "hover:bg-primary-foreground text-primary-foreground/80 hover:text-primary/80")}>
        <NavLink to={url} className={handleClassName} >
          <Icon />
          <span>
            {label}
          </span>
        </NavLink>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
