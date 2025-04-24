import { IsString, IsNotEmpty, MinLength, MaxLength, IsAlphanumeric } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @IsAlphanumeric()
  username!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}