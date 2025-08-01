import { IsDate, IsDecimal, IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateSocialDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    members?: number;

    @IsOptional()
    @IsString()
    logo?: string;

    @IsOptional()
    @IsDate()
    date?: Date;

    @IsOptional()
    @IsDecimal()
    @Min(0)
    point?: number;

    @IsOptional()
    @IsDecimal()
    price?: number;
}

export class UpdateSocialDto{
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    location?: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    members?: number;

    @IsOptional()
    @IsString()
    logo?: string;

    @IsOptional()
    @IsDate()
    date?: Date;

    @IsOptional()
    @IsDecimal()
    @Min(0)
    point?: number;

    @IsOptional()
    @IsDecimal()
    price?: number;
}
