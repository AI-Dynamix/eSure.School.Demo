import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

export function PublicForm() {
  const [complete, setComplete] = useState(false)

  if (complete) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='text-center text-green-600'>Hoàn tất!</CardTitle>
            <CardDescription className='text-center'>
              Thông tin đã được cập nhật thành công.
            </CardDescription>
          </CardHeader>
          <CardFooter className='justify-center'>
            <p className='text-sm text-muted-foreground'>Bạn có thể đóng trang này.</p>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle>Bổ sung thông tin</CardTitle>
          <CardDescription>
            Vui lòng kiểm tra và điền đầy đủ thông tin học sinh.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Họ và tên học sinh</Label>
            <Input id='name' defaultValue='Nguyễn Văn A' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='dob'>Ngày sinh</Label>
            <Input id='dob' type='date' defaultValue='2015-05-15' />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='parent'>Họ tên phụ huynh</Label>
            <Input id='parent' placeholder='Nhập họ tên...' />
          </div>
          <div className='space-y-2'>
              <Label htmlFor='phone'>Số điện thoại</Label>
              <Input id='phone' placeholder='09...' />
          </div>
        </CardContent>
        <CardFooter>
          <Button className='w-full' onClick={() => setComplete(true)}>
            Xác nhận & Hoàn tất
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
