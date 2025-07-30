import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateClubDto {
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
}

export class CreateClubDto{
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
}

