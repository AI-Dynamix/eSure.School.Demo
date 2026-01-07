import { cn } from '@/lib/utils'

export function Logo({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src='/images/Logo.png'
      alt='eSure School'
      className={cn('h-10 w-auto', className)}
      {...props}
    />
  )
}
