import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'

export function SignUp() {
  return (
    <AuthLayout>
      <Card className='gap-4'>
        <CardHeader>
          <CardTitle className='text-lg tracking-tight'>
            Đăng ký tài khoản
          </CardTitle>
          <CardDescription>
            Hệ thống hiện tại chưa hỗ trợ tự đăng ký. <br />
            Đã có tài khoản?{' '}
            <Link
              to='/sign-in'
              className='underline underline-offset-4 hover:text-primary'
            >
              Đăng nhập
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-sm text-muted-foreground text-center py-4 bg-muted/50 rounded-lg'>
            Vui lòng liên hệ bộ phận Admin của eSure để được cấp tài khoản truy cập.
            <br />
            <br />
            <span className='font-medium'>Hotline: 1900 xxxx</span>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
