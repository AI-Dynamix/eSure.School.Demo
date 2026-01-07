import { createFileRoute } from '@tanstack/react-router'
import { Import } from '@/features/import'

export const Route = createFileRoute('/_authenticated/import/')({
  component: Import,
})
