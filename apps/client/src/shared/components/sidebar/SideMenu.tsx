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
import { SideItem } from "./SideItem"
import { SideUser } from "./SideUser"
import { useAuth } from "@/features/auth"

import { TbLayout2Filled } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { useTranslation } from "react-i18next"

export const SideMenu = (props: React.ComponentProps<typeof Sidebar>) => {
  const { authState: { user } } = useAuth()
  const { t } = useTranslation('global')

  const navElements = [
    {
      icon: TbLayout2Filled, label: t('sidebar.items.dashboard'), url: "/"
    },
    { icon: GrTransaction, label: t('sidebar.items.transactions'), url: "/transactions" },
    { icon: FaChartPie, label: t('sidebar.items.budgets'), url: "/budgets" },
    { icon: MdSavings, label: t('sidebar.items.savings'), url: "/savings" },
    { icon: FaFileInvoiceDollar, label: t('sidebar.items.bills'), url: "/bills" },
  ]

  return (
    <Sidebar
      {...props}
      collapsible="icon"
      variant="inset"
      className="bg-primary rounded-r-lg"
    >
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

