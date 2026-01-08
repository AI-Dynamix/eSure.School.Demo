// Mock data cho Công nợ AR/AP theo spec

export type AccountType = 'AR' | 'AP_INSURER' | 'AP_COMMISSION'
export type AccountStatus = 'pending' | 'partial' | 'paid' | 'overdue'

export interface AccountRecord {
  id: string
  type: AccountType
  partnerId: string
  partnerName: string
  period: string           // T11/24, T12/24
  transactionCount: number
  grossAmount: number
  netAmount: number
  paidAmount: number
  remainingAmount: number
  dueDate: string
  status: AccountStatus
  createdAt: string
}

// Phải thu từ Gateway (AR)
export const accountsReceivable: AccountRecord[] = [
  { id: 'AR-2024-11-SSC', type: 'AR', partnerId: 'SSC', partnerName: 'SSC', period: 'T11/24', transactionCount: 12450, grossAmount: 4_360_000_000, netAmount: 4_316_400_000, paidAmount: 4_316_400_000, remainingAmount: 0, dueDate: '2024-12-15', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AR-2024-12-SSC', type: 'AR', partnerId: 'SSC', partnerName: 'SSC', period: 'T12/24', transactionCount: 8520, grossAmount: 2_982_000_000, netAmount: 2_952_180_000, paidAmount: 0, remainingAmount: 2_952_180_000, dueDate: '2025-01-15', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AR-2024-11-PARTNER2', type: 'AR', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T11/24', transactionCount: 8250, grossAmount: 2_887_500_000, netAmount: 2_858_625_000, paidAmount: 2_858_625_000, remainingAmount: 0, dueDate: '2024-12-20', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AR-2024-12-PARTNER2', type: 'AR', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T12/24', transactionCount: 5850, grossAmount: 2_047_500_000, netAmount: 2_027_025_000, paidAmount: 0, remainingAmount: 2_027_025_000, dueDate: '2025-01-20', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AR-2024-10-SSC', type: 'AR', partnerId: 'SSC', partnerName: 'SSC', period: 'T10/24', transactionCount: 15200, grossAmount: 5_320_000_000, netAmount: 5_266_800_000, paidAmount: 5_266_800_000, remainingAmount: 0, dueDate: '2024-11-15', status: 'paid', createdAt: '2024-11-01' },
  { id: 'AR-2024-10-PARTNER2', type: 'AR', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T10/24', transactionCount: 9850, grossAmount: 3_447_500_000, netAmount: 3_413_025_000, paidAmount: 3_413_025_000, remainingAmount: 0, dueDate: '2024-11-20', status: 'paid', createdAt: '2024-11-01' },
  { id: 'AR-2024-09-SSC', type: 'AR', partnerId: 'SSC', partnerName: 'SSC', period: 'T09/24', transactionCount: 18500, grossAmount: 6_475_000_000, netAmount: 6_410_250_000, paidAmount: 6_410_250_000, remainingAmount: 0, dueDate: '2024-10-15', status: 'paid', createdAt: '2024-10-01' },
  { id: 'AR-2024-09-PARTNER2', type: 'AR', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T09/24', transactionCount: 12500, grossAmount: 4_375_000_000, netAmount: 4_331_250_000, paidAmount: 4_331_250_000, remainingAmount: 0, dueDate: '2024-10-20', status: 'paid', createdAt: '2024-10-01' },
]

// Phải trả Công ty BH (AP Insurer)
export const accountsPayableInsurer: AccountRecord[] = [
  { id: 'AP-2024-11-PVI', type: 'AP_INSURER', partnerId: 'PVI', partnerName: 'PVI', period: 'T11/24', transactionCount: 11250, grossAmount: 3_937_500_000, netAmount: 3_055_500_000, paidAmount: 3_055_500_000, remainingAmount: 0, dueDate: '2024-12-15', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-PVI', type: 'AP_INSURER', partnerId: 'PVI', partnerName: 'PVI', period: 'T12/24', transactionCount: 7850, grossAmount: 2_747_500_000, netAmount: 2_132_060_000, paidAmount: 0, remainingAmount: 2_132_060_000, dueDate: '2025-01-15', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AP-2024-11-BV', type: 'AP_INSURER', partnerId: 'BAOVIET', partnerName: 'Bảo Việt', period: 'T11/24', transactionCount: 6850, grossAmount: 2_397_500_000, netAmount: 1_860_460_000, paidAmount: 1_860_460_000, remainingAmount: 0, dueDate: '2024-12-15', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-BV', type: 'AP_INSURER', partnerId: 'BAOVIET', partnerName: 'Bảo Việt', period: 'T12/24', transactionCount: 4520, grossAmount: 1_582_000_000, netAmount: 1_227_632_000, paidAmount: 0, remainingAmount: 1_227_632_000, dueDate: '2025-01-15', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AP-2024-11-PTI', type: 'AP_INSURER', partnerId: 'PTI', partnerName: 'PTI', period: 'T11/24', transactionCount: 3200, grossAmount: 1_120_000_000, netAmount: 884_800_000, paidAmount: 884_800_000, remainingAmount: 0, dueDate: '2024-12-10', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-PTI', type: 'AP_INSURER', partnerId: 'PTI', partnerName: 'PTI', period: 'T12/24', transactionCount: 2150, grossAmount: 752_500_000, netAmount: 594_475_000, paidAmount: 0, remainingAmount: 594_475_000, dueDate: '2025-01-10', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AP-2024-11-BM', type: 'AP_INSURER', partnerId: 'BAOMINH', partnerName: 'Bảo Minh', period: 'T11/24', transactionCount: 2850, grossAmount: 997_500_000, netAmount: 773_062_500, paidAmount: 773_062_500, remainingAmount: 0, dueDate: '2024-12-20', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-BM', type: 'AP_INSURER', partnerId: 'BAOMINH', partnerName: 'Bảo Minh', period: 'T12/24', transactionCount: 1850, grossAmount: 647_500_000, netAmount: 501_812_500, paidAmount: 0, remainingAmount: 501_812_500, dueDate: '2025-01-20', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AP-2024-11-MIC', type: 'AP_INSURER', partnerId: 'MIC', partnerName: 'MIC', period: 'T11/24', transactionCount: 2450, grossAmount: 857_500_000, netAmount: 673_137_500, paidAmount: 673_137_500, remainingAmount: 0, dueDate: '2024-12-05', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-MIC', type: 'AP_INSURER', partnerId: 'MIC', partnerName: 'MIC', period: 'T12/24', transactionCount: 1680, grossAmount: 588_000_000, netAmount: 461_580_000, paidAmount: 0, remainingAmount: 461_580_000, dueDate: '2025-01-05', status: 'pending', createdAt: '2025-01-01' },
]

// Phải trả Hoa hồng (AP Partner Commission)
export const accountsPayableCommission: AccountRecord[] = [
  { id: 'AP-2024-11-SSC-COMM', type: 'AP_COMMISSION', partnerId: 'SSC', partnerName: 'SSC', period: 'T11/24', transactionCount: 12450, grossAmount: 4_360_000_000, netAmount: 218_000_000, paidAmount: 218_000_000, remainingAmount: 0, dueDate: '2024-12-15', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-SSC-COMM', type: 'AP_COMMISSION', partnerId: 'SSC', partnerName: 'SSC', period: 'T12/24', transactionCount: 8520, grossAmount: 2_982_000_000, netAmount: 149_100_000, paidAmount: 0, remainingAmount: 149_100_000, dueDate: '2025-01-15', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AP-2024-11-PARTNER2-COMM', type: 'AP_COMMISSION', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T11/24', transactionCount: 8250, grossAmount: 2_887_500_000, netAmount: 173_250_000, paidAmount: 173_250_000, remainingAmount: 0, dueDate: '2024-12-20', status: 'paid', createdAt: '2024-12-01' },
  { id: 'AP-2024-12-PARTNER2-COMM', type: 'AP_COMMISSION', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T12/24', transactionCount: 5850, grossAmount: 2_047_500_000, netAmount: 122_850_000, paidAmount: 0, remainingAmount: 122_850_000, dueDate: '2025-01-20', status: 'pending', createdAt: '2025-01-01' },
  { id: 'AP-2024-10-SSC-COMM', type: 'AP_COMMISSION', partnerId: 'SSC', partnerName: 'SSC', period: 'T10/24', transactionCount: 15200, grossAmount: 5_320_000_000, netAmount: 266_000_000, paidAmount: 266_000_000, remainingAmount: 0, dueDate: '2024-11-15', status: 'paid', createdAt: '2024-11-01' },
  { id: 'AP-2024-10-PARTNER2-COMM', type: 'AP_COMMISSION', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T10/24', transactionCount: 9850, grossAmount: 3_447_500_000, netAmount: 206_850_000, paidAmount: 206_850_000, remainingAmount: 0, dueDate: '2024-11-20', status: 'paid', createdAt: '2024-11-01' },
  { id: 'AP-2024-09-SSC-COMM', type: 'AP_COMMISSION', partnerId: 'SSC', partnerName: 'SSC', period: 'T09/24', transactionCount: 18500, grossAmount: 6_475_000_000, netAmount: 323_750_000, paidAmount: 323_750_000, remainingAmount: 0, dueDate: '2024-10-15', status: 'paid', createdAt: '2024-10-01' },
  { id: 'AP-2024-09-PARTNER2-COMM', type: 'AP_COMMISSION', partnerId: 'PARTNER2', partnerName: 'Đối tác 2', period: 'T09/24', transactionCount: 12500, grossAmount: 4_375_000_000, netAmount: 262_500_000, paidAmount: 262_500_000, remainingAmount: 0, dueDate: '2024-10-20', status: 'paid', createdAt: '2024-10-01' },
]

// Tất cả accounts
export const getAllAccounts = (): AccountRecord[] => [
  ...accountsReceivable,
  ...accountsPayableInsurer,
  ...accountsPayableCommission,
]

// Summary
export const getAccountsSummary = () => {
  const ar = accountsReceivable
  const apIns = accountsPayableInsurer
  const apComm = accountsPayableCommission

  return {
    ar: {
      total: ar.reduce((s, a) => s + a.netAmount, 0),
      pending: ar.filter(a => a.status === 'pending').reduce((s, a) => s + a.remainingAmount, 0),
      paid: ar.filter(a => a.status === 'paid').reduce((s, a) => s + a.paidAmount, 0),
    },
    apInsurer: {
      total: apIns.reduce((s, a) => s + a.netAmount, 0),
      pending: apIns.filter(a => a.status === 'pending').reduce((s, a) => s + a.remainingAmount, 0),
      paid: apIns.filter(a => a.status === 'paid').reduce((s, a) => s + a.paidAmount, 0),
    },
    apCommission: {
      total: apComm.reduce((s, a) => s + a.netAmount, 0),
      pending: apComm.filter(a => a.status === 'pending').reduce((s, a) => s + a.remainingAmount, 0),
      paid: apComm.filter(a => a.status === 'paid').reduce((s, a) => s + a.paidAmount, 0),
    },
  }
}

// Aging buckets
export interface AgingBucket {
  label: string
  ar: number
  apInsurer: number
  apCommission: number
}

export const getAgingReport = (): AgingBucket[] => {
  const now = new Date()
  
  const categorize = (records: AccountRecord[]) => {
    return records.filter(r => r.status === 'pending').reduce((acc, r) => {
      const due = new Date(r.dueDate)
      const diff = Math.floor((now.getTime() - due.getTime()) / (1000 * 60 * 60 * 24))
      
      if (diff < 0) acc.current += r.remainingAmount
      else if (diff <= 15) acc.days1_15 += r.remainingAmount
      else if (diff <= 30) acc.days16_30 += r.remainingAmount
      else acc.over30 += r.remainingAmount
      
      return acc
    }, { current: 0, days1_15: 0, days16_30: 0, over30: 0 })
  }
  
  const arAging = categorize(accountsReceivable)
  const apInsAging = categorize(accountsPayableInsurer)
  const apCommAging = categorize(accountsPayableCommission)
  
  return [
    { label: 'Chưa đến hạn', ar: arAging.current, apInsurer: apInsAging.current, apCommission: apCommAging.current },
    { label: 'Quá hạn 1-15 ngày', ar: arAging.days1_15, apInsurer: apInsAging.days1_15, apCommission: apCommAging.days1_15 },
    { label: 'Quá hạn 16-30 ngày', ar: arAging.days16_30, apInsurer: apInsAging.days16_30, apCommission: apCommAging.days16_30 },
    { label: 'Quá hạn > 30 ngày', ar: arAging.over30, apInsurer: apInsAging.over30, apCommission: apCommAging.over30 },
  ]
}
