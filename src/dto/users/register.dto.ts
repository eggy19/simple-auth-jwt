import { IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(50)
    username!:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password!: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email!: string;

    @IsIn(['admin', 'user'])
    @IsNotEmpty()
    role!: string;
}