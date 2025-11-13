import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMenuDto {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description: string

    @IsOptional()
    @IsNumber()
    price: number


    @IsOptional()
    @IsString()
    category : string

}
