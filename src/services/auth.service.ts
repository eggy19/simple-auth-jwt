
import { validate } from 'class-validator';
import { RegisterDto } from '../dto/users/register.dto';
import { BadRequestError } from '../errors/bad-request.error';
import { LoginDto } from '../dto/users/login.dto';

export class AuthService {
  async register(registerDto: RegisterDto) {
    const errors = await validate(registerDto);
    if (errors.length > 0) {
      throw new BadRequestError('Validation failed');
    }

    // Lanjutkan proses registrasi
  }

  async login(loginDto: LoginDto) {
    const errors = await validate(loginDto);
    if (errors.length > 0) {
      throw new BadRequestError('Validation failed');
    }

    // Lanjutkan proses login
  }
}