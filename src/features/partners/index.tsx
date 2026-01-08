import { KPICard } from '@/components/dashboard/kpi-card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { Badge } from '@/components/ui/badge'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { insurers, paymentGateways } from '@/data/partners'
import { mockProducts } from '@/data/products'
import { CreditCard, Percent, Shield, Package, Coins, BarChart3 } from 'lucide-react'

export function Partners() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value)
  }

  return (
    <>
      <Header fixed title='Đối tác & Sản phẩm' description='Quản lý Gateway, Nhà bảo hiểm và Danh mục sản phẩm' />

      <Main>

        {/* KPI Cards */}
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6'>
          <KPICard variant="compact"
            title='Payment Gateway'
            value={paymentGateways.length}
            subtitle='SSC, Đối tác 2'
            icon={<CreditCard className='h-4 w-4' />}
          />
          <KPICard variant="compact"
            title='Công ty Bảo hiểm'
            value={insurers.length}
            subtitle='PVI, Bảo Việt, PTI...'
            icon={<Shield className='h-4 w-4' />}
          />
          <KPICard variant="compact"
            title='Sản phẩm hiện có'
            value={mockProducts.length}
            subtitle='Y tế & Tự nguyện'
            icon={<Package className='h-4 w-4' />}
          />
          <KPICard variant="compact"
            title='Hoa hồng TB'
            value={`${((mockProducts.reduce((s: number, p: any) => s + p.esureCommission, 0) / mockProducts.length)).toFixed(1)}%`}
            subtitle='eSure Retention'
            icon={<Percent className='h-4 w-4' />}
          />
        </div>

        <Tabs defaultValue='gateway' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='gateway'>Payment Gateway</TabsTrigger>
            <TabsTrigger value='insurer'>Công ty Bảo hiểm</TabsTrigger>
            <TabsTrigger value='product'>Sản phẩm</TabsTrigger>
          </TabsList>

          {/* Gateway Tab */}
          <TabsContent value='gateway'>
            <Card>
              <CardHeader>
                <CardTitle>Danh sách Payment Gateway</CardTitle>
                <CardDescription>
                  Đối tác thu hộ thanh toán phí bảo hiểm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Tên đầy đủ</TableHead>
                      <TableHead>MST</TableHead>
                      <TableHead>Ngân hàng</TableHead>
                      <TableHead className='text-right'>Hoa hồng</TableHead>
                      <TableHead className='text-right'>Kỳ TT</TableHead>
                      <TableHead className='text-right'>Ngày ĐS</TableHead>
                      <TableHead className='text-right'>Số tỉnh</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentGateways.map((g: any) => (
                      <TableRow key={g.id}>
                        <TableCell className='font-mono font-bold'>{g.code}</TableCell>
                        <TableCell className='font-medium'>{g.name}</TableCell>
                        <TableCell className='font-mono text-sm'>{g.taxCode}</TableCell>
                        <TableCell>{g.bankName}</TableCell>
                        <TableCell className='text-right'>
                          <Badge>{g.commissionRate}%</Badge>
                        </TableCell>
                        <TableCell className='text-right'>{g.paymentCycle} ngày</TableCell>
                        <TableCell className='text-right'>Ngày {g.reconciliationDay}</TableCell>
                        <TableCell className='text-right'>{g.regions.length}</TableCell>
                        <TableCell>
                          <Badge variant={g.status === 'active' ? 'default' : 'secondary'}>
                            {g.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Gateway Regions */}
            <div className='grid gap-4 md:grid-cols-2 mt-4'>
              {paymentGateways.map((g) => (
                <Card key={g.id}>
                  <CardHeader>
                    <CardTitle className='text-lg'>{g.shortName} - Vùng phụ trách</CardTitle>
                    <CardDescription>{g.regions.length} tỉnh/thành</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='flex flex-wrap gap-1'>
                      {g.regions.map((code: string) => (
                        <Badge key={code} variant='outline' className='font-mono'>
                          {code}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Insurer Tab */}
          <TabsContent value='insurer'>
            <Card>
              <CardHeader>
                <CardTitle>Danh sách Công ty Bảo hiểm</CardTitle>
                <CardDescription>
                  Công ty bảo hiểm gốc - Underwriter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã</TableHead>
                      <TableHead>Tên đầy đủ</TableHead>
                      <TableHead>MST</TableHead>
                      <TableHead>Ngân hàng</TableHead>
                      <TableHead className='text-right'>Retention</TableHead>
                      <TableHead className='text-right'>Kỳ TT</TableHead>
                      <TableHead className='text-right'>Ngày ĐS</TableHead>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {insurers.map((i: any) => (
                      <TableRow key={i.id}>
                        <TableCell className='font-mono font-bold'>{i.code}</TableCell>
                        <TableCell className='font-medium'>{i.shortName}</TableCell>
                        <TableCell className='font-mono text-sm'>{i.taxCode}</TableCell>
                        <TableCell>{i.bankName}</TableCell>
                        <TableCell className='text-right'>
                          <Badge variant='secondary'>{i.retentionRate}%</Badge>
                        </TableCell>
                        <TableCell className='text-right'>{i.paymentCycle} ngày</TableCell>
                        <TableCell className='text-right'>Ngày {i.reconciliationDay}</TableCell>
                        <TableCell>
                          <div className='flex flex-wrap gap-1'>
                            {i.products.map((p: string) => (
                              <Badge key={p} variant='outline' className='text-xs'>
                                {p.replace('PRD-', '')}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={i.status === 'active' ? 'default' : 'secondary'}>
                            {i.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Insurer Cards */}
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-5 mt-4'>
              {insurers.map((i: any) => (
                <Card key={i.id}>
                  <CardHeader className='pb-2'>
                    <CardTitle className='text-lg'>{i.shortName}</CardTitle>
                    <CardDescription className='text-xs'>{i.taxCode}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className='space-y-1 text-sm'>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Retention:</span>
                        <span className='font-medium'>{i.retentionRate}%</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Kỳ TT:</span>
                        <span>{i.paymentCycle} ngày</span>
                      </div>
                      <div className='flex justify-between'>
                        <span className='text-muted-foreground'>Sản phẩm:</span>
                        <span>{i.products.length}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value='product'>
            <Card>
              <CardHeader>
                <div className='flex items-center justify-between'>
                    <div>
                        <CardTitle>Danh mục Sản phẩm Bảo hiểm</CardTitle>
                        <CardDescription>
                            Chi tiết kênh bán, hoa hồng và chi phí định mức
                        </CardDescription>
                    </div>
                    <Badge variant='outline' className='h-fit'>
                        {mockProducts.length} Sản phẩm
                    </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Sản phẩm</TableHead>
                      <TableHead>Loại</TableHead>
                      <TableHead>Nhà BH gốc</TableHead>
                      <TableHead>Kênh bán</TableHead>
                      <TableHead className='text-right text-blue-600'>HH Đối tác</TableHead>
                      <TableHead className='text-right text-green-600'>HH eSure</TableHead>
                      <TableHead className='text-right'>Chi phí/Phí AD</TableHead>
                      <TableHead>Trạng thái</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockProducts.map((p: any) => (
                      <TableRow key={p.code}>
                        <TableCell>
                          <div className='flex flex-col'>
                            <span className='font-bold'>{p.name}</span>
                            <span className='text-xs font-mono text-muted-foreground'>{p.code}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                           <Badge variant={p.type === 'mandatory' ? 'default' : 'secondary'} className='whitespace-nowrap'>
                             {p.type === 'mandatory' ? 'Bắt buộc' : 'Tự nguyện'}
                           </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center gap-2'>
                            <div className='w-6 h-6 rounded bg-muted flex items-center justify-center text-[10px] font-bold overflow-hidden'>
                                {p.insurerLogo ? <img src={p.insurerLogo} alt='' className='w-full h-full object-contain' /> : p.insurer[0]}
                            </div>
                            <span>{p.insurer}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                            <div className='flex items-center gap-1.5'>
                                <BarChart3 className='h-3.5 w-3.5 text-muted-foreground' />
                                <span className='text-sm'>{p.salesChannel}</span>
                            </div>
                        </TableCell>
                        <TableCell className='text-right'>
                           <span className='font-semibold text-blue-600'>{p.partnerCommission}%</span>
                        </TableCell>
                        <TableCell className='text-right'>
                           <span className='font-semibold text-green-600'>{p.esureCommission}%</span>
                        </TableCell>
                        <TableCell className='text-right font-mono text-sm'>
                           <div className='flex flex-col'>
                                <span>{p.adminFee > 0 ? formatCurrency(p.adminFee) : '-'}</span>
                                {p.otherCosts > 0 && <span className='text-[10px] text-muted-foreground'>P.sinh: {formatCurrency(p.otherCosts)}</span>}
                           </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline' className='border-green-200 bg-green-50 text-green-700 text-[10px] py-0'>
                            ACTIVE
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className='grid gap-4 md:grid-cols-2 mt-4'>
                <Card className='bg-primary/[0.02] border-primary/10'>
                    <CardHeader className='pb-2'>
                        <div className='flex items-center gap-2'>
                            <Coins className='h-5 w-5 text-primary' />
                            <CardTitle className='text-base'>Cấu trúc Doanh thu</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className='text-sm text-muted-foreground'>
                        <ul className='space-y-2'>
                            <li className='flex justify-between'>
                                <span>Hoa hồng Đối tác (SSC/Gateway/School):</span>
                                <span className='text-foreground font-medium'>4% - 20%</span>
                            </li>
                            <li className='flex justify-between'>
                                <span>eSure Retention (Net Revenue):</span>
                                <span className='text-foreground font-medium'>1% - 25%</span>
                            </li>
                            <li className='flex justify-between'>
                                <span>Chi phí vận hành & Phí Admin:</span>
                                <span className='text-foreground font-medium'>Cố định theo gói</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
                <Card className='bg-blue-50/30 border-blue-100'>
                    <CardHeader className='pb-2'>
                        <CardTitle className='text-base'>Lưu ý vận hành</CardTitle>
                    </CardHeader>
                    <CardContent className='text-sm text-muted-foreground'>
                        <p>Các sản phẩm Bắt buộc (BHYT) có tỷ lệ hoa hồng thấp, tập trung vào số lượng lớn. Các sản phẩm Tự nguyện có biên lợi nhuận cao hơn và yêu cầu chi phí marketing/kênh bán tương ứng.</p>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>
        </Tabs>
      </Main>
    </>
  )
}
