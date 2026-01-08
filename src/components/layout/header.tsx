import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ConfigDrawer } from '@/components/config-drawer'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { SidebarTrigger } from '@/components/ui/sidebar'

type HeaderProps = {
  fixed?: boolean
  title: string
  description?: string
  actions?: React.ReactNode
}

export function Header({ fixed, title, description, actions }: HeaderProps) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop)
    }
    document.addEventListener('scroll', onScroll, { passive: true })
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-16 border-b',
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        offset > 10 && fixed ? 'shadow' : 'shadow-none'
      )}
    >
      <div
        className={cn(
          'relative flex h-full items-center gap-3 px-4 sm:gap-4',
          offset > 10 &&
            fixed &&
            'after:absolute after:inset-0 after:-z-10 after:bg-background/80 after:backdrop-blur-lg'
        )}
      >
        <SidebarTrigger className='mr-2 md:hidden' />

        {/* Left: Title + Description Info */}
        <div className='flex items-center gap-2 flex-1 min-w-0'>
          <h1 className='text-base sm:text-lg font-semibold tracking-tight truncate'>
            {title}
          </h1>
          {description && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className='text-muted-foreground hover:text-foreground transition-colors shrink-0'>
                    <Info className='h-4 w-4' />
                  </button>
                </TooltipTrigger>
                <TooltipContent side='bottom' className='max-w-xs'>
                  <p>{description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Right: Search, Theme, Config */}
        <div className='ms-auto hidden md:flex items-center gap-3'>
          {actions && <div className='flex items-center gap-2 mr-2'>{actions}</div>}
          <Search />
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
        
        {/* Mobile: Profile Dropdown */}
        <div className='md:hidden ms-auto'>
           <ProfileDropdown />
        </div>
      </div>
    </header>
  )
}
