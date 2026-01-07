import React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, ChevronRight, Laptop, Moon, Sun } from 'lucide-react'
import { useSearch } from '@/context/search-provider'
import { useTheme } from '@/context/theme-provider'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { sidebarData } from './layout/data/sidebar-data'
import { ScrollArea } from './ui/scroll-area'

export function CommandMenu() {
  const navigate = useNavigate()
  const { setTheme } = useTheme()
  const { open, setOpen } = useSearch()

  const runCommand = React.useCallback(
    (command: () => unknown) => {
      setOpen(false)
      command()
    },
    [setOpen]
  )

  return (
    <CommandDialog 
      modal 
      open={open} 
      onOpenChange={setOpen}
      className='sm:max-w-[40%] h-[60%] flex flex-col p-0 gap-0'
    >
      <CommandInput placeholder='Nhập lệnh hoặc tìm kiếm...' />
      <CommandList className='flex-1 max-h-none'>
        <ScrollArea type='hover' className='h-full pe-1'>
          <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>
          <CommandGroup heading="Điều hướng">
            {sidebarData.navMain.map((navItem, i) => {
              // Level 1 items with URL
              if (navItem.url) {
                return (
                  <CommandItem
                    key={`${navItem.url}-${i}`}
                    value={navItem.title}
                    onSelect={() => {
                      runCommand(() => navigate({ to: navItem.url }))
                    }}
                  >
                    <div className='flex size-4 items-center justify-center'>
                      <ArrowRight className='size-2 text-muted-foreground/80' />
                    </div>
                    {navItem.title}
                  </CommandItem>
                )
              }

              // Level 1 items with sub-items
              return (navItem as any).items?.map((subItem: any, j: number) => (
                <CommandItem
                  key={`${navItem.title}-${subItem.url}-${j}`}
                  value={`${navItem.title} ${subItem.title}`}
                  onSelect={() => {
                    runCommand(() => navigate({ to: subItem.url }))
                  }}
                >
                  <div className='flex size-4 items-center justify-center'>
                    <ArrowRight className='size-2 text-muted-foreground/80' />
                  </div>
                  {navItem.title} <ChevronRight className="size-2" /> {subItem.title}
                </CommandItem>
              ))
            })}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Giao diện'>
            <CommandItem onSelect={() => runCommand(() => setTheme('light'))}>
              <Sun /> <span>Sáng</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('dark'))}>
              <Moon className='scale-90' />
              <span>Tối</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => setTheme('system'))}>
              <Laptop />
              <span>Hệ thống</span>
            </CommandItem>
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  )
}
