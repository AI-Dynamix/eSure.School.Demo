// Mock Data Generator for eSure School Reports
// Generates realistic data for 245 schools across 24 districts

import type {
  School,
  ClassInfo,
  BHYTMetrics,
  VoluntaryInsMetrics,
  ESureMetrics,
  RevenueBreakdown,
  ProductBreakdown,
  SchoolSegment,
  PLStatement,
  PartnerMetrics,
  ReconciliationItem,
  CommissionPayment,
  SLAMetric,
  SchoolDashboardMetrics,
  GradeBreakdown,
  PendingStudent,
  InsurerMetrics,
  ClaimByType,
  ClaimByDemographic,
  LargeClaim,
  TimeSeriesData,
} from '@/types/dashboard-types'

// =============================================================================
// UTILITIES
// =============================================================================

const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min

const randomFloat = (min: number, max: number, decimals = 2): number =>
  parseFloat((Math.random() * (max - min) + min).toFixed(decimals))

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat('vi-VN').format(value)

// =============================================================================
// CONSTANTS
// =============================================================================

const DISTRICTS = [
  'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8',
  'Quận 10', 'Quận 11', 'Quận 12', 'Bình Thạnh', 'Gò Vấp', 'Phú Nhuận',
  'Tân Bình', 'Tân Phú', 'Bình Tân', 'Thủ Đức', 'Nhà Bè', 'Cần Giờ',
  'Củ Chi', 'Hóc Môn', 'Bình Chánh', 'Quận 2', 'Quận 9'
]

const LEVELS: ('Mầm non' | 'Tiểu học' | 'THCS' | 'THPT')[] = [
  'Mầm non', 'Tiểu học', 'THCS', 'THPT'
]

const SCHOOL_PREFIXES: Record<string, string> = {
  'Mầm non': 'MN',
  'Tiểu học': 'TH',
  'THCS': 'THCS',
  'THPT': 'THPT'
}

const MONTHS = [
  'T09/24', 'T10/24', 'T11/24', 'T12/24', 'T01/25', 'T02/25',
  'T03/25', 'T04/25', 'T05/25', 'T06/25'
]

// =============================================================================
// SCHOOL DATA GENERATORS
// =============================================================================

export const generateSchools = (count = 245): School[] => {
  const schools: School[] = []
  
  for (let i = 1; i <= count; i++) {
    const level = LEVELS[i % 4]
    const district = DISTRICTS[i % DISTRICTS.length]
    const totalStudents = randomInt(200, 2500)
    
    // BHYT gần 100% vì bắt buộc
    const bhytRate = randomFloat(0.94, 0.995)
    const bhytCount = Math.floor(totalStudents * bhytRate)
    
    // BH tự nguyện dao động nhiều hơn
    const voluntaryRate = randomFloat(0.25, 0.95)
    const voluntaryInsCount = Math.floor(totalStudents * voluntaryRate)
    
    schools.push({
      id: `SCH${String(i).padStart(3, '0')}`,
      name: `${SCHOOL_PREFIXES[level]} ${district} ${Math.ceil(i / 10)}`,
      level,
      district,
      totalStudents,
      bhytCount,
      voluntaryInsCount,
      bhytRate: parseFloat((bhytRate * 100).toFixed(1)),
      voluntaryRate: parseFloat((voluntaryRate * 100).toFixed(1)),
      status: i % 15 === 0 ? 'inactive' : 'active'
    })
  }
  
  return schools
}

