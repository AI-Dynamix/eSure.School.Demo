import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { mockOrders } from '@/data/orders'
import { OrdersTable } from './components/orders-table'
import { OrderQuickStats } from './components/order-quick-stats'
import { OrderTrendCharts } from './components/order-trend-charts'
import { OrderTreeFilter } from './components/order-tree-filter'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export function Orders() {
  return (
    <>
      <Header fixed title='Quản lý Đơn hàng' description='Hệ thống quản lý hàng triệu đơn hàng bảo hiểm theo khu vực' />

      <Main fixed>
        <div className='flex h-full gap-6'>
          {/* Tree Filter Sidebar - 1/4 width */}
          <aside className='hidden w-80 lg:block'>
            <OrderTreeFilter />
          </aside>

          {/* Main Content Area - 3/4 width */}
          <div className='flex flex-1 flex-col gap-6 overflow-hidden'>
            {/* Quick Stats Dashboard */}
            <OrderQuickStats />

            {/* Table Area with Tabs */}
            <div className='flex-1 overflow-hidden bg-card border rounded-xl shadow-sm'>
                <Tabs defaultValue='all' className='space-y-4 flex h-full flex-col'>
                    <div className='px-4 pt-4'>
                        <TabsList>
                            <TabsTrigger 
                                value='all' 
                                className='flex items-center gap-2'
                            >
                                Tất cả đơn hàng
                                <Badge variant='secondary' className='rounded-full h-5 px-1.5 text-[10px]'>
                                    {mockOrders.length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger 
                                value='renewal'
                                className='flex items-center gap-2'
                            >
                                Đang tái tục
                                <Badge variant='secondary' className='rounded-full h-5 px-1.5 text-[10px] bg-blue-100/50 text-blue-700'>
                                    {mockOrders.filter(o => o.isRenewal).length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger 
                                value='claims'
                                className='flex items-center gap-2'
                            >
                                Đang bồi thường
                                <Badge variant='secondary' className='rounded-full h-5 px-1.5 text-[10px] bg-orange-100/50 text-orange-700'>
                                    {mockOrders.filter(o => o.hasClaim).length}
                                </Badge>
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className='flex-1 overflow-auto p-4 pt-0'>
                        <TabsContent value='all' className='mt-0 h-full'>
                            <OrdersTable data={mockOrders} />
                        </TabsContent>
                        <TabsContent value='renewal' className='mt-0 h-full'>
                            <OrdersTable data={mockOrders.filter(o => o.isRenewal)} />
                        </TabsContent>
                        <TabsContent value='claims' className='mt-0 h-full'>
                            <OrdersTable data={mockOrders.filter(o => o.hasClaim)} />
                        </TabsContent>
                    </div>
                </Tabs>
            </div>

            {/* Bottom Trend Charts */}
            <OrderTrendCharts />
          </div>
        </div>
      </Main>
    </>
  )
}
