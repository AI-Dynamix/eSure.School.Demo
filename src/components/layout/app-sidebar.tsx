import { useLayout } from '@/context/layout-provider'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { sidebarData, getNavByRole } from './data/sidebar-data'
import { NavGroup } from './nav-group'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'

// ... imports ...

export function AppSidebar() {
  const { collapsible, variant, role, setRole } = useLayout()
  
  // Find active team based on role
  const activeTeam = sidebarData.teams.find(t => t.role === role) || sidebarData.teams[0]
  const navItems = getNavByRole(activeTeam.role)

  const handleTeamChange = (team: typeof sidebarData.teams[0]) => {
     setRole(team.role)
  }

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
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
