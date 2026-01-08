import { useNavigate } from '@tanstack/react-router'
import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupContent,
} from '@/components/ui/sidebar'
import { sidebarData, getNavByRole } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useAuthStore } from '@/stores/auth-store'

export function AppSidebar() {
  const { collapsible, variant, role, setRole } = useLayout()
  const { auth } = useAuthStore()
  const navigate = useNavigate()
  
  // Find active team based on role
  const activeTeam = sidebarData.teams.find(t => t.role === role) || sidebarData.teams[0]
  const navItems = getNavByRole(activeTeam.role)

  const handleTeamChange = (team: typeof sidebarData.teams[0]) => {
     setRole(team.role)
     navigate({ to: '/' })
  }

  // Derive display user
  // If we have a user in store, use it. Otherwise fall back to sidebarData.user or mock based on role
  // We prefer reading from localStorage for 'remembered' email or user_identity role for a better default
  
  const savedEmail = localStorage.getItem('remembered_email') // from Remember Me
  // Or check the user in auth store. 
  // In our Mock Login (UserAuthForm), we set auth.user with email.
  
  const displayUser = {
      name: auth.user?.email ? (auth.user.email.includes('admin') ? 'eSure Admin' : 'SSC Admin') : sidebarData.user.name,
      email: auth.user?.email || savedEmail || 'admin@esure.school',
      avatar: sidebarData.user.avatar
  }

  // Refine name logic
  if (displayUser.email === 'admin@esure.vn') displayUser.name = 'eSure Admin'
  if (displayUser.email === 'ssc@esure.vn') displayUser.name = 'SSC Admin'

  return (
    <Sidebar collapsible={collapsible} variant={variant}>
      <SidebarHeader>
        <TeamSwitcher 
          teams={sidebarData.teams} 
          activeTeam={activeTeam}
          onTeamChange={handleTeamChange}
        />
        <div className='md:hidden mt-2 px-1'>
           <Search />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className='md:hidden py-0'>
            <SidebarGroupContent>
                 <div className='flex items-center justify-between px-2 py-2 mb-2'>
                    <span className='text-sm font-medium'>Giao diện</span>
                    <ThemeSwitch />
                 </div>
            </SidebarGroupContent>
        </SidebarGroup>
        <NavGroup title="Chức năng" items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
