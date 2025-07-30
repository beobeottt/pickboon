import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, Max, Min } from 'class-validator';
import { Gender } from '../../common/enums/gender.enum';

export class CreateAthleteDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsPhoneNumber('VN')
  phoneNumber: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @Min(1)
  @Max(10)
  point?: number;

  @IsOptional()
  @IsString()
  image?: string;
}