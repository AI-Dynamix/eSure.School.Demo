import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { SchoolDashboard } from '@/features/reports/dashboards/school-dashboard'

// ...

export function Schools() {
  const [selectedSchool, setSelectedSchool] = useState<any>(null)
  
  // ... existing code ...

  return (
    <>
      <Header fixed title='Danh sách Trường học' description='Bản đồ mạng lưới giáo dục toàn quốc (Dữ liệu thật)' />
      
      <Main>
        {/* ... existing main content ... */}
        
        {/* School Detail Dialog */}
        <Dialog open={!!selectedSchool} onOpenChange={(open) => !open && setSelectedSchool(null)}>
            <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        {selectedSchool?.name}
                        {selectedSchool?.isNational && <Badge variant="secondary">Sở quản lý</Badge>}
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {selectedSchool?.district}, {selectedSchool?.province}
                    </DialogDescription>
                </DialogHeader>
                
                <div className="mt-4">
                     <SchoolDashboard />
                </div>
            </DialogContent>
        </Dialog>

      </Main>
    </>
  )
}

