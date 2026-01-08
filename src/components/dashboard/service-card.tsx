import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, FileText } from 'lucide-react'

export interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  details: string[]
  badge?: string
  color: string
}

export function ServiceCard({ icon, title, description, details, badge, color }: ServiceCardProps) {
  return (
    <Card className='hover:shadow-lg transition-all'>
      <CardHeader className='pb-2'>
        <div className='flex items-start justify-between'>
          <div className={`p-3 rounded-xl ${color}`}>
            {icon}
          </div>
          {badge && <Badge variant='secondary'>{badge}</Badge>}
        </div>
        <CardTitle className='text-lg mt-3'>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <ul className='space-y-2 text-sm'>
          {details.map((detail, index) => (
            <li key={index} className='flex items-start gap-2'>
              <CheckCircle2 className='h-4 w-4 text-green-500 mt-0.5 shrink-0' />
              <span className='text-muted-foreground'>{detail}</span>
            </li>
          ))}
        </ul>
        <Button className='w-full' variant='outline'>
          <FileText className='h-4 w-4 mr-2' />
          Tìm hiểu chi tiết
        </Button>
      </CardContent>
    </Card>
  )
}
