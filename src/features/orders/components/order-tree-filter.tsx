import * as React from 'react'
import { ChevronDown, ChevronRight, MapPin, School, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getProvinceList, getDistrictList, allSchools } from '@/data/vn-schools-loader'

interface TreeItemProps {
  label: string
  id: string
  level: number
  hasChildren: boolean
  isOpen: boolean
  onToggle: () => void
  isSelected: boolean
  onSelect: () => void
  icon?: React.ReactNode
}

function TreeItem({ 
  label, 
  level, 
  hasChildren, 
  isOpen, 
  onToggle, 
  isSelected, 
  onSelect,
  icon 
}: TreeItemProps) {
  return (
    <div
      className={cn(
        'group flex items-center py-1.5 px-2 rounded-md cursor-pointer text-sm transition-colors',
        isSelected ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
        level > 0 && 'ml-4'
      )}
      onClick={(e) => {
        e.stopPropagation()
        if (hasChildren) onToggle()
        onSelect()
      }}
    >
      <div className='flex items-center gap-1.5 w-full overflow-hidden'>
        {hasChildren ? (
          <div className='h-4 w-4 shrink-0 flex items-center justify-center text-muted-foreground'>
            {isOpen ? <ChevronDown className='h-3 w-3' /> : <ChevronRight className='h-3 w-3' />}
          </div>
        ) : (
          <div className='h-4 w-4 shrink-0' />
        )}
        {icon && <div className='shrink-0 opacity-70'>{icon}</div>}
        <span className='truncate leading-none'>{label}</span>
      </div>
    </div>
  )
}

export function OrderTreeFilter() {
  const provinces = React.useMemo(() => getProvinceList().slice(0, 10), []) // Limiting for demo
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({})
  const [selectedItem, setSelectedItem] = React.useState<string>('root')
  const [searchTerm, setSearchTerm] = React.useState('')

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className='flex flex-col h-full bg-card border rounded-xl overflow-hidden shadow-sm'>
      <div className='p-4 border-b space-y-3'>
        <h3 className='font-semibold text-sm'>Lọc theo khu vực</h3>
        <div className='relative'>
          <Search className='absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground' />
          <Input 
            className='pl-8 h-8 text-xs' 
            placeholder='Tìm tỉnh, trường...' 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className='flex-1 p-2'>
        <div className='space-y-1 pb-4'>
          <TreeItem 
            label="Toàn quốc" 
            id="root" 
            level={0} 
            hasChildren={false} 
            isOpen={false} 
            onToggle={() => {}} 
            isSelected={selectedItem === 'root'} 
            onSelect={() => setSelectedItem('root')} 
          />
          
          {provinces.map(province => {
            const isOpen = openItems[province]
            const districts = isOpen ? getDistrictList(province).slice(0, 5) : []
            
            return (
              <React.Fragment key={province}>
                <TreeItem 
                  label={province} 
                  id={province} 
                  level={0} 
                  hasChildren={true} 
                  isOpen={isOpen} 
                  onToggle={() => toggleItem(province)} 
                  isSelected={selectedItem === province} 
                  onSelect={() => setSelectedItem(province)}
                  icon={<MapPin className='h-3 w-3' />}
                />
                
                {isOpen && districts.map(district => {
                  const districtId = `${province}-${district}`
                  const isDistrictOpen = openItems[districtId]
                  const schools = isDistrictOpen ? allSchools.filter(s => s.province === province && s.district === district).slice(0, 5) : []
                  
                  return (
                    <React.Fragment key={districtId}>
                      <TreeItem 
                        label={district} 
                        id={districtId} 
                        level={1} 
                        hasChildren={true} 
                        isOpen={isDistrictOpen} 
                        onToggle={() => toggleItem(districtId)} 
                        isSelected={selectedItem === districtId} 
                        onSelect={() => setSelectedItem(districtId)}
                      />
                      
                      {isDistrictOpen && schools.map(school => (
                        <TreeItem 
                          key={school.id}
                          label={school.name} 
                          id={school.id} 
                          level={2} 
                          hasChildren={false} 
                          isOpen={false} 
                          onToggle={() => {}} 
                          isSelected={selectedItem === school.id} 
                          onSelect={() => setSelectedItem(school.id)}
                          icon={<School className='h-3 w-3' />}
                        />
                      ))}
                    </React.Fragment>
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
