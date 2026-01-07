import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileUp, Download, FileSpreadsheet, School, Users, Loader2, FileType, Map } from 'lucide-react'
import { useLayout } from '@/context/layout-provider'
import { cn } from '@/lib/utils'

export function Import() {
  const { role } = useLayout()
  const [isUploading, setIsUploading] = useState(false)
  const [processingStatus, setProcessingStatus] = useState<string>('')

  const isAgency = role === 'agency_admin'
  const isSchool = role === 'school_admin'
  const isEsure = role === 'esure_admin'

  const handleMockUpload = (type: string) => {
    if (isUploading) return

    setIsUploading(true)
    setProcessingStatus('Đang tải lên tập tin...')

    // Simulate upload delay
    setTimeout(() => {
      setProcessingStatus('Đang đọc dữ liệu...')
      
      // Simulate processing delay
      setTimeout(() => {
        let msg = ''
        switch(type) {
            case 'structure': msg = 'Đang phân tích cấu trúc Khối/Lớp...'; break;
            case 'students': msg = 'Đang nhận diện danh sách học sinh theo lớp...'; break;
            case 'schools': msg = 'Đang phân tích danh sách Trường học theo Phường/Xã...'; break;
        }
        setProcessingStatus(msg)
        
        // Simulate completion
        setTimeout(() => {
            setIsUploading(false)
            setProcessingStatus('')
            let alertMsg = ''
            switch(type) {
                case 'structure': alertMsg = 'Nhập cấu trúc trường thành công! Đã tạo 5 khối và 32 lớp.'; break;
                case 'students': alertMsg = 'Nhập dữ liệu học sinh thành công! Đã thêm 1,250 học sinh vào 32 lớp.'; break;
                case 'schools': alertMsg = 'Nhập danh sách trường thành công! Đã thêm 12 trường mới.'; break;
            }
            alert(alertMsg)
        }, 2000)
      }, 1500)
    }, 1500)
  }

  const handleDownloadTemplate = (type: string) => {
    alert(`Đang tải xuống mẫu: Mau_${type}.xlsx`)
  }

  return (
    <>
      <Header fixed title='Nhập dữ liệu' description='Công cụ nhập liệu hàng loạt cho hệ thống' />

      <Main>
        <div className='flex flex-col space-y-6'>
          <Tabs defaultValue={isAgency ? 'schools' : 'structure'} className='w-full'>
            <div className='flex items-center justify-between mb-4'>
                <TabsList className='grid w-fit grid-cols-2 lg:grid-cols-3'>
                    {(isSchool || isEsure) && (
                        <>
                            <TabsTrigger value='structure' className='flex items-center gap-2'>
                                <School className='h-4 w-4' />
                                <span className='hidden sm:inline'>Cấu trúc Trường</span>
                                <span className='sm:hidden'>Cấu trúc</span>
                            </TabsTrigger>
                            <TabsTrigger value='students' className='flex items-center gap-2'>
                                <Users className='h-4 w-4' />
                                <span className='hidden sm:inline'>Danh sách Học sinh</span>
                                <span className='sm:hidden'>Học sinh</span>
                            </TabsTrigger>
                        </>
                    )}
                    {(isAgency || isEsure) && (
                        <TabsTrigger value='schools' className='flex items-center gap-2'>
                            <Map className='h-4 w-4' />
                            <span className='hidden sm:inline'>Danh sách Trường</span>
                            <span className='sm:hidden'>Trường học</span>
                        </TabsTrigger>
                    )}
                </TabsList>
            </div>

            {/* Tab: Structure (School Admin) */}
            <TabsContent value='structure' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-7'>
                    <Card className='md:col-span-4 flex flex-col'>
                        <CardHeader>
                            <CardTitle>Nhập Cấu trúc Trường (Khối & Lớp)</CardTitle>
                            <CardDescription>
                                Thiết lập danh sách các Khối và Lớp học cho năm học hiện tại.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1 flex flex-col'>
                            <UploadArea 
                                isUploading={isUploading} 
                                status={processingStatus}
                                onUpload={() => handleMockUpload('structure')} 
                                icon={<School className='h-12 w-12 text-muted-foreground' />}
                            />
                        </CardContent>
                    </Card>

                    <InstructionsCard 
                        className='md:col-span-3'
                        title='Hướng dẫn Cấu trúc' 
                        onDownload={() => handleDownloadTemplate('structure')}
                        steps={[
                            { title: 'Tải mẫu', desc: 'Tải file Excel mẫu "CauTrucTruong.xlsx".' },
                            { title: 'Điền thông tin', desc: 'Điền tên Khối (VD: Khối 10) và tên Lớp (VD: 10A1).' },
                            { title: 'Tải lên', desc: 'Hệ thống sẽ tự động tạo cấu trúc cây thư mục lớp học.' }
                        ]}
                    />
                </div>
            </TabsContent>

            {/* Tab: Students (School Admin) */}
            <TabsContent value='students' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-7'>
                    <Card className='md:col-span-4 flex flex-col'>
                        <CardHeader>
                            <CardTitle>Nhập Danh sách Học sinh</CardTitle>
                            <CardDescription>
                                Import hồ sơ học sinh vào các lớp đã tạo. Hỗ trợ file Excel nhiều Sheets.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1 flex flex-col'>
                             <UploadArea 
                                isUploading={isUploading} 
                                status={processingStatus}
                                onUpload={() => handleMockUpload('students')} 
                                icon={<Users className='h-12 w-12 text-muted-foreground' />}
                            />
                        </CardContent>
                    </Card>

                     <InstructionsCard 
                        className='md:col-span-3'
                        title='Hướng dẫn Học sinh' 
                        onDownload={() => handleDownloadTemplate('students')}
                        steps={[
                            { title: 'Chuẩn bị dữ liệu', desc: 'File Excel có thể chứa nhiều Sheet (Ví dụ: Sheet "10A1"...).' },
                            { title: 'Định dạng cột', desc: 'Đảm bảo các cột: Họ tên, Ngày sinh, Giới tính, Mã định danh.' },
                            { title: 'Tự động phân lớp', desc: 'Nếu tên Sheet trùng với tên Lớp, hệ thống sẽ tự động đưa vào.' }
                        ]}
                    />
                </div>
            </TabsContent>

            {/* Tab: Schools (Agency Admin) */}
            <TabsContent value='schools' className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-7'>
                    <Card className='md:col-span-4 flex flex-col'>
                        <CardHeader>
                            <CardTitle>Nhập Danh sách Trường học</CardTitle>
                            <CardDescription>
                                Thêm mới hàng loạt trường học theo Phường/Xã vào hệ thống quản lý của Sở.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex-1 flex flex-col'>
                             <UploadArea 
                                isUploading={isUploading} 
                                status={processingStatus}
                                onUpload={() => handleMockUpload('schools')} 
                                icon={<Map className='h-12 w-12 text-muted-foreground' />}
                            />
                        </CardContent>
                    </Card>

                     <InstructionsCard 
                        className='md:col-span-3'
                        title='Hướng dẫn Nhập Trường' 
                        onDownload={() => handleDownloadTemplate('schools')}
                        steps={[
                            { title: 'Tải mẫu', desc: 'Tải file Excel mẫu dành cho Sở GD "DanhSachTruong.xlsx".' },
                            { title: 'Điền thông tin', desc: 'Điền tên Trường, Phường/Xã trực thuộc, Họ tên Hiệu trưởng và Số điện thoại.' },
                            { title: 'Phân quyền', desc: 'Hệ thống sẽ tự động tạo tài khoản Admin cho từng trường dựa trên mã trường.' }
                        ]}
                    />
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </Main>
    </>
  )
}

