import { ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import { Team } from './data/sidebar-data'

type TeamSwitcherProps = {
  teams: Team[]
  activeTeam: Team
  onTeamChange: (team: Team) => void
}

export function TeamSwitcher({ teams, activeTeam, onTeamChange }: TeamSwitcherProps) {
  const { isMobile } = useSidebar()
  
  // Filter teams based on mock user identity
  const visibleTeams = teams.filter(team => {
    if (typeof window === 'undefined') return true
    const userIdentity = localStorage.getItem('user_identity')
    
    // If identity is ssc_admin, hide esure_admin role
    if (userIdentity === 'ssc_admin' && team.role === 'esure_admin') {
      return false
    }
    
    return true
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className={cn(
                'flex aspect-square size-8 items-center justify-center rounded-lg',
                typeof activeTeam.logo === 'string' ? 'bg-transparent' : 'bg-sidebar-primary text-sidebar-primary-foreground'
              )}>
                {typeof activeTeam.logo === 'string' ? (
                  <img src={activeTeam.logo} alt={activeTeam.name} className='size-7 object-contain' />
                ) : (
                  <activeTeam.logo className='size-4' />
                )}
              </div>
              <div className='grid flex-1 text-start text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeTeam.name}
                </span>
                <span className='truncate text-xs'>{activeTeam.plan}</span>
              </div>
              <ChevronsUpDown className='ms-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Vai trò
            </DropdownMenuLabel>
            {visibleTeams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => onTeamChange(team)}
                className='gap-2 p-2'
              >
                <div className={cn(
                  'flex size-6 items-center justify-center rounded-sm',
                  typeof team.logo === 'string' ? '' : 'border'
                )}>
                  {typeof team.logo === 'string' ? (
                    <img src={team.logo} alt={team.name} className='size-5 object-contain' />
                  ) : (
                    <team.logo className='size-4 shrink-0' />
                  )}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
