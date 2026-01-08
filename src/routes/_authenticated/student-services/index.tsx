import { createFileRoute } from '@tanstack/react-router'
import { StudentServices } from '@/features/student-services'

export const Route = createFileRoute('/_authenticated/student-services/')({
  component: StudentServices,
})
