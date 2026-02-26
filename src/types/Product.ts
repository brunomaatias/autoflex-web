export interface Product {
    productId?: number;
    code: string;
    name: string;
    price: number;
}

export interface ProductionSuggestion {
    productId: number; 
    productName: string;
    quantityPossible: number;
    unitPrice: number;
    totalValue: number;
}