import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { recentActivities } from '@/data/dashboard-stats'

export function RecentActivity() {
  return (
    <div className='space-y-8'>
      {recentActivities.map((item) => (
        <div className='flex items-center' key={item.id}>
          <Avatar className='h-9 w-9'>
            <AvatarImage src='/avatars/01.png' alt='Avatar' />
            <AvatarFallback>{item.detail.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className='ml-4 space-y-1'>
            <p className='text-sm font-medium leading-none'>{item.action}</p>
            <p className='text-sm text-muted-foreground'>
              {item.detail}
            </p>
          </div>
          <div className='ml-auto font-medium'>
            {item.amount}
            <div className='text-xs text-muted-foreground text-right'>{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
