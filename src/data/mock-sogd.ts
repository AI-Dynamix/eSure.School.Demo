import { getSchoolsByProvince } from './vn-schools-loader'

export type SchoolType = 'Public' | 'Private' | 'International'

export interface GradeStat {
  grade: string
  participationRate: number
}

export interface SchoolInfo {
  id: string
  name: string
  type: SchoolType
  address: string
  principalName: string
  principalPhone: string
  totalStudents: number
  bhytCount: number
  bhytRate: number
  gradeStats: GradeStat[]
}

export interface WardInfo {
  id: string
  name: string
  schools: SchoolInfo[]
  totalSchools: number
  totalStudents: number
  avgBhytRate: number
}

// Deterministic mock data enhancement
const getSchoolType = (id: string): SchoolType => {
  const seed = parseInt(id.replace(/\D/g, '')) || 0
  if (seed % 10 === 0) return 'International'
  if (seed % 4 === 0) return 'Private'
  return 'Public'
}

const transformToSchoolInfo = (s: any): SchoolInfo => {
  const bhytRate = s.participationRate
  const bhytCount = Math.floor(s.totalStudents * (bhytRate / 100))
  
  const gradeStats: GradeStat[] = ['6', '7', '8', '9'].map(g => ({
    grade: g,
    participationRate: parseFloat((bhytRate - 2 + Math.random() * 4).toFixed(1))
  }))

  return {
    id: s.id,
    name: s.name,
    type: getSchoolType(s.id),
    address: `${s.district}, ${s.province}`,
    principalName: s.principalName,
    principalPhone: s.principalPhone,
    totalStudents: s.totalStudents,
    bhytCount,
    bhytRate,
    gradeStats
  }
}

/**
 * Generates agency report data for a specific province
 */
export const getAgencyReportData = (provinceName: string): WardInfo[] => {
  const schoolsRaw = getSchoolsByProvince(provinceName)
  
  const schoolsByDistrict: Record<string, SchoolInfo[]> = {}
  schoolsRaw.forEach(s => {
    if (!schoolsByDistrict[s.district]) {
      schoolsByDistrict[s.district] = []
    }
    schoolsByDistrict[s.district].push(transformToSchoolInfo(s))
  })

  return Object.entries(schoolsByDistrict).map(([name, schools], idx) => {
    const totalStudents = schools.reduce((sum, s) => sum + s.totalStudents, 0)
    const totalBhyt = schools.reduce((sum, s) => sum + s.bhytCount, 0)
    const avgBhytRate = totalStudents ? parseFloat(((totalBhyt / totalStudents) * 100).toFixed(1)) : 0

    return {
      id: `dist-${provinceName}-${idx}`,
      name: name,
      schools,
      totalSchools: schools.length,
      totalStudents,
      avgBhytRate
    }
  })
}

// Default export for backward compatibility or default views
export const mockWards: WardInfo[] = getAgencyReportData('Thành phố Hồ Chí Minh')

