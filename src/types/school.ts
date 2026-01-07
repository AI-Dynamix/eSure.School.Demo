export interface School {
  id: string
  code: string
  name: string
  level: 'Mầm non' | 'Tiểu học' | 'THCS' | 'THPT'
  district: string
  province: string
  address: string
  totalStudents: number
  insuredCount: number
  insuredRate: number
  status: 'active' | 'inactive'
  contactName: string
  contactPhone: string
  contactEmail: string
  createdAt: string
}
