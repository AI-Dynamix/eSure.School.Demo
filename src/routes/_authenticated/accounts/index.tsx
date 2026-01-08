import { createFileRoute, redirect } from '@tanstack/react-router'
import { Accounts } from '@/features/accounts'

export const Route = createFileRoute('/_authenticated/accounts/')({
  beforeLoad: () => {
    // Only esure_admin can access accounts
    const role = localStorage.getItem('user_identity')
    if (role !== 'esure_admin') {
      throw redirect({ to: '/' })
    }
  },
  component: Accounts,
})
