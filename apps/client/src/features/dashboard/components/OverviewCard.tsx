import { FC } from "react"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/shared/components/ui"


interface Props {
  desc: string
  value: string
}

export const OverviewCard: FC<Props> = ({ desc, value }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardDescription>{desc}</CardDescription>
        <CardTitle>{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}
