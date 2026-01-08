import { createFileRoute, redirect } from '@tanstack/react-router'
import { Orders } from '@/features/orders'

export const Route = createFileRoute('/_authenticated/orders/')({
  beforeLoad: () => {
    // Only esure_admin can access orders
    const role = localStorage.getItem('user_identity')
    if (role !== 'esure_admin') {
      throw redirect({ to: '/' })
    }
  },
  component: Orders,
})
