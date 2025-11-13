import { IsNumber, IsString, IsDateString, IsArray, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

class DetailItem {
    @IsNumber()
    menuId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    unit_price: number;
}

export class CreateTransactionDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    subtotal: number;

    @IsNumber()
    tax: number;

    @IsNumber()
    discount: number;

    @IsNumber()
    total: number;

    @IsNumber()
    payment_method: number;

    @IsString()
    status: string;

    @IsDateString()
    pay_at: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DetailItem)
    details: DetailItem[];
}
