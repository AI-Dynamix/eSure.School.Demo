// Danh mục 34 Tỉnh/Thành phố theo QĐ 19/2025/QĐ-TTg

export interface Province {
  code: string
  name: string
  nameEn: string
  type: 'thanh_pho_trung_uong' | 'tinh'
  region: 'bac' | 'trung' | 'nam'
  geoRegion: string
  capital: string
  population: number
  area: number
  wardCount: number
  schoolCount: number
  studentCount: number
  sscPartnerId: 'SSC' | 'PARTNER2'
  status: 'active' | 'inactive'
}

export const provinces: Province[] = [
  { code: '01', name: 'Hà Nội', nameEn: 'Hanoi', type: 'thanh_pho_trung_uong', region: 'bac', geoRegion: 'Đồng bằng sông Hồng', capital: 'Ba Đình', population: 8500000, area: 3359, wardCount: 579, schoolCount: 2850, studentCount: 2150000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '02', name: 'Hà Giang - Cao Bằng', nameEn: 'Ha Giang - Cao Bang', type: 'tinh', region: 'bac', geoRegion: 'Đông Bắc', capital: 'Hà Giang', population: 1650000, area: 14582, wardCount: 245, schoolCount: 580, studentCount: 285000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '03', name: 'Lào Cai - Yên Bái', nameEn: 'Lao Cai - Yen Bai', type: 'tinh', region: 'bac', geoRegion: 'Tây Bắc', capital: 'Lào Cai', population: 1580000, area: 12450, wardCount: 228, schoolCount: 520, studentCount: 268000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '04', name: 'Bắc Kạn - Tuyên Quang', nameEn: 'Bac Kan - Tuyen Quang', type: 'tinh', region: 'bac', geoRegion: 'Đông Bắc', capital: 'Tuyên Quang', population: 1120000, area: 10680, wardCount: 178, schoolCount: 385, studentCount: 195000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '05', name: 'Lạng Sơn - Bắc Giang', nameEn: 'Lang Son - Bac Giang', type: 'tinh', region: 'bac', geoRegion: 'Đông Bắc', capital: 'Bắc Giang', population: 2650000, area: 12180, wardCount: 315, schoolCount: 780, studentCount: 485000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '06', name: 'Thái Nguyên - Phú Thọ', nameEn: 'Thai Nguyen - Phu Tho', type: 'tinh', region: 'bac', geoRegion: 'Đông Bắc', capital: 'Thái Nguyên', population: 2580000, area: 9850, wardCount: 298, schoolCount: 720, studentCount: 465000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '07', name: 'Điện Biên - Lai Châu - Sơn La', nameEn: 'Dien Bien - Lai Chau - Son La', type: 'tinh', region: 'bac', geoRegion: 'Tây Bắc', capital: 'Sơn La', population: 2180000, area: 37250, wardCount: 425, schoolCount: 890, studentCount: 420000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '08', name: 'Hòa Bình - Vĩnh Phúc', nameEn: 'Hoa Binh - Vinh Phuc', type: 'tinh', region: 'bac', geoRegion: 'Tây Bắc', capital: 'Vĩnh Yên', population: 2050000, area: 6280, wardCount: 245, schoolCount: 580, studentCount: 365000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '09', name: 'Quảng Ninh', nameEn: 'Quang Ninh', type: 'tinh', region: 'bac', geoRegion: 'Đông Bắc', capital: 'Hạ Long', population: 1350000, area: 6178, wardCount: 186, schoolCount: 420, studentCount: 285000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '10', name: 'Hải Phòng', nameEn: 'Hai Phong', type: 'thanh_pho_trung_uong', region: 'bac', geoRegion: 'Đồng bằng sông Hồng', capital: 'Hồng Bàng', population: 2100000, area: 1561, wardCount: 217, schoolCount: 650, studentCount: 425000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '11', name: 'Hải Dương - Hưng Yên', nameEn: 'Hai Duong - Hung Yen', type: 'tinh', region: 'bac', geoRegion: 'Đồng bằng sông Hồng', capital: 'Hải Dương', population: 2980000, area: 2593, wardCount: 326, schoolCount: 850, studentCount: 520000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '12', name: 'Thái Bình - Nam Định', nameEn: 'Thai Binh - Nam Dinh', type: 'tinh', region: 'bac', geoRegion: 'Đồng bằng sông Hồng', capital: 'Nam Định', population: 3650000, area: 3210, wardCount: 385, schoolCount: 980, studentCount: 580000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '13', name: 'Hà Nam - Ninh Bình', nameEn: 'Ha Nam - Ninh Binh', type: 'tinh', region: 'bac', geoRegion: 'Đồng bằng sông Hồng', capital: 'Ninh Bình', population: 1850000, area: 2368, wardCount: 218, schoolCount: 520, studentCount: 325000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '14', name: 'Thanh Hóa', nameEn: 'Thanh Hoa', type: 'tinh', region: 'trung', geoRegion: 'Bắc Trung Bộ', capital: 'Thanh Hóa', population: 3680000, area: 11116, wardCount: 559, schoolCount: 1250, studentCount: 720000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '15', name: 'Nghệ An - Hà Tĩnh', nameEn: 'Nghe An - Ha Tinh', type: 'tinh', region: 'trung', geoRegion: 'Bắc Trung Bộ', capital: 'Vinh', population: 4550000, area: 22485, wardCount: 618, schoolCount: 1480, studentCount: 850000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '16', name: 'Quảng Bình - Quảng Trị', nameEn: 'Quang Binh - Quang Tri', type: 'tinh', region: 'trung', geoRegion: 'Bắc Trung Bộ', capital: 'Đồng Hới', population: 1680000, area: 13265, wardCount: 248, schoolCount: 520, studentCount: 295000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '17', name: 'Thừa Thiên Huế', nameEn: 'Thua Thien Hue', type: 'thanh_pho_trung_uong', region: 'trung', geoRegion: 'Bắc Trung Bộ', capital: 'Huế', population: 1180000, area: 5033, wardCount: 141, schoolCount: 380, studentCount: 225000, sscPartnerId: 'PARTNER2', status: 'active' },
  { code: '48', name: 'Đà Nẵng', nameEn: 'Da Nang', type: 'thanh_pho_trung_uong', region: 'trung', geoRegion: 'Nam Trung Bộ', capital: 'Hải Châu', population: 1250000, area: 1285, wardCount: 56, schoolCount: 420, studentCount: 285000, sscPartnerId: 'SSC', status: 'active' },
  { code: '49', name: 'Quảng Nam - Quảng Ngãi', nameEn: 'Quang Nam - Quang Ngai', type: 'tinh', region: 'trung', geoRegion: 'Nam Trung Bộ', capital: 'Tam Kỳ', population: 2780000, area: 15650, wardCount: 398, schoolCount: 920, studentCount: 485000, sscPartnerId: 'SSC', status: 'active' },
  { code: '50', name: 'Bình Định - Phú Yên', nameEn: 'Binh Dinh - Phu Yen', type: 'tinh', region: 'trung', geoRegion: 'Nam Trung Bộ', capital: 'Quy Nhơn', population: 2480000, area: 11185, wardCount: 318, schoolCount: 780, studentCount: 425000, sscPartnerId: 'SSC', status: 'active' },
  { code: '51', name: 'Khánh Hòa - Ninh Thuận', nameEn: 'Khanh Hoa - Ninh Thuan', type: 'tinh', region: 'trung', geoRegion: 'Nam Trung Bộ', capital: 'Nha Trang', population: 1920000, area: 8568, wardCount: 218, schoolCount: 580, studentCount: 325000, sscPartnerId: 'SSC', status: 'active' },
  { code: '52', name: 'Bình Thuận', nameEn: 'Binh Thuan', type: 'tinh', region: 'trung', geoRegion: 'Nam Trung Bộ', capital: 'Phan Thiết', population: 1250000, area: 7828, wardCount: 127, schoolCount: 385, studentCount: 215000, sscPartnerId: 'SSC', status: 'active' },
  { code: '53', name: 'Kon Tum - Gia Lai', nameEn: 'Kon Tum - Gia Lai', type: 'tinh', region: 'trung', geoRegion: 'Tây Nguyên', capital: 'Pleiku', population: 2150000, area: 22850, wardCount: 348, schoolCount: 720, studentCount: 385000, sscPartnerId: 'SSC', status: 'active' },
  { code: '54', name: 'Đắk Lắk - Đắk Nông', nameEn: 'Dak Lak - Dak Nong', type: 'tinh', region: 'trung', geoRegion: 'Tây Nguyên', capital: 'Buôn Ma Thuột', population: 2580000, area: 19980, wardCount: 318, schoolCount: 820, studentCount: 465000, sscPartnerId: 'SSC', status: 'active' },
  { code: '55', name: 'Lâm Đồng', nameEn: 'Lam Dong', type: 'tinh', region: 'trung', geoRegion: 'Tây Nguyên', capital: 'Đà Lạt', population: 1350000, area: 9773, wardCount: 147, schoolCount: 450, studentCount: 245000, sscPartnerId: 'SSC', status: 'active' },
  { code: '70', name: 'Bình Phước - Tây Ninh', nameEn: 'Binh Phuoc - Tay Ninh', type: 'tinh', region: 'nam', geoRegion: 'Đông Nam Bộ', capital: 'Tây Ninh', population: 2180000, area: 10835, wardCount: 218, schoolCount: 620, studentCount: 385000, sscPartnerId: 'SSC', status: 'active' },
  { code: '74', name: 'Bình Dương', nameEn: 'Binh Duong', type: 'tinh', region: 'nam', geoRegion: 'Đông Nam Bộ', capital: 'Thủ Dầu Một', population: 2850000, area: 2695, wardCount: 91, schoolCount: 680, studentCount: 520000, sscPartnerId: 'SSC', status: 'active' },
  { code: '75', name: 'Đồng Nai', nameEn: 'Dong Nai', type: 'tinh', region: 'nam', geoRegion: 'Đông Nam Bộ', capital: 'Biên Hòa', population: 3250000, area: 5907, wardCount: 171, schoolCount: 850, studentCount: 585000, sscPartnerId: 'SSC', status: 'active' },
  { code: '77', name: 'Bà Rịa - Vũng Tàu', nameEn: 'Ba Ria - Vung Tau', type: 'tinh', region: 'nam', geoRegion: 'Đông Nam Bộ', capital: 'Vũng Tàu', population: 1250000, area: 1982, wardCount: 82, schoolCount: 380, studentCount: 225000, sscPartnerId: 'SSC', status: 'active' },
  { code: '79', name: 'Thành phố Hồ Chí Minh', nameEn: 'Ho Chi Minh City', type: 'thanh_pho_trung_uong', region: 'nam', geoRegion: 'Đông Nam Bộ', capital: 'Quận 1', population: 9500000, area: 2095, wardCount: 312, schoolCount: 2650, studentCount: 1850000, sscPartnerId: 'SSC', status: 'active' },
  { code: '80', name: 'Long An - Tiền Giang', nameEn: 'Long An - Tien Giang', type: 'tinh', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Tân An', population: 3580000, area: 6985, wardCount: 318, schoolCount: 980, studentCount: 585000, sscPartnerId: 'SSC', status: 'active' },
  { code: '83', name: 'Bến Tre - Trà Vinh', nameEn: 'Ben Tre - Tra Vinh', type: 'tinh', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Bến Tre', population: 2350000, area: 4585, wardCount: 238, schoolCount: 720, studentCount: 385000, sscPartnerId: 'SSC', status: 'active' },
  { code: '86', name: 'Vĩnh Long - Đồng Tháp', nameEn: 'Vinh Long - Dong Thap', type: 'tinh', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Cao Lãnh', population: 2780000, area: 5850, wardCount: 278, schoolCount: 850, studentCount: 465000, sscPartnerId: 'SSC', status: 'active' },
  { code: '89', name: 'An Giang - Kiên Giang', nameEn: 'An Giang - Kien Giang', type: 'tinh', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Long Xuyên', population: 3950000, area: 12685, wardCount: 398, schoolCount: 1150, studentCount: 685000, sscPartnerId: 'SSC', status: 'active' },
  { code: '92', name: 'Cần Thơ', nameEn: 'Can Tho', type: 'thanh_pho_trung_uong', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Ninh Kiều', population: 1280000, area: 1439, wardCount: 85, schoolCount: 420, studentCount: 285000, sscPartnerId: 'SSC', status: 'active' },
  { code: '93', name: 'Hậu Giang - Sóc Trăng', nameEn: 'Hau Giang - Soc Trang', type: 'tinh', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Sóc Trăng', population: 2080000, area: 4885, wardCount: 218, schoolCount: 680, studentCount: 365000, sscPartnerId: 'SSC', status: 'active' },
  { code: '95', name: 'Bạc Liêu - Cà Mau', nameEn: 'Bac Lieu - Ca Mau', type: 'tinh', region: 'nam', geoRegion: 'Đồng bằng sông Cửu Long', capital: 'Cà Mau', population: 1950000, area: 7680, wardCount: 198, schoolCount: 620, studentCount: 345000, sscPartnerId: 'SSC', status: 'active' },
]

export const getProvinceSummary = () => ({
  total: provinces.length,
  byRegion: {
    bac: provinces.filter(p => p.region === 'bac').length,
    trung: provinces.filter(p => p.region === 'trung').length,
    nam: provinces.filter(p => p.region === 'nam').length,
  },
  byType: {
    thanh_pho_trung_uong: provinces.filter(p => p.type === 'thanh_pho_trung_uong').length,
    tinh: provinces.filter(p => p.type === 'tinh').length,
  },
  byPartner: {
    SSC: provinces.filter(p => p.sscPartnerId === 'SSC').length,
    PARTNER2: provinces.filter(p => p.sscPartnerId === 'PARTNER2').length,
  },
  totalPopulation: provinces.reduce((sum, p) => sum + p.population, 0),
  totalSchools: provinces.reduce((sum, p) => sum + p.schoolCount, 0),
  totalStudents: provinces.reduce((sum, p) => sum + p.studentCount, 0),
})
