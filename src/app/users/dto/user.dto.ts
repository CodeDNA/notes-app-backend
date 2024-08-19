import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class UserDto {
  @Expose()
  @IsString()
  @IsOptional()
  userId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  userName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Expose()
  @IsString()
  @IsOptional()
  middleName: string;

  @Expose()
  @IsString()
  @IsOptional()
  lastName: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Expose()
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber: number;

  @Expose()
  @IsBoolean()
  @IsOptional()
  isDeleted: boolean;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  groups: string[];

  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