export const generateClasses = (schoolId: string, level: string): ClassInfo[] => {
  const gradeRanges: Record<string, number[]> = {
    'Mầm non': [3, 4, 5],
    'Tiểu học': [1, 2, 3, 4, 5],
    'THCS': [6, 7, 8, 9],
    'THPT': [10, 11, 12]
  }
  
  const grades = gradeRanges[level] || [1, 2, 3]
  const classes: ClassInfo[] = []
  
  grades.forEach(grade => {
    const classCount = randomInt(3, 8)
    for (let c = 1; c <= classCount; c++) {
      const totalStudents = randomInt(35, 45)
      const bhytCount = Math.floor(totalStudents * randomFloat(0.95, 1))
      const voluntaryInsCount = Math.floor(totalStudents * randomFloat(0.6, 0.95))
      
      classes.push({
        id: `${schoolId}-${grade}${String.fromCharCode(64 + c)}`,
        name: `${grade}${String.fromCharCode(64 + c)}`,
        level: level as 'Mầm non' | 'Tiểu học' | 'THCS' | 'THPT',
        grade,
        totalStudents,
        bhytCount,
        voluntaryInsCount,
        pendingPayment: randomInt(0, 5),
        pendingInfo: randomInt(0, 3),
        teacherName: `Giáo viên ${grade}${String.fromCharCode(64 + c)}`
      })
    }
  })
  
  return classes
}

// =============================================================================
// SỞ GD METRICS
// =============================================================================

export const getBHYTMetrics = (): BHYTMetrics => ({
  totalSchools: 245,
  totalStudents: 125420,
  bhytStudents: 123500,
  bhytCoverageRate: 98.5,
  targetRate: 100,
  notCoveredCount: 1920
})

export const getVoluntaryInsMetrics = (): VoluntaryInsMetrics => ({
  schoolsWithVoluntaryIns: 198,
  voluntaryInsStudents: 98250,
  participationRate: 78.3,
  insurerCount: 5
})

export const getParticipationByLevel = (): { level: string; schools: number; students: number; insured: number; rate: number }[] => [
  { level: 'Mầm non', schools: 85, students: 18500, insured: 17020, rate: 92.0 },
  { level: 'Tiểu học', schools: 72, students: 42300, insured: 35955, rate: 85.0 },
  { level: 'THCS', schools: 52, students: 38200, insured: 28650, rate: 75.0 },
  { level: 'THPT', schools: 36, students: 26420, insured: 16625, rate: 62.9 }
]

// =============================================================================
// ESURE METRICS
// =============================================================================

export const getESureMetrics = (): ESureMetrics => ({
  grossRevenue: 12_500_000_000,
  netRevenue: 2_800_000_000,
  commission: 850_000_000,
  totalPolicies: 98250,
  activeSchools: 198,
  avgPremium: 127000,
  vsLastMonth: 7.6,
  vsLastYear: 18,
  vsTarget: 83.3
})

export const getRevenueByChannel = (): RevenueBreakdown[] => [
  { channel: 'SSC', policies: 58950, revenue: 7_500_000_000, percentage: 60, commissionRate: 5, commissionAmount: 375_000_000 },
  { channel: 'Đối tác 2', policies: 29475, revenue: 3_750_000_000, percentage: 30, commissionRate: 6, commissionAmount: 225_000_000 },
  { channel: 'Cổng trực tiếp', policies: 9825, revenue: 1_250_000_000, percentage: 10, commissionRate: 0, commissionAmount: 0 }
]

export const getRevenueByProduct = (): ProductBreakdown[] => [
  { package: 'gold', packageName: 'Gói Vàng', premium: 350000, policies: 25200, revenue: 8_820_000_000, percentage: 70.6, margin: 24 },
  { package: 'silver', packageName: 'Gói Bạc', premium: 250000, policies: 48300, revenue: 3_025_000_000, percentage: 24.2, margin: 21 },
  { package: 'basic', packageName: 'Gói Cơ bản', premium: 150000, policies: 24750, revenue: 655_000_000, percentage: 5.2, margin: 18 }
]

