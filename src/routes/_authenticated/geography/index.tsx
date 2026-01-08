import { createFileRoute, redirect } from '@tanstack/react-router'
import { Geography } from '@/features/geography'

export const Route = createFileRoute('/_authenticated/geography/')({
  beforeLoad: () => {
    // Only esure_admin can access geography
    const role = localStorage.getItem('user_identity')
    if (role !== 'esure_admin') {
      throw redirect({ to: '/' })
    }
  },
  component: Geography,
})