function UploadArea({ isUploading, status, onUpload, icon }: { isUploading: boolean, status: string, onUpload: () => void, icon: React.ReactNode }) {
    return (
        <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 text-center transition-colors hover:bg-accent/50 h-full min-h-[300px]'>
            {isUploading ? (
                <div className='flex flex-col items-center animate-in fade-in zoom-in duration-300'>
                    <div className='relative'>
                        <div className='absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse' />
                        <Loader2 className='h-12 w-12 text-primary animate-spin relative z-10' />
                    </div>
                    <h3 className='mt-6 text-lg font-semibold animate-pulse'>{status}</h3>
                    <p className='mt-2 text-sm text-muted-foreground'>Vui lòng không tắt trình duyệt...</p>
                </div>
            ) : (
                <>
                    <div className='rounded-full bg-secondary/50 p-4 mb-4 ring-1 ring-border shadow-sm'>
                        {icon}
                    </div>
                    <h3 className='text-lg font-semibold'>Kéo thả file Excel vào đây</h3>
                    <p className='mt-1 text-sm text-muted-foreground'>
                        hoặc click để chọn file từ máy tính
                    </p>
                    <div className='flex gap-2 mt-4 text-xs text-muted-foreground'>
                        <span className='flex items-center gap-1 bg-secondary px-2 py-1 rounded'><FileSpreadsheet className='h-3 w-3' /> .LSX</span>
                        <span className='flex items-center gap-1 bg-secondary px-2 py-1 rounded'><FileType className='h-3 w-3' /> .CSV</span>
                    </div>
                    <Button className='mt-8 min-w-[150px]' onClick={onUpload}>
                        <FileUp className='mr-2 h-4 w-4' />
                        Chọn tập tin
                    </Button>
                </>
            )}
        </div>
    )
}

function InstructionsCard({ title, steps, onDownload, className }: { title: string, steps: {title: string, desc: string}[], onDownload: () => void, className?: string }) {
    return (
        <Card className={cn('flex flex-col', className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>Quy trình nhập liệu chuẩn hóa</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6 flex-1 flex flex-col justify-between'>
                <div className='space-y-4'>
                    {steps.map((step, index) => (
                        <div key={index} className='flex gap-4 items-start'>
                            <div className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-semibold shadow-sm'>
                                {index + 1}
                            </div>
                            <div className='space-y-1 pt-1'>
                                <h4 className='text-sm font-medium leading-none'>{step.title}</h4>
                                <p className='text-sm text-muted-foreground'>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className='pt-4 border-t mt-auto'>
                    <Button variant='outline' className='w-full' onClick={onDownload}>
                        <Download className='mr-2 h-4 w-4' />
                        Tải file mẫu
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
