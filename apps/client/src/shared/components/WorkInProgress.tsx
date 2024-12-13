import { FC } from "react"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui"

interface Props {
  isOpen: boolean
  handleOpenChange: (open: boolean) => void
}
export const WorkInProgress: FC<Props> = ({ isOpen, handleOpenChange }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="bg-primary text-primary-foreground border-none">
        <AlertDialogHeader>
          <AlertDialogTitle>Work in progress</AlertDialogTitle>
          <AlertDialogDescription>This feature is currently under development, thanks for the wait</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-primary-foreground text-primary border-none">Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