export const getSchoolSegments = (): SchoolSegment[] => [
  { segment: 'Gold', definition: 'TG > 80%, DT > 100tr', schoolCount: 45, revenuePercentage: 52, strategy: 'Upsell gói cao' },
  { segment: 'Silver', definition: 'TG 50-80%, DT 30-100tr', schoolCount: 78, revenuePercentage: 35, strategy: 'Tăng tỷ lệ TG' },
  { segment: 'Bronze', definition: 'TG 20-50%, DT < 30tr', schoolCount: 52, revenuePercentage: 11, strategy: 'Hỗ trợ truyền thông' },
  { segment: 'At-risk', definition: 'TG < 20%', schoolCount: 23, revenuePercentage: 2, strategy: 'Tìm hiểu nguyên nhân' }
]

export const getPLStatement = (): PLStatement[] => [
  { item: 'Doanh thu Gross', currentMonth: 1_850_000_000, percentRevenue: 100, lastMonth: 1_720_000_000, changePercent: 7.6 },
  { item: 'Phí BH gốc', currentMonth: -1_435_000_000, percentRevenue: 77.6, lastMonth: -1_334_000_000, changePercent: 7.6 },
  { item: 'Doanh thu Net', currentMonth: 415_000_000, percentRevenue: 22.4, lastMonth: 386_000_000, changePercent: 7.5 },
  { item: 'Hoa hồng SSC/Đối tác 2', currentMonth: -92_000_000, percentRevenue: 5.0, lastMonth: -86_000_000, changePercent: 7.0 },
  { item: 'Chi phí nhân sự', currentMonth: -85_000_000, percentRevenue: 4.6, lastMonth: -85_000_000, changePercent: 0 },
  { item: 'Chi phí IT', currentMonth: -25_000_000, percentRevenue: 1.4, lastMonth: -25_000_000, changePercent: 0 },
  { item: 'Marketing', currentMonth: -35_000_000, percentRevenue: 1.9, lastMonth: -42_000_000, changePercent: -16.7 },
  { item: 'Lợi nhuận ròng', currentMonth: 123_000_000, percentRevenue: 6.6, lastMonth: 99_000_000, changePercent: 24.2 }
]

export const getRevenueTimeSeries = (): TimeSeriesData[] =>
  MONTHS.map((month) => ({
    month,
    value: randomInt(1_200_000_000, 2_100_000_000),
    label: formatCurrency(randomInt(1_200_000_000, 2_100_000_000))
  }))

// =============================================================================
// SSC METRICS (Subset of eSure)
// =============================================================================
// SSC represents about 60% of volume

export const getSSCMetrics = (): ESureMetrics => ({
    grossRevenue: 7_500_000_000,
    netRevenue: 1_680_000_000,
    commission: 375_000_000,
    totalPolicies: 58950,
    activeSchools: 125,
    avgPremium: 127000,
    vsLastMonth: 5.4,
    vsLastYear: 12,
    vsTarget: 89.1
})

export const getSSCSchoolSegments = (): SchoolSegment[] => [
    { segment: 'Gold', definition: 'TG > 80%, DT > 100tr', schoolCount: 28, revenuePercentage: 55, strategy: 'Duy trì & CSKH VIP' },
    { segment: 'Silver', definition: 'TG 50-80%, DT 30-100tr', schoolCount: 45, revenuePercentage: 32, strategy: 'Thúc đẩy tái tục' },
    { segment: 'Bronze', definition: 'TG 20-50%, DT < 30tr', schoolCount: 38, revenuePercentage: 11, strategy: 'Hỗ trợ nghiệp vụ' },
    { segment: 'At-risk', definition: 'TG < 20%', schoolCount: 14, revenuePercentage: 2, strategy: 'Khảo sát khó khăn' }
]

