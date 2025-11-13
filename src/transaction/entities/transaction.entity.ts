export class Transaction {
    id: number;
    userId: number;
    subtotal: number;
    tax: number;
    discount: number;
    total: number;
    payment_method: number;
    status: string;
    pay_at: Date;
    created_at: Date;
}
