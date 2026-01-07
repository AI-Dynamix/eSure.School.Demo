// Vietnamese Student Mock Data Generator
// Generates realistic Vietnamese names with gender

// Common Vietnamese Surnames (Họ) - ~50
const SURNAMES = [
  'Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng',
  'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Tạ', 'Đinh', 'Cao', 'Trương',
  'Lưu', 'Đoàn', 'Tô', 'Mai', 'Hà', 'Tăng', 'Châu', 'Quách', 'La', 'Thái',
  'Kiều', 'Lâm', 'Triệu', 'Chu', 'Từ', 'Vương', 'Đào', 'Nghiêm', 'Mạc', 'Tống',
  'Phùng', 'Khương', 'Trịnh', 'Thi', 'Diệp', 'Lương', 'Thạch', 'Quang', 'Nông', 'Ông'
]

// Vietnamese Middle Names (Tên đệm) by Gender
const MIDDLE_NAMES_MALE = [
  'Văn', 'Hữu', 'Đức', 'Minh', 'Quốc', 'Thành', 'Thanh', 'Quang', 'Hoàng', 'Tuấn',
  'Công', 'Đình', 'Xuân', 'Trọng', 'Anh', 'Phúc', 'Bảo', 'Tiến', 'Hải', 'Chí'
]

const MIDDLE_NAMES_FEMALE = [
  'Thị', 'Ngọc', 'Kim', 'Thanh', 'Thúy', 'Mỹ', 'Hoài', 'Như', 'Phương', 'Bích',
  'Diễm', 'Tuyết', 'Ánh', 'Hồng', 'Yến', 'Thu', 'Hạnh', 'Tường', 'Minh', 'Khánh'
]

// Vietnamese First Names (Tên) by Gender
const FIRST_NAMES_MALE = [
  'An', 'Bình', 'Cường', 'Dũng', 'Đạt', 'Em', 'Giang', 'Hải', 'Hùng', 'Khang',
  'Kiên', 'Long', 'Lộc', 'Minh', 'Nam', 'Nghĩa', 'Phong', 'Phúc', 'Quân', 'Sang',
  'Sơn', 'Tài', 'Thắng', 'Thiện', 'Toàn', 'Trung', 'Tú', 'Tuấn', 'Vinh', 'Vũ',
  'Bảo', 'Đăng', 'Hiếu', 'Hoàng', 'Khôi', 'Khánh', 'Lâm', 'Luân', 'Nhân', 'Quốc',
  'Thịnh', 'Trí', 'Huy', 'Duy', 'Khải', 'Phát', 'Thành', 'Tiến', 'Việt', 'Hưng'
]

const FIRST_NAMES_FEMALE = [
  'Anh', 'Bích', 'Chi', 'Diệu', 'Dung', 'Giang', 'Hà', 'Hạnh', 'Hiền', 'Hoa',
  'Hồng', 'Hương', 'Lan', 'Linh', 'Loan', 'Mai', 'My', 'Nga', 'Ngân', 'Ngọc',
  'Nhung', 'Nhi', 'Phương', 'Quỳnh', 'Thảo', 'Thu', 'Thủy', 'Trang', 'Trâm', 'Trinh',
  'Tuyết', 'Uyên', 'Vân', 'Xuân', 'Yến', 'Ánh', 'Đào', 'Hằng', 'Khánh', 'Ly',
  'Mỹ', 'Na', 'Oanh', 'Phượng', 'Sen', 'Thúy', 'Tiên', 'Tú', 'Vi', 'Ý'
]

// Utility functions
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const randomInt = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min

export type Gender = 'Nam' | 'Nữ'

export interface Student {
  id: string
  fullName: string
  gender: Gender
  dob: string // DD/MM/YYYY
  year: number
  classId: string
  className: string
  bhytStatus: 'Có' | 'Không'
  insuranceStatus: 'Đã tham gia' | 'Chưa tham gia' | 'Chờ thanh toán'
  parentName: string
  parentPhone: string
}

// Generate a random Vietnamese name
export const generateVietnameseName = (gender?: Gender): string => {
  const g = gender || (Math.random() > 0.5 ? 'Nam' : 'Nữ')
  const surname = randomElement(SURNAMES)
  const middleName = g === 'Nam' 
    ? randomElement(MIDDLE_NAMES_MALE) 
    : randomElement(MIDDLE_NAMES_FEMALE)
  const firstName = g === 'Nam' 
    ? randomElement(FIRST_NAMES_MALE) 
    : randomElement(FIRST_NAMES_FEMALE)
  
  return `${surname} ${middleName} ${firstName}`
}

// Generate birth date based on grade
export const generateDOB = (grade: number): { dob: string, year: number } => {
  // 2024-2025 school year, Grade 6 = born 2012-2013
  const baseYear = 2024 - grade - 5 // Grade 6 (2024) -> born 2013
  const year = baseYear + randomInt(-1, 0)
  const month = randomInt(1, 12)
  const day = randomInt(1, 28)
  return {
    dob: `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`,
    year
  }
}

// Generate students for a class
export const generateStudentsForClass = (
  classId: string, 
  className: string, 
  grade: number, 
  count: number
): Student[] => {
  const students: Student[] = []
  
  for (let i = 1; i <= count; i++) {
    const gender: Gender = Math.random() > 0.5 ? 'Nam' : 'Nữ'
    const { dob, year } = generateDOB(grade)
    
    students.push({
      id: `${classId}-${String(i).padStart(2, '0')}`,
      fullName: generateVietnameseName(gender),
      gender,
      dob,
      year,
      classId,
      className,
      bhytStatus: Math.random() > 0.02 ? 'Có' : 'Không', // 98% có BHYT
      insuranceStatus: Math.random() > 0.3 
        ? 'Đã tham gia' 
        : Math.random() > 0.5 
          ? 'Chờ thanh toán' 
          : 'Chưa tham gia',
      parentName: generateVietnameseName(),
      parentPhone: `09${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`
    })
  }
  
  return students
}

// Generate all students for all classes
export const generateAllStudents = (classes: { id: string, name: string, grade: string, declaredSize: number }[]): Map<string, Student[]> => {
  const studentsByClass = new Map<string, Student[]>()
  
  classes.forEach(cls => {
    const students = generateStudentsForClass(
      cls.id, 
      cls.name, 
      parseInt(cls.grade), 
      cls.declaredSize
    )
    studentsByClass.set(cls.id, students)
  })
  
  return studentsByClass
}
