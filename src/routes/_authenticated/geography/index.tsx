import { createFileRoute } from '@tanstack/react-router'
import { Geography } from '@/features/geography'

export const Route = createFileRoute('/_authenticated/geography/')({
  component: Geography,
})
