export type InsuranceStatus = 
  | 'none'           // Chưa có
  | 'pending_payment' // Chờ thanh toán
  | 'pending_info'    // Chờ bổ sung thông tin
  | 'active'          // Đang hiệu lực
  | 'expired'         // Hết hạn

export interface Student {
  id: string
  studentCode: string
  fullName: string
  dateOfBirth: string
  gender: 'male' | 'female'
  className: string
  schoolId: string
  schoolName: string
  identityNumber: string | null
  parentName: string
  parentPhone: string
  parentEmail: string | null
  insuranceStatus: InsuranceStatus
  packageName: string | null
  policyNumber: string | null
  expiryDate: string | null
}
