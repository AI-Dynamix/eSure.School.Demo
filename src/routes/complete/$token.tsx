import { createFileRoute } from '@tanstack/react-router'
import { PublicForm } from '@/features/public-form'

export const Route = createFileRoute('/complete/$token')({
  component: PublicForm,
})