// Simplified P&L for SSC Admin viewpoint (Revenue - Costs)
export const getSSCPLStatement = (): PLStatement[] => [
    { item: 'Doanh thu Gross (SSC)', currentMonth: 1_110_000_000, percentRevenue: 100, lastMonth: 1_050_000_000, changePercent: 5.7 },
  //  { item: 'Phí BH gốc', currentMonth: -861_000_000, percentRevenue: 77.6, lastMonth: -814_000_000, changePercent: 5.8 },
  // SSC doesn't care about insurer premium remittance as much, but maybe their Net Commission?
  // Let's assume SSC views their Revenue share.
  // Actually usually they see Gross and Commission.
    { item: 'Hoa hồng nhận', currentMonth: 185_000_000, percentRevenue: 16.6, lastMonth: 175_000_000, changePercent: 5.7 },
    { item: 'Chi phí vận hành', currentMonth: -45_000_000, percentRevenue: 4.1, lastMonth: -42_000_000, changePercent: 7.1 },
    { item: 'Lợi nhuận ròng', currentMonth: 140_000_000, percentRevenue: 12.6, lastMonth: 133_000_000, changePercent: 5.2 }
]


// =============================================================================
// PARTNER METRICS
// =============================================================================

export const getPartnerMetrics = (): PartnerMetrics => ({
  todayTransactions: 342,
  todayValue: 85_500_000,
  weekTransactions: 2145,
  weekValue: 536_250_000,
  monthTransactions: 8520,
  monthValue: 2_130_000_000,
  ytdTransactions: 98250,
  ytdValue: 12_500_000_000,
  successRate: 98.2,
  failedRate: 1.8
})

export const getReconciliationItems = (): ReconciliationItem[] => [
  { partnerTxnId: 'TXN-240915-001', esureOrderId: 'ORD-5523', partnerAmount: 350000, esureAmount: 350000, difference: 0, reason: '', status: 'matched' },
  { partnerTxnId: 'TXN-240915-002', esureOrderId: 'ORD-5524', partnerAmount: 250500, esureAmount: 250000, difference: 500, reason: 'Phí GD', status: 'mismatch_small' },
  { partnerTxnId: 'TXN-240915-003', esureOrderId: null, partnerAmount: 300000, esureAmount: null, difference: 300000, reason: 'Không tìm thấy đơn', status: 'mismatch' },
  { partnerTxnId: 'TXN-240915-004', esureOrderId: 'ORD-5526', partnerAmount: 150000, esureAmount: 150000, difference: 0, reason: '', status: 'matched' },
  { partnerTxnId: 'TXN-240915-005', esureOrderId: 'ORD-5527', partnerAmount: 350000, esureAmount: null, difference: 350000, reason: 'Chờ xử lý', status: 'pending' }
]

export const getCommissionPayments = (): CommissionPayment[] => [
  { period: 'T09/2024', transactions: 12450, revenue: 3_110_000_000, rate: 5, commission: 155_500_000, status: 'paid', paymentDate: '15/10/2024' },
  { period: 'T10/2024', transactions: 14220, revenue: 3_550_000_000, rate: 5, commission: 177_500_000, status: 'paid', paymentDate: '15/11/2024' },
  { period: 'T11/2024', transactions: 8520, revenue: 2_130_000_000, rate: 5, commission: 106_500_000, status: 'pending', paymentDate: '15/12/2024' }
]

export const getSLAMetrics = (): SLAMetric[] => [
  { metric: 'Uptime API', target: '99.9%', actual: '99.95%', status: 'green' },
  { metric: 'Response time', target: '< 2s', actual: '1.2s', status: 'green' },
  { metric: 'Webhook delivery', target: '< 5min', actual: '2.3min', status: 'green' },
  { metric: 'Reconciliation accuracy', target: '99%', actual: '98.5%', status: 'yellow' },
  { metric: 'Issue resolution', target: '< 24h', actual: '18h', status: 'green' }
]

// =============================================================================
// SCHOOL DASHBOARD METRICS
// =============================================================================

export const getSchoolDashboardMetrics = (): SchoolDashboardMetrics => ({
  totalStudents: 1250,
  bhytStudents: 1235,
  bhytRate: 98.8,
  voluntaryInsStudents: 1100,
  voluntaryRate: 88.0,
  pendingCount: 45
})

