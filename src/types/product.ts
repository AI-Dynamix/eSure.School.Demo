export interface Product {
    code: string;
    name: string;
    insurer: string;
    insurerLogo: string;
    type: 'mandatory' | 'voluntary';
    priceFrom: number;
    priceTo: number;
    status: 'active' | 'inactive';
    salesChannel: string;
    partnerCommission: number;
    esureCommission: number;
    adminFee: number;
    otherCosts: number;
    description?: string;
}
