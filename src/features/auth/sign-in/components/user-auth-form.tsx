import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn } from 'lucide-react'
import { toast } from 'sonner'
import { Checkbox } from '@/components/ui/checkbox'

import { useAuthStore } from '@/stores/auth-store'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === '' ? 'Vui lòng nhập email' : undefined),
  }),
  password: z
    .string()
    .min(1, 'Vui lòng nhập mật khẩu')
    .min(7, 'Mật khẩu phải có ít nhất 7 ký tự'),
  rememberMe: z.boolean().default(false).optional(),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  // Load saved email and password on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('remembered_email')
    const savedPassword = localStorage.getItem('remembered_password')
    if (savedEmail && savedPassword) {
      form.setValue('email', savedEmail)
      form.setValue('password', savedPassword)
      form.setValue('rememberMe', true)
    }
  }, [form])

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Helper to hash password
    const hashPassword = async (password: string) => {
      const msgBuffer = new TextEncoder().encode(password)
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    }

    const hashedPassword = await hashPassword(data.password)

    // Defined hashes
    // Admin: Quantri@2025 -> e3a375a5...
    // SSC: GiamSat@2025 -> a898d171...
    
    const VALID_ACCOUNTS = {
        'admin@esure.vn': { hash: 'e3a375a5aa0fb147662eeeda2d3ad2900850b5fff0a1f760e8bf1904ff5b8c89', role: 'esure_admin' },
        'ssc@esure.vn': { hash: 'a898d1714b3b5f8a169df4bbaa8c2ee027569965503463444643e6b52c59f512', role: 'ssc_admin' }
    }

    const validAccount = VALID_ACCOUNTS[data.email as keyof typeof VALID_ACCOUNTS]

    if (!validAccount) {
         toast.error('Tài khoản không tồn tại')
         setIsLoading(false)
         return
    }

    if (hashedPassword !== validAccount.hash) {
        toast.error('Mật khẩu không chính xác')
        setIsLoading(false)
        return
    }

    toast.success(`Chào mừng trở lại, ${data.email}!`)

    // Handle Remember Me
    if (data.rememberMe) {
      localStorage.setItem('remembered_email', data.email)
      localStorage.setItem('remembered_password', data.password)
    } else {
      localStorage.removeItem('remembered_email')
      localStorage.removeItem('remembered_password')
    }

    // Save mock identity and token
    localStorage.setItem('user_identity', validAccount.role)
    localStorage.setItem('mock-access-token', 'mock-token-' + Date.now())
    localStorage.setItem('mock-token-expiry', (Date.now() + 24 * 60 * 60 * 1000).toString())

    const mockUser = {
      accountNo: 'ACC001',
      email: data.email,
      role: ['user'], // This internal role is just for store compatibility
      exp: Date.now() + 24 * 60 * 60 * 1000, 
    }

    // Set user and access token in store
    auth.setUser(mockUser)
    auth.setAccessToken('mock-access-token')

    setIsLoading(false)

    // Redirect to the stored location or default to dashboard
    const targetPath = redirectTo || '/'
    navigate({ to: targetPath, replace: true })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='absolute end-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75'
              >
                Quên mật khẩu?
              </Link>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='rememberMe'
          render={({ field }) => (
            <FormItem className='flex flex-row items-center space-x-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className='grow space-y-0 text-left'>
                <FormLabel className='text-sm font-normal'>
                  Ghi nhớ tài khoản
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Đăng nhập
        </Button>
      </form>
    </Form>
  )
}
