export type OrderStatus = 
  | 'pending_payment'   // Đang chờ thanh toán
  | 'paid'              // Đã thanh toán (Chờ cấp thẻ)
  | 'issued'            // Đã cấp thẻ (Hoàn thành)
  | 'claiming'          // Đang bồi thường
  | 'claimed'           // Đã bồi thường
  | 'renewed'           // Đã tái tục
  | 'expired'           // Hết hạn
  | 'cancelled'         // Đã hủy

export type PaymentChannel = 'SSC' | 'Đối tác 2' | 'Đối tác 3' | 'Direct'

export interface Order {
  id: string
  orderId: string
  createdAt: string
  studentId: string
  studentName: string
  schoolId: string
  schoolName: string
  
  // Geography for hierarchical filtering
  provinceCode: string
  districtCode: string
  wardCode: string

  packageId: string
  packageName: string
  amount: number
  status: OrderStatus
  paymentChannel: PaymentChannel
  paymentDate: string | null
  policyNumber: string | null
  issuedDate: string | null

  // Insurance Lifecycle info
  isRenewal: boolean
  originalPolicyId?: string
  
  hasClaim: boolean
  claimStatus?: 'processing' | 'approved' | 'rejected'
  claimAmount?: number
}
