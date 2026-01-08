import { createFileRoute, redirect } from '@tanstack/react-router'
import { Partners } from '@/features/partners'

export const Route = createFileRoute('/_authenticated/partners/')({
  beforeLoad: () => {
    // Only esure_admin can access partners
    const role = localStorage.getItem('user_identity')
    if (role !== 'esure_admin') {
      throw redirect({ to: '/' })
    }
  },
  component: Partners,
})