export const getGradeBreakdown = (): GradeBreakdown[] => [
  { grade: 'Khối 10', totalStudents: 420, bhytCount: 418, voluntaryCount: 390, voluntaryRate: 92.9, pendingPayment: 12, pendingInfo: 5, notJoined: 13 },
  { grade: 'Khối 11', totalStudents: 415, bhytCount: 412, voluntaryCount: 370, voluntaryRate: 89.2, pendingPayment: 18, pendingInfo: 8, notJoined: 19 },
  { grade: 'Khối 12', totalStudents: 415, bhytCount: 405, voluntaryCount: 340, voluntaryRate: 81.9, pendingPayment: 25, pendingInfo: 15, notJoined: 35 }
]

export const getPendingStudents = (): PendingStudent[] => [
  { id: 'STU001', name: 'Lê Văn C', className: '10A1', missingInfo: 'CCCD', parentPhone: '0903****45', createdAt: '12/09/2024', daysWaiting: 5 },
  { id: 'STU002', name: 'Phạm Thị D', className: '12A4', missingInfo: 'Ngày sinh', parentPhone: '0908****12', createdAt: '11/09/2024', daysWaiting: 6 },
  { id: 'STU003', name: 'Nguyễn Văn A', className: '10A2', missingInfo: undefined, parentPhone: '0901****67', createdAt: '10/09/2024', daysWaiting: 7 },
  { id: 'STU004', name: 'Trần Thị B', className: '11B3', missingInfo: undefined, parentPhone: '0912****89', createdAt: '08/09/2024', daysWaiting: 9 }
]

// =============================================================================
// INSURER METRICS
// =============================================================================

export const getInsurerMetrics = (): InsurerMetrics => ({
  totalActivePolicies: 54037,
  totalPremium: 6_875_000_000,
  totalClaims: 892_000_000,
  lossRatio: 13.0,
  claimFrequency: 2.8,
  avgClaimSize: 5_900_000
})

export const getClaimsByType = (): ClaimByType[] => [
  { type: 'Tai nạn thể thao', count: 580, totalAmount: 290_000_000, percentage: 32.5, avgSize: 500000 },
  { type: 'Tai nạn giao thông', count: 245, totalAmount: 367_500_000, percentage: 41.1, avgSize: 1_500_000 },
  { type: 'Tai nạn sinh hoạt', count: 420, totalAmount: 168_000_000, percentage: 18.8, avgSize: 400000 },
  { type: 'Bệnh tật', count: 89, totalAmount: 66_500_000, percentage: 7.5, avgSize: 752000 }
]

export const getClaimsByDemographic = (): ClaimByDemographic[] => [
  { segment: 'Mầm non', policies: 8500, claims: 425, frequency: 5.0, lossRatio: 18 },
  { segment: 'Tiểu học', policies: 18200, claims: 546, frequency: 3.0, lossRatio: 14 },
  { segment: 'THCS', policies: 15337, claims: 307, frequency: 2.0, lossRatio: 11 },
  { segment: 'THPT', policies: 12000, claims: 156, frequency: 1.3, lossRatio: 9 }
]

export const getLargeClaims = (): LargeClaim[] => [
  { date: '15/11/2024', policyId: 'PVI-2024-0001', school: 'THPT A', type: 'TNGT', amount: 25_000_000, status: 'paid' },
  { date: '02/11/2024', policyId: 'PVI-2024-0002', school: 'THCS B', type: 'Phẫu thuật', amount: 18_000_000, status: 'processing' },
  { date: '28/10/2024', policyId: 'PVI-2024-0003', school: 'TH C', type: 'TNGT', amount: 15_000_000, status: 'paid' },
  { date: '20/10/2024', policyId: 'PVI-2024-0004', school: 'THPT D', type: 'Bệnh tật', amount: 12_000_000, status: 'pending' }
]

export const getLossRatioTimeSeries = (): TimeSeriesData[] => [
  { month: 'T09/24', value: 8 },
  { month: 'T10/24', value: 12 },
  { month: 'T11/24', value: 15 },
  { month: 'T12/24', value: 18 },
  { month: 'T01/25', value: 10 }
]
