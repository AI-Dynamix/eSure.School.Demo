// Mock data cho Lớp học (hierarchy-centric)

export type SchoolLevel = 'tieu_hoc' | 'thcs' | 'thpt'

export interface ClassRecord {
  id: string
  name: string          // 6A1, 9A2...
  grade: string         // 1, 2, 3 ... 12
  level: SchoolLevel
  declaredSize: number  // Sĩ số khai báo
  homeroomTeacher: string
  bhytCount: number     // Số HS đã có BHYT
  orderCount: number    // Số đơn hàng thành công (tính tỷ lệ)
}

export const SCHOOL_LEVELS: { id: SchoolLevel, name: string, grades: string[] }[] = [
  { id: 'tieu_hoc', name: 'Tiểu học', grades: ['1', '2', '3', '4', '5'] },
  { id: 'thcs', name: 'THCS', grades: ['6', '7', '8', '9'] },
  { id: 'thpt', name: 'THPT', grades: ['10', '11', '12'] },
]

// Trường THCS Lê Văn Tám (Tiểu học + THCS example)
export const classes: ClassRecord[] = [
  // Tiểu học - Khối 1
  { id: 'c1a1', name: '1A1', grade: '1', level: 'tieu_hoc', declaredSize: 35, homeroomTeacher: 'Lê Thị Hoa', bhytCount: 35, orderCount: 32 },
  { id: 'c1a2', name: '1A2', grade: '1', level: 'tieu_hoc', declaredSize: 34, homeroomTeacher: 'Nguyễn Thị Mai', bhytCount: 34, orderCount: 30 },
  { id: 'c1a3', name: '1A3', grade: '1', level: 'tieu_hoc', declaredSize: 35, homeroomTeacher: 'Trần Văn Tùng', bhytCount: 35, orderCount: 33 },
  
  // Tiểu học - Khối 2
  { id: 'c2a1', name: '2A1', grade: '2', level: 'tieu_hoc', declaredSize: 36, homeroomTeacher: 'Phạm Thị Lan', bhytCount: 36, orderCount: 34 },
  { id: 'c2a2', name: '2A2', grade: '2', level: 'tieu_hoc', declaredSize: 35, homeroomTeacher: 'Vũ Thị Hương', bhytCount: 35, orderCount: 32 },
  
  // Tiểu học - Khối 3
  { id: 'c3a1', name: '3A1', grade: '3', level: 'tieu_hoc', declaredSize: 38, homeroomTeacher: 'Hoàng Văn Minh', bhytCount: 38, orderCount: 35 },
  { id: 'c3a2', name: '3A2', grade: '3', level: 'tieu_hoc', declaredSize: 37, homeroomTeacher: 'Đỗ Thị Nga', bhytCount: 36, orderCount: 33 },
  
  // Tiểu học - Khối 4
  { id: 'c4a1', name: '4A1', grade: '4', level: 'tieu_hoc', declaredSize: 40, homeroomTeacher: 'Bùi Văn Hải', bhytCount: 40, orderCount: 38 },
  { id: 'c4a2', name: '4A2', grade: '4', level: 'tieu_hoc', declaredSize: 39, homeroomTeacher: 'Lý Thị Thanh', bhytCount: 38, orderCount: 35 },
  
  // Tiểu học - Khối 5  
  { id: 'c5a1', name: '5A1', grade: '5', level: 'tieu_hoc', declaredSize: 42, homeroomTeacher: 'Đinh Văn Quân', bhytCount: 42, orderCount: 40 },
  { id: 'c5a2', name: '5A2', grade: '5', level: 'tieu_hoc', declaredSize: 41, homeroomTeacher: 'Ngô Thị Bích', bhytCount: 40, orderCount: 38 },

  // THCS - Khối 6
  { id: 'c6a1', name: '6A1', grade: '6', level: 'thcs', declaredSize: 45, homeroomTeacher: 'Nguyễn Văn A', bhytCount: 45, orderCount: 42 },
  { id: 'c6a2', name: '6A2', grade: '6', level: 'thcs', declaredSize: 44, homeroomTeacher: 'Trần Thị B', bhytCount: 44, orderCount: 40 },
  { id: 'c6a3', name: '6A3', grade: '6', level: 'thcs', declaredSize: 45, homeroomTeacher: 'Lê Văn C', bhytCount: 43, orderCount: 45 },
  { id: 'c6a4', name: '6A4', grade: '6', level: 'thcs', declaredSize: 43, homeroomTeacher: 'Phạm Thị D', bhytCount: 40, orderCount: 38 },
  { id: 'c6a5', name: '6A5', grade: '6', level: 'thcs', declaredSize: 42, homeroomTeacher: 'Hoàng Văn E', bhytCount: 42, orderCount: 41 },

  // THCS - Khối 7
  { id: 'c7a1', name: '7A1', grade: '7', level: 'thcs', declaredSize: 42, homeroomTeacher: 'Vũ Thị F', bhytCount: 40, orderCount: 35 },
  { id: 'c7a2', name: '7A2', grade: '7', level: 'thcs', declaredSize: 40, homeroomTeacher: 'Đặng Văn G', bhytCount: 39, orderCount: 30 },
  { id: 'c7a3', name: '7A3', grade: '7', level: 'thcs', declaredSize: 41, homeroomTeacher: 'Bùi Thị H', bhytCount: 41, orderCount: 38 },
  { id: 'c7a4', name: '7A4', grade: '7', level: 'thcs', declaredSize: 43, homeroomTeacher: 'Đỗ Văn I', bhytCount: 43, orderCount: 40 },

  // THCS - Khối 8
  { id: 'c8a1', name: '8A1', grade: '8', level: 'thcs', declaredSize: 40, homeroomTeacher: 'Ngô Thị K', bhytCount: 38, orderCount: 25 },
  { id: 'c8a2', name: '8A2', grade: '8', level: 'thcs', declaredSize: 39, homeroomTeacher: 'Dương Văn L', bhytCount: 39, orderCount: 20 },
  { id: 'c8a3', name: '8A3', grade: '8', level: 'thcs', declaredSize: 41, homeroomTeacher: 'Lý Thị M', bhytCount: 40, orderCount: 30 },

  // THCS - Khối 9
  { id: 'c9a1', name: '9A1', grade: '9', level: 'thcs', declaredSize: 38, homeroomTeacher: 'Hồ Văn N', bhytCount: 38, orderCount: 15 },
  { id: 'c9a2', name: '9A2', grade: '9', level: 'thcs', declaredSize: 37, homeroomTeacher: 'Mai Thị O', bhytCount: 35, orderCount: 18 },
  { id: 'c9a3', name: '9A3', grade: '9', level: 'thcs', declaredSize: 39, homeroomTeacher: 'Trương Văn P', bhytCount: 39, orderCount: 25 },
]

// Helper functions
export const getClassesByLevel = (level: SchoolLevel) => classes.filter(c => c.level === level)
export const getClassesByGrade = (grade: string) => classes.filter(c => c.grade === grade)
export const getClassById = (id: string) => classes.find(c => c.id === id)

export const getClassesSummary = () => {
  const totalClasses = classes.length
  const totalStudents = classes.reduce((sum, c) => sum + c.declaredSize, 0)
  const totalOrders = classes.reduce((sum, c) => sum + c.orderCount, 0)
  const participationRate = (totalOrders / totalStudents) * 100

  return {
    totalClasses,
    totalStudents,
    totalOrders,
    participationRate: participationRate.toFixed(1)
  }
}

// Get tree structure for UI
export const getClassTree = () => {
  return SCHOOL_LEVELS.map(level => ({
    ...level,
    grades: level.grades.map(grade => ({
      grade,
      gradeName: `Khối ${grade}`,
      classes: classes.filter(c => c.level === level.id && c.grade === grade)
    })).filter(g => g.classes.length > 0)
  })).filter(l => l.grades.length > 0)
}
