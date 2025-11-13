import { IsNumber } from 'class-validator';

export class CreateDetailTransaksiDto {
    @IsNumber()
    transactionId: number;

    @IsNumber()
    menuId: number;

    @IsNumber()
    quantity: number;

    @IsNumber()
    unit_price: number;
}
