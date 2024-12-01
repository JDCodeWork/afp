import { TbLayout2Filled } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { FaChartPie } from "react-icons/fa";
import { MdSavings } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa6";

export const userPlaceholder = {
  name: "shadcn", 
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
}


interface NavElement {
  icon: React.FC
  label: string
  url: string
}

export const navElements: NavElement[] = [
  { icon: TbLayout2Filled, label: "Dashboard", url: "/" },
  { icon: GrTransaction, label: "Transactions", url: "/transactions" },
  { icon: FaChartPie, label: "Budgets", url: "/budgets" },
  { icon: MdSavings, label: "Pots", url: "/pots" },
  { icon: FaFileInvoiceDollar, label: "Recurring Bills", url: "/bills" },
]