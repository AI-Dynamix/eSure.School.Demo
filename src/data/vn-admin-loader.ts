import rawData from './vn-admin-data.json'

export interface WardStat {
  code: number
  name: string
  schoolCount: number
  studentCount: number
  participationRate: number
}

export interface ProvinceStat {
  codeBNV: string
  codeTMS: string
  name: string
  wards: WardStat[]
  totalSchools: number
  totalStudents: number
  avgParticipationRate: number
}

// Deterministic-ish random based on code
const seedRandom = (code: string | number) => {
    const seed = typeof code === 'string' ? parseInt(code) || 0 : code
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
}

const getRandomInRange = (min: number, max: number, seed: string | number) => {
    return Math.floor(seedRandom(seed) * (max - min + 1) + min)
}

export const loadGeographyData = (): ProvinceStat[] => {
  return (rawData as any[]).map((p: any) => {
    const wards: WardStat[] = p.phuongxa.map((w: any) => {
      const studentCount = getRandomInRange(500, 5000, w.maphuongxa)
      const participationRate = 85 + (seedRandom(w.maphuongxa) * 15) // 85-100%
      
      return {
        code: w.maphuongxa,
        name: w.tenphuongxa,
        schoolCount: getRandomInRange(1, 10, w.maphuongxa),
        studentCount: studentCount,
        participationRate: parseFloat(participationRate.toFixed(1))
      }
    })

    const totalSchools = wards.reduce((sum, w) => sum + w.schoolCount, 0)
    const totalStudents = wards.reduce((sum, w) => sum + w.studentCount, 0)
    const avgRate = wards.length > 0
      ? wards.reduce((sum, w) => sum + w.participationRate, 0) / wards.length
      : 0

    return {
      codeBNV: p.matinhBNV,
      codeTMS: p.matinhTMS,
      name: p.tentinhmoi,
      wards: wards,
      totalSchools,
      totalStudents,
      avgParticipationRate: parseFloat(avgRate.toFixed(1))
    }
  })
}

export const allProvinces = loadGeographyData()

export const getWardsByProvince = (provinceCodeBNV: string): WardStat[] => {
  const province = allProvinces.find(p => p.codeBNV === provinceCodeBNV)
  return province ? province.wards : []
}
