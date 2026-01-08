import rawSchools from './vn-schools-data.json'

export interface SchoolBase {
  id: string
  name: string
  province: string
  district: string
  isNational: boolean // if true, belongs to "Trường trực thuộc sở"
  level: 'Mầm non' | 'Tiểu học' | 'THCS' | 'THPT'
  totalStudents: number
  participationRate: number
  principalName: string
  principalPhone: string
}

// Deterministic random based on ID or Name
const seedRandom = (str: string) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  const x = Math.sin(hash) * 10000
  return x - Math.floor(x)
}

const getRandomInRange = (min: number, max: number, seed: string) => {
  return Math.floor(seedRandom(seed) * (max - min + 1) + min)
}

const FIRST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Phan', 'Vũ', 'Đặng', 'Bùi', 'Đỗ']
const MIDDLE_NAMES = ['Văn', 'Thị', 'Hoàng', 'Minh', 'Thanh', 'Quốc', 'Kim', 'Đức', 'Huỳnh', 'Ngọc']
const LAST_NAMES = ['Anh', 'Bình', 'Chi', 'Dũng', 'Em', 'Giang', 'Hùng', 'Linh', 'Minh', 'Nam']

const generatePrincipalName = (seed: string) => {
  const f = FIRST_NAMES[Math.floor(seedRandom(seed + 'f') * FIRST_NAMES.length)]
  const m = MIDDLE_NAMES[Math.floor(seedRandom(seed + 'm') * MIDDLE_NAMES.length)]
  const l = LAST_NAMES[Math.floor(seedRandom(seed + 'l') * LAST_NAMES.length)]
  return `${f} ${m} ${l}`
}

const generatePhone = (seed: string) => {
  return `09${Math.floor(seedRandom(seed + 'p') * 100000000).toString().padStart(8, '0')}`
}

const determineLevel = (name: string): 'Mầm non' | 'Tiểu học' | 'THCS' | 'THPT' => {
    const n = name.toLowerCase()
    if (n.includes('thpt') || n.includes('trung học phổ thông') || n.includes('cấp 3')) return 'THPT'
    if (n.includes('thcs') || n.includes('trung học cơ sở') || n.includes('cấp 2')) return 'THCS'
    if (n.includes('tiểu học') || n.includes('th ') || n.includes('cấp 1')) return 'Tiểu học'
    if (n.includes('mầm non') || n.includes('mẫu giáo')) return 'Mầm non'
    return 'Tiểu học' // Fallback
}

export const loadSchoolData = (): SchoolBase[] => {
  const schools: SchoolBase[] = []

  Object.entries(rawSchools).forEach(([provinceName, districts]) => {
    Object.entries(districts as any).forEach(([districtName, schoolList]) => {
      (schoolList as string[]).forEach((schoolRaw) => {
        // Format of schoolRaw is often "Name (ID)"
        const match = schoolRaw.match(/(.+)\s+\((.+)\)/)
        const name = match ? match[1].trim() : schoolRaw.trim()
        const id = match ? match[2].trim() : `S-${seedRandom(schoolRaw).toString().slice(2, 10)}`

        const totalStudents = getRandomInRange(200, 2500, id)
        const participationRate = 85 + (seedRandom(id + 'rate') * 15) // 85-100%

        schools.push({
          id,
          name: name.replace(/&amp;/g, '&'),
          province: provinceName,
          district: districtName,
          isNational: districtName === 'Trường trực thuộc sở',
          level: determineLevel(name),
          totalStudents,
          participationRate: parseFloat(participationRate.toFixed(1)),
          principalName: generatePrincipalName(id),
          principalPhone: generatePhone(id)
        })
      })
    })
  })

  return schools
}

export const allSchools = loadSchoolData()

export const getSchoolsByProvince = (provinceName: string) => {
  return allSchools.filter(s => s.province === provinceName)
}

export const getSchoolsByDistrict = (provinceName: string, districtName: string) => {
  return allSchools.filter(s => s.province === provinceName && s.district === districtName)
}

export const getDistrictList = (provinceName: string) => {
  const provinceData = (rawSchools as any)[provinceName]
  return provinceData ? Object.keys(provinceData) : []
}

export const getProvinceList = () => {
    return Object.keys(rawSchools)
}
