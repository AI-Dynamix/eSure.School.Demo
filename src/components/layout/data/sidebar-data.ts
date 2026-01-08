import {
  IconDashboard,
  IconSchool,
  IconShoppingCart,
  IconUpload,
  IconReportAnalytics,
  IconSettings,
  IconMap,
  IconBuildingBank,
  IconCoin,
  IconChalkboard,
} from '@tabler/icons-react'

// Role definitions
export type UserRole = 'esure_admin' | 'agency_admin' | 'school_admin' | 'ssc_admin'

export interface Team {
  name: string
  logo: React.ElementType | string
  plan: string
  role: string
}

export const teams: Team[] = [
  {
    name: 'eSure Admin',
    logo: '/images/favicon.png',
    plan: 'Platform Operator',
    role: 'esure_admin',
  },
  {
    name: 'Sở GDĐT TP.HCM',
    logo: '/images/favicon.png',
    plan: 'Management Agency',
    role: 'agency_admin',
  },
  {
    name: 'SSC Admin',
    logo: '/images/favicon.png',
    plan: 'SSC Management',
    role: 'ssc_admin',
  },
  {
    name: 'Trường THCS Lê Văn Tám',
    logo: '/images/favicon.png',
    plan: 'School Admin',
    role: 'school_admin',
  },
]

// Navigation for eSure Admin (Platform)
const navEsure = [
  {
    title: 'Tổng quan',
    url: '/',
    icon: IconDashboard,
  },
  {
    title: 'Địa bàn',
    url: '/geography',
    icon: IconMap,
  },
  {
    title: 'Đối tác & Sản phẩm',
    url: '/partners',
    icon: IconBuildingBank,
  },
  {
    title: 'Quản lý Trường',
    url: '/schools',
    icon: IconSchool,
  },
  {
    title: 'Đơn hàng',
    url: '/orders',
    icon: IconShoppingCart,
  },
  {
    title: 'Công nợ',
    url: '/accounts',
    icon: IconCoin,
  },
  {
    title: 'Báo cáo',
    url: '/reports',
    icon: IconReportAnalytics,
  },
  {
    title: 'Cài đặt',
    url: '/settings',
    icon: IconSettings,
  },
]

// Navigation for Agency Admin (Sở GD)
const navAgency = [
  {
    title: 'Tổng quan (Sở)',
    url: '/',
    icon: IconDashboard,
  },
  {
    title: 'Import Dữ liệu',
    url: '/import',
    icon: IconUpload,
  },
  {
    title: 'Danh sách Trường',
    url: '/schools',
    icon: IconSchool,
  },
  {
    title: 'Báo cáo',
    url: '/reports',
    icon: IconReportAnalytics,
  },
]

// Navigation for SSC Admin
const navSSC = [
  {
    title: 'Tổng quan (SSC)',
    url: '/',
    icon: IconDashboard,
  },
  {
    title: 'Danh sách Trường',
    url: '/schools',
    icon: IconSchool,
  },
  {
    title: 'Báo cáo',
    url: '/reports',
    icon: IconReportAnalytics,
  },
]

// Navigation for School Admin (Nhà trường)
const navSchool = [
  {
    title: 'Tổng quan (Trường)',
    url: '/',
    icon: IconDashboard,
  },
  {
    title: 'Import Dữ liệu',
    url: '/import',
    icon: IconUpload,
  },
  {
    title: 'Lớp học & Sĩ số', // Thay thế Quản lý HS
    url: '/classes',
    icon: IconChalkboard,
  },
  {
    title: 'Báo cáo',
    url: '/reports',
    icon: IconReportAnalytics,
  },
]

export const getNavByRole = (role: string) => {
  switch (role) {
    case 'esure_admin': return navEsure
    case 'agency_admin': return navAgency
    case 'school_admin': return navSchool
    case 'ssc_admin': return navSSC
    default: return navEsure
  }
}

export const sidebarData = {
  user: {
    name: 'Admin User',
    email: 'admin@esure.school',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: teams,
  // Default to esure
  navMain: navEsure, 
}
