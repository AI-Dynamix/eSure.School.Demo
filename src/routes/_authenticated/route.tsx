import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout' // Keep this import

function RouteComponent() {
  return (
    <AuthenticatedLayout>
      <Outlet />
    </AuthenticatedLayout>
  )
}

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    // Skip check for auth routes if they were nested here (they shouldn't be)
    if (location.pathname.startsWith('/sign-in') || location.pathname.startsWith('/sign-up')) {
      return
    }

    const token = localStorage.getItem('mock-access-token')
    
    // Check for "mock-access-token" directly set in user-auth-form
    if (!token) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }

    // Check expiry
    const expiry = localStorage.getItem('mock-token-expiry')
    if (expiry && parseInt(expiry) < Date.now()) {
      // Token expired
      localStorage.removeItem('mock-access-token')
      localStorage.removeItem('mock-token-expiry')
      localStorage.removeItem('user_identity')
      
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: RouteComponent,
})
