import { Product } from '@/types/product'

export const mockProducts: Product[] = [
  { 
    code: "BHYT-NATIONAL", 
    name: "Bảo hiểm Y tế (BHYT)", 
    insurer: "BHXH Việt Nam", 
    insurerLogo: "/logos/bhxh.png", 
    type: "mandatory", 
    priceFrom: 850500, 
    priceTo: 850500, 
    status: "active",
    salesChannel: "SSC/VNPT VneDu",
    partnerCommission: 4.0,
    esureCommission: 1.0,
    adminFee: 0,
    otherCosts: 0
  },
  { 
    code: "PVI-GOLD-2024", 
    name: "Gói Vàng (Toàn diện)", 
    insurer: "PVI", 
    insurerLogo: "/logos/pvi.png", 
    type: "voluntary", 
    priceFrom: 350000, 
    priceTo: 350000, 
    status: "active",
    salesChannel: "GoTrust Edupay/Direct",
    partnerCommission: 15.0,
    esureCommission: 25.0,
    adminFee: 15000,
    otherCosts: 5000
  },
  { 
    code: "PVI-SILVER-2024", 
    name: "Gói Bạc (Cơ bản)", 
    insurer: "PVI", 
    insurerLogo: "/logos/pvi.png", 
    type: "voluntary", 
    priceFrom: 250000, 
    priceTo: 250000, 
    status: "active",
    salesChannel: "VNPT VneDu/App",
    partnerCommission: 15.0,
    esureCommission: 25.0,
    adminFee: 10000,
    otherCosts: 3000
  },
  { 
    code: "BV-BASIC-2024", 
    name: "Gói Tai nạn Học sinh", 
    insurer: "Bảo Việt", 
    insurerLogo: "/logos/baoviet.png", 
    type: "voluntary", 
    priceFrom: 120000, 
    priceTo: 180000, 
    status: "active",
    salesChannel: "School",
    partnerCommission: 20.0,
    esureCommission: 20.0,
    adminFee: 5000,
    otherCosts: 2000
  },
]
