// Dashboard Types for eSure School Reports System
// Based on: esure-school-reports-spec.md

// =============================================================================
// CORE TYPES
// =============================================================================

export interface School {
  id: string
  name: string
  level: 'Mầm non' | 'Tiểu học' | 'THCS' | 'THPT'
  district: string
  totalStudents: number
  bhytCount: number           // BHYT bắt buộc
  voluntaryInsCount: number   // BH tự nguyện
  bhytRate: number
  voluntaryRate: number
  status: 'active' | 'inactive'
}

export interface ClassInfo {
  id: string
  name: string
  grade: number
  totalStudents: number
  bhytCount: number
  voluntaryInsCount: number
  pendingPayment: number
  pendingInfo: number
  teacherName: string
}

export interface Student {
  id: string
  name: string
  className: string
  grade: number
  hasBHYT: boolean
  hasVoluntaryIns: boolean
  voluntaryInsPackage?: 'basic' | 'silver' | 'gold'
  status: 'completed' | 'pending_payment' | 'pending_info' | 'not_joined'
  parentPhone: string
  createdAt: string
}

// =============================================================================
// DASHBOARD METRICS
// =============================================================================

// Sở GD&ĐT - BHYT Tab
export interface BHYTMetrics {
  totalSchools: number
  totalStudents: number
  bhytStudents: number
  bhytCoverageRate: number
  targetRate: number
  notCoveredCount: number
}

// Sở GD&ĐT - Voluntary Insurance Tab
export interface VoluntaryInsMetrics {
  schoolsWithVoluntaryIns: number
  voluntaryInsStudents: number
  participationRate: number
  insurerCount: number
}

// eSure Executive Dashboard
export interface ESureMetrics {
  grossRevenue: number
  netRevenue: number
  commission: number
  totalPolicies: number
  activeSchools: number
  avgPremium: number
  // Trends
  vsLastMonth: number
  vsLastYear: number
  vsTarget: number
}

export interface RevenueBreakdown {
  channel: string
  policies: number
  revenue: number
  percentage: number
  commissionRate: number
  commissionAmount: number
}

export interface ProductBreakdown {
  package: 'basic' | 'silver' | 'gold'
  packageName: string
  premium: number
  policies: number
  revenue: number
  percentage: number
  margin: number
}

export interface SchoolSegment {
  segment: 'Gold' | 'Silver' | 'Bronze' | 'At-risk'
  definition: string
  schoolCount: number
  revenuePercentage: number
  strategy: string
}

export interface PLStatement {
  item: string
  currentMonth: number
  percentRevenue: number
  lastMonth: number
  changePercent: number
}

// Partner Dashboard (SSC/VNPT)
export interface PartnerMetrics {
  todayTransactions: number
  todayValue: number
  weekTransactions: number
  weekValue: number
  monthTransactions: number
  monthValue: number
  ytdTransactions: number
  ytdValue: number
  successRate: number
  failedRate: number
}

export interface ReconciliationItem {
  partnerTxnId: string
  esureOrderId: string | null
  partnerAmount: number
  esureAmount: number | null
  difference: number
  reason: string
  status: 'matched' | 'mismatch_small' | 'mismatch' | 'pending'
}

export interface CommissionPayment {
  period: string
  transactions: number
  revenue: number
  rate: number
  commission: number
  status: 'paid' | 'pending'
  paymentDate: string
}

export interface SLAMetric {
  metric: string
  target: string
  actual: string
  status: 'green' | 'yellow' | 'red'
}

// School Dashboard
export interface SchoolDashboardMetrics {
  totalStudents: number
  bhytStudents: number
  bhytRate: number
  voluntaryInsStudents: number
  voluntaryRate: number
  pendingCount: number
}

export interface GradeBreakdown {
  grade: string
  totalStudents: number
  bhytCount: number
  voluntaryCount: number
  voluntaryRate: number
  pendingPayment: number
  pendingInfo: number
  notJoined: number
}

export interface PendingStudent {
  id: string
  name: string
  className: string
  missingInfo?: string
  parentPhone: string
  createdAt: string
  daysWaiting: number
}

// Insurer Dashboard
export interface InsurerMetrics {
  totalActivePolicies: number
  totalPremium: number
  totalClaims: number
  lossRatio: number
  claimFrequency: number
  avgClaimSize: number
}

export interface ClaimByType {
  type: string
  count: number
  totalAmount: number
  percentage: number
  avgSize: number
}

export interface ClaimByDemographic {
  segment: string
  policies: number
  claims: number
  frequency: number
  lossRatio: number
}

export interface LargeClaim {
  date: string
  policyId: string
  school: string
  type: string
  amount: number
  status: 'paid' | 'processing' | 'pending'
}

// =============================================================================
// CHART DATA TYPES
// =============================================================================

export interface TimeSeriesData {
  month: string
  value: number
  label?: string
}

export interface PieChartData {
  name: string
  value: number
  color?: string
}

export interface BarChartData {
  category: string
  value: number
  target?: number
}

// =============================================================================
// FILTER TYPES
// =============================================================================

export interface ReportFilters {
  schoolYear: string
  semester: 'all' | 'semester1' | 'semester2'
  dateRange?: { from: Date; to: Date }
  districts: string[]
  levels: ('Mầm non' | 'Tiểu học' | 'THCS' | 'THPT')[]
  schoolId?: string
}
