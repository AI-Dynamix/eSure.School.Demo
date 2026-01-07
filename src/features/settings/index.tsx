import { Outlet } from '@tanstack/react-router'
import { Monitor, Bell, Palette, Wrench, UserCog } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { SidebarNav } from './components/sidebar-nav'

const sidebarNavItems = [
  {
    title: 'Hồ sơ',
    href: '/settings',
    icon: <UserCog size={18} />,
  },
  {
    title: 'Tài khoản',
    href: '/settings/account',
    icon: <Wrench size={18} />,
  },
  {
    title: 'Giao diện',
    href: '/settings/appearance',
    icon: <Palette size={18} />,
  },
  {
    title: 'Thông báo',
    href: '/settings/notifications',
    icon: <Bell size={18} />,
  },
  {
    title: 'Hiển thị',
    href: '/settings/display',
    icon: <Monitor size={18} />,
  },
]

export function Settings() {
  return (
    <>
      <Header fixed title='Cài đặt' description='Quản lý cài đặt tài khoản và tùy chọn email' />

      <Main fixed>
        <div className='flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1'>
            <Outlet />
          </div>
        </div>
      </Main>
    </>
  )
}
