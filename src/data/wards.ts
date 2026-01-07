// Xã/Phường TP.HCM (69 mẫu)

export interface Ward {
  code: string
  name: string
  type: 'phuong' | 'xa' | 'thi_tran'
  district: string
  area: 'do_thi' | 'nong_thon'
  population: number
  schoolCount: number
  studentCount: number
  provinceCode: string
}

export const wardsHCM: Ward[] = [
  // Quận 1
  { code: '26734', name: 'Phường Bến Nghé', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 25800, schoolCount: 12, studentCount: 4850, provinceCode: '79' },
  { code: '26737', name: 'Phường Bến Thành', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 18200, schoolCount: 8, studentCount: 3250, provinceCode: '79' },
  { code: '26740', name: 'Phường Cầu Kho', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 22500, schoolCount: 6, studentCount: 3580, provinceCode: '79' },
  { code: '26743', name: 'Phường Cầu Ông Lãnh', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 19800, schoolCount: 7, studentCount: 3120, provinceCode: '79' },
  { code: '26746', name: 'Phường Cô Giang', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 16500, schoolCount: 5, studentCount: 2650, provinceCode: '79' },
  { code: '26749', name: 'Phường Đa Kao', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 28500, schoolCount: 15, studentCount: 5420, provinceCode: '79' },
  { code: '26752', name: 'Phường Nguyễn Cư Trinh', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 24200, schoolCount: 9, studentCount: 4180, provinceCode: '79' },
  { code: '26755', name: 'Phường Nguyễn Thái Bình', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 21500, schoolCount: 8, studentCount: 3850, provinceCode: '79' },
  { code: '26758', name: 'Phường Phạm Ngũ Lão', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 17800, schoolCount: 6, studentCount: 2980, provinceCode: '79' },
  { code: '26761', name: 'Phường Tân Định', type: 'phuong', district: 'Quận 1', area: 'do_thi', population: 32500, schoolCount: 18, studentCount: 6250, provinceCode: '79' },
  // Quận 3
  { code: '26770', name: 'Phường 1', type: 'phuong', district: 'Quận 3', area: 'do_thi', population: 18500, schoolCount: 7, studentCount: 3250, provinceCode: '79' },
  { code: '26773', name: 'Phường 2', type: 'phuong', district: 'Quận 3', area: 'do_thi', population: 21200, schoolCount: 9, studentCount: 3850, provinceCode: '79' },
  { code: '26776', name: 'Phường 3', type: 'phuong', district: 'Quận 3', area: 'do_thi', population: 16800, schoolCount: 6, studentCount: 2950, provinceCode: '79' },
  { code: '26779', name: 'Phường 4', type: 'phuong', district: 'Quận 3', area: 'do_thi', population: 19500, schoolCount: 8, studentCount: 3420, provinceCode: '79' },
  { code: '26782', name: 'Phường 5', type: 'phuong', district: 'Quận 3', area: 'do_thi', population: 22800, schoolCount: 10, studentCount: 4150, provinceCode: '79' },
  // Quận 7
  { code: '26920', name: 'Phường Tân Phong', type: 'phuong', district: 'Quận 7', area: 'do_thi', population: 45200, schoolCount: 22, studentCount: 8950, provinceCode: '79' },
  { code: '26923', name: 'Phường Tân Quy', type: 'phuong', district: 'Quận 7', area: 'do_thi', population: 38500, schoolCount: 18, studentCount: 7250, provinceCode: '79' },
  { code: '26926', name: 'Phường Phú Mỹ', type: 'phuong', district: 'Quận 7', area: 'do_thi', population: 68500, schoolCount: 35, studentCount: 13850, provinceCode: '79' },
  { code: '26929', name: 'Phường Phú Thuận', type: 'phuong', district: 'Quận 7', area: 'do_thi', population: 52800, schoolCount: 25, studentCount: 10250, provinceCode: '79' },
  { code: '26932', name: 'Phường Tân Thuận Đông', type: 'phuong', district: 'Quận 7', area: 'do_thi', population: 42500, schoolCount: 20, studentCount: 8150, provinceCode: '79' },
  // Thủ Đức
  { code: '26980', name: 'Phường Linh Trung', type: 'phuong', district: 'Thủ Đức', area: 'do_thi', population: 85200, schoolCount: 42, studentCount: 16850, provinceCode: '79' },
  { code: '26983', name: 'Phường Linh Chiểu', type: 'phuong', district: 'Thủ Đức', area: 'do_thi', population: 72500, schoolCount: 35, studentCount: 14250, provinceCode: '79' },
  { code: '26986', name: 'Phường Hiệp Bình Chánh', type: 'phuong', district: 'Thủ Đức', area: 'do_thi', population: 125800, schoolCount: 58, studentCount: 24850, provinceCode: '79' },
  { code: '26989', name: 'Phường Hiệp Bình Phước', type: 'phuong', district: 'Thủ Đức', area: 'do_thi', population: 95200, schoolCount: 45, studentCount: 18650, provinceCode: '79' },
  { code: '26992', name: 'Phường Linh Đông', type: 'phuong', district: 'Thủ Đức', area: 'do_thi', population: 65800, schoolCount: 32, studentCount: 12850, provinceCode: '79' },
  // Củ Chi
  { code: '27100', name: 'Xã Phú Hòa Đông', type: 'xa', district: 'Củ Chi', area: 'nong_thon', population: 28500, schoolCount: 8, studentCount: 5250, provinceCode: '79' },
  { code: '27103', name: 'Xã Trung Lập Thượng', type: 'xa', district: 'Củ Chi', area: 'nong_thon', population: 22800, schoolCount: 6, studentCount: 4150, provinceCode: '79' },
  { code: '27106', name: 'Xã Tân Thạnh Đông', type: 'xa', district: 'Củ Chi', area: 'nong_thon', population: 35200, schoolCount: 10, studentCount: 6450, provinceCode: '79' },
  { code: '27109', name: 'Xã Tân Thạnh Tây', type: 'xa', district: 'Củ Chi', area: 'nong_thon', population: 18500, schoolCount: 5, studentCount: 3250, provinceCode: '79' },
  { code: '27112', name: 'Xã Phú Mỹ Hưng', type: 'xa', district: 'Củ Chi', area: 'nong_thon', population: 25800, schoolCount: 7, studentCount: 4650, provinceCode: '79' },
  // Cần Giờ  
  { code: '27200', name: 'Xã Cần Thạnh', type: 'xa', district: 'Cần Giờ', area: 'nong_thon', population: 12500, schoolCount: 4, studentCount: 2150, provinceCode: '79' },
  { code: '27203', name: 'Xã Bình Khánh', type: 'xa', district: 'Cần Giờ', area: 'nong_thon', population: 8500, schoolCount: 3, studentCount: 1450, provinceCode: '79' },
  { code: '27206', name: 'Xã An Thới Đông', type: 'xa', district: 'Cần Giờ', area: 'nong_thon', population: 15200, schoolCount: 5, studentCount: 2650, provinceCode: '79' },
  { code: '27209', name: 'Xã Long Hòa', type: 'xa', district: 'Cần Giờ', area: 'nong_thon', population: 6800, schoolCount: 2, studentCount: 1150, provinceCode: '79' },
]

export const getWardsByProvince = (provinceCode: string): Ward[] => {
  if (provinceCode === '79') return wardsHCM
  return []
}

export const getWardsByDistrict = (district: string): Ward[] => {
  return wardsHCM.filter(w => w.district === district)
}

export const getDistrictsHCM = (): string[] => {
  const districts = new Set(wardsHCM.map(w => w.district))
  return Array.from(districts)
}

export const getWardsSummary = () => ({
  total: wardsHCM.length,
  byType: {
    phuong: wardsHCM.filter(w => w.type === 'phuong').length,
    xa: wardsHCM.filter(w => w.type === 'xa').length,
  },
  byArea: {
    do_thi: wardsHCM.filter(w => w.area === 'do_thi').length,
    nong_thon: wardsHCM.filter(w => w.area === 'nong_thon').length,
  },
  totalPopulation: wardsHCM.reduce((sum, w) => sum + w.population, 0),
  totalSchools: wardsHCM.reduce((sum, w) => sum + w.schoolCount, 0),
  totalStudents: wardsHCM.reduce((sum, w) => sum + w.studentCount, 0),
})
