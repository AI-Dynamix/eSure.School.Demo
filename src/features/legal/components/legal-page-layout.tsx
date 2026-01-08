import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle } from 'lucide-react'
import { toast } from 'sonner'

interface LegalPageLayoutProps {
  title: string
  version?: string
  effectiveDate?: string
  children: React.ReactNode
  acceptMessage?: string
  declineMessage?: string
}

export function LegalPageLayout({
  title,
  version = '1.0',
  effectiveDate = '08/01/2026',
  children,
  acceptMessage = 'Cảm ơn bạn đã chấp nhận các điều khoản của chúng tôi.',
  declineMessage = 'Bạn cần đồng ý để tiếp tục sử dụng dịch vụ.'
}: LegalPageLayoutProps) {
  const navigate = useNavigate()
  const [isAccepting, setIsAccepting] = useState(false)

  const handleAccept = () => {
    setIsAccepting(true)
    setTimeout(() => {
      toast.success('Đã đồng ý', {
        description: acceptMessage,
      })
      setIsAccepting(false)
      navigate({ to: '/sign-in' })
    }, 500)
  }

  const handleDecline = () => {
    toast.error('Đã từ chối', {
      description: declineMessage,
    })
  }

  return (
    <div className='w-[60%] min-w-[800px] min-h-[90vh] mx-auto py-8'>
      <Card className='flex flex-col h-full'>
        <CardHeader className='border-b'>
          <CardTitle className='text-2xl'>{title}</CardTitle>
          <p className='text-sm text-muted-foreground'>
            Phiên bản: {version} | Ngày có hiệu lực: {effectiveDate}
          </p>
        </CardHeader>
        <CardContent className='flex-1'>
          <ScrollArea className='h-[60vh] pr-4'>
            <div className='prose prose-sm max-w-none dark:prose-invert space-y-6 py-4'>
              {children}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className='border-t pt-4 flex justify-end gap-3'>
          <Button variant='outline' onClick={handleDecline}>
            <XCircle className='h-4 w-4 mr-2' />
            Từ chối
          </Button>
          <Button onClick={handleAccept} disabled={isAccepting}>
            <CheckCircle2 className='h-4 w-4 mr-2' />
            {isAccepting ? 'Đang xử lý...' : 'Tôi đồng ý'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
