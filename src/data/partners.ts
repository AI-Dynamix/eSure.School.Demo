// Dữ liệu Đối tác: Payment Gateway và Công ty Bảo hiểm

export interface PaymentGateway {
  id: string
  code: string
  name: string
  shortName: string
  taxCode: string
  bankAccount: string
  bankName: string
  commissionRate: number
  paymentCycle: number
  reconciliationDay: number
  regions: string[]
  contactEmail: string
  contactPhone: string
  status: 'active' | 'inactive'
}

export interface Insurer {
  id: string
  code: string
  name: string
  shortName: string
  taxCode: string
  bankAccount: string
  bankName: string
  retentionRate: number
  paymentCycle: number
  reconciliationDay: number
  products: string[]
  contactEmail: string
  contactPhone: string
  status: 'active' | 'inactive'
}

export const paymentGateways: PaymentGateway[] = [
  {
    id: 'gw-ssc', code: 'SSC', name: 'Công ty Cổ phần Dịch vụ Thanh toán SSC', shortName: 'SSC',
    taxCode: '0312345678', bankAccount: '0071001234567', bankName: 'Vietcombank',
    commissionRate: 5, paymentCycle: 15, reconciliationDay: 5,
    regions: ['48', '49', '50', '51', '52', '53', '54', '55', '70', '74', '75', '77', '79', '80', '83', '86', '89', '92', '93', '95'],
    contactEmail: 'partner@ssc.vn', contactPhone: '028 38123456', status: 'active'
  },
  {
    id: 'gw-vnpt', code: 'VNPT', name: 'VNPT VneDu', shortName: 'VNPT VneDu',
    taxCode: '0100684378', bankAccount: '12510001234567', bankName: 'BIDV',
    commissionRate: 6.0, paymentCycle: 20, reconciliationDay: 10,
    regions: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'],
    contactEmail: 'edupay@vnpt.vn', contactPhone: '024 38123456', status: 'active'
  },
  {
    id: 'gw-gotrust', code: 'GOTRUST', name: 'GoTrust Edupay', shortName: 'GoTrust Edupay',
    taxCode: '0315891234', bankAccount: '0071000987654', bankName: 'Vietcombank',
    commissionRate: 5.5, paymentCycle: 10, reconciliationDay: 30,
    regions: ['79', '80'], // Added TP.HCM and Long An as example regions
    contactEmail: 'contact@gotrust.vn', contactPhone: '1900 123456', status: 'active'
  }
]

export const insurers: Insurer[] = [
  { id: 'ins-pvi', code: 'PVI', name: 'Tổng Công ty Bảo hiểm PVI', shortName: 'PVI', taxCode: '0100107034', bankAccount: '19132012345678', bankName: 'Techcombank', retentionRate: 23, paymentCycle: 30, reconciliationDay: 15, products: ['PRD-GOLD', 'PRD-SILVER'], contactEmail: 'partner@pvi.com.vn', contactPhone: '024 37726789', status: 'active' },
  { id: 'ins-baoviet', code: 'BAOVIET', name: 'Tổng Công ty Bảo hiểm Bảo Việt', shortName: 'Bảo Việt', taxCode: '0100773491', bankAccount: '1400201012345', bankName: 'Agribank', retentionRate: 22, paymentCycle: 30, reconciliationDay: 15, products: ['PRD-GOLD', 'PRD-SILVER', 'PRD-BASIC'], contactEmail: 'partner@baoviet.com.vn', contactPhone: '024 39288888', status: 'active' },
  { id: 'ins-pti', code: 'PTI', name: 'Công ty Cổ phần Bảo hiểm Bưu điện', shortName: 'PTI', taxCode: '0100105490', bankAccount: '102010012345678', bankName: 'Vietinbank', retentionRate: 21, paymentCycle: 25, reconciliationDay: 10, products: ['PRD-BASIC'], contactEmail: 'partner@pti.com.vn', contactPhone: '024 37575555', status: 'active' },
  { id: 'ins-baominh', code: 'BAOMINH', name: 'Tổng Công ty Cổ phần Bảo Minh', shortName: 'Bảo Minh', taxCode: '0301437508', bankAccount: '060012345678', bankName: 'Sacombank', retentionRate: 22.5, paymentCycle: 30, reconciliationDay: 20, products: ['PRD-SILVER'], contactEmail: 'partner@baominh.com.vn', contactPhone: '028 38295295', status: 'active' },
  { id: 'ins-mic', code: 'MIC', name: 'Công ty Cổ phần Bảo hiểm Quân đội', shortName: 'MIC', taxCode: '0100636873', bankAccount: '0021001234567', bankName: 'MB Bank', retentionRate: 21.5, paymentCycle: 25, reconciliationDay: 5, products: ['PRD-GOLD', 'PRD-BASIC'], contactEmail: 'partner@mic.vn', contactPhone: '024 62757575', status: 'active' }
]

export const getGatewayByCode = (code: string) => paymentGateways.find(g => g.code === code)
export const getInsurerByCode = (code: string) => insurers.find(i => i.code === code)
export const getGatewayByProvince = (provinceCode: string) => paymentGateways.find(g => g.regions.includes(provinceCode))
